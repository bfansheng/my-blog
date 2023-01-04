---
title: Java正向代理配置实践
date: 2022-12-01
categories: 
 - Java
tags: 
 - Java
 - 代理
---

## 访问Https

### 1. 设置代理服务器
	代理工具：
	- TinyProxy
	- Squid

### 2. Java配置代理

1. 方式一：程序内配置
```java
@Data  
@Component  
@ConfigurationProperties(prefix = "proxy")  
public class ProxyProperties {  
  
    /**  
     * 是否启用代理  
     */  
    private boolean enable = false;  
  
    /**  
     * 代理host，如：127.0.0.1  
     */    private String host;  
  
    /**  
     * 代理端口，如：8888  
     */    private String port;  
  
}

public class ProxyEnvironmentAware implements EnvironmentAware {  
  
    @Autowired  
    private ProxyProperties proxyProperties;  
  
    @Override  
    public void setEnvironment(Environment environment) {  
        if (proxyProperties.isEnable()) {  
            String host = Assert.notBlank(proxyProperties.getHost(), "代理host不能为空");  
            String port = Assert.notBlank(proxyProperties.getPort(), "代理端口不能为空");  
            System.setProperty("http.proxyHost", host);  
            System.setProperty("http.proxyPort", port);  
            System.setProperty("https.proxyHost", host);  
            System.setProperty("https.proxyPort", port);  
            log.info("http代理已开启 >>  ==> proxy url [{}:{}]", host, port);  
        }  
    }  
  
}
```
2. 方式二：启动命令配置
> // 注意：xxx.jar要放在参数后面
> 
> java -jar -Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=1080 -Dhttps.proxyHost=127.0.0.1 -Dhttps.proxyPort=1080 xxx.jar
## 参考

1. [nginx 正向代理https配置_litGrey的博客-CSDN博客_nginx正向代理https](https://blog.csdn.net/luChenH/article/details/107553493)
2. [推荐一款轻量级 HTTP/HTTPS 代理 TinyProxy - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1475747)
3. [Java Networking and Proxies (oracle.com)](https://docs.oracle.com/javase/8/docs/technotes/guides/net/proxies.html)