---
title: CentOS下开机自启动和服务安装
date: 2019-11-6
categories: 
 - Linux
tags: 
 - Nginx
 - Linux
---

[TOC]

以nginx服务安装为例子。

## 1.系统服务目录里创建nginx.service文件

```bash
vim /etc/systemd/system/nginx.service
```

内容：

```bash
[Unit]
# 描述
Description=nginx
# 启动顺序
After=network.target
[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp= true
[Install]
WantedBy=multi-user.target
```

## 2. 开机启动

`systemctl enable nginx.service`

## 3. 服务相关命令

| 命令                              | 功能                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| `systemctl start nginx.service`   | 启动nginx服务                                                |
| `systemctl stop nginx.service`    | 停止nginx服务                                                |
| `systemctl restart nginx.service` | 重启nginx服务                                                |
| `systemctl reload nginx.service`  | 重新读取nginx配置(这个最常用, 不用停止nginx服务就能使修改的配置生效) |