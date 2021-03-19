---
title: Axios Post请求下载文件
date: 2019-12-10
categories: 
 - Technology
tags: 
 - Web
---

## post方式返回json或下载文件

```js
static download(data) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: '/api/job/exp', // 请求地址
        responseType: 'arraybuffer', // 表明返回服务器返回的数据类型
        data: data
    }).then((res) => {
        if (res.headers['content-type'].indexOf('application/json') > -1) {
            const result = JSON.parse(Buffer.from(res.data).toString('utf8'))
            if (result.state === false) {
                let error = result.error;
                Message({
                    message: "["+error.code+"]"+error.msg,
                    type: 'info',
                    duration: 5 * 1000
                });
                return Promise.reject(result.error);
            }
            return Promise.resolve(res.data);
        } else if (res.headers['content-type'].indexOf('application/octet-stream') > -1) {
            const blob = new Blob([res.data])
            const fileName = '用户作业.xls';
            if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
            } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName)
            }
        }
    });
}
```

