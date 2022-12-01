---
title: WebSocket
date: 2022-10-18
categories: 
 - Technology
tags: 
 - WebSocket
---



# WebSocket

## Nginx配置

```
http {
    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
    server {
        location /ws {
            proxy_pass http://webscoket; 
            proxy_http_version 1.1; 
            proxy_connect_timeout 4s; #配置点1
            proxy_read_timeout 60s; #配置点2，如果没效，可以考虑这个时间配置长一点
            proxy_send_timeout 12s; #配置点3
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
        }
    }
}
```
