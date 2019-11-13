---
title: Nginx中location和proxy_pass的斜杠问题
date: 2019-11-6
categories: 
 - 技术
tags: 
 - Nginx
---

1. `proxy_pass http://localhost:8080/;`

   后面包含`/`时，是绝对路径，转发后的路径不包含location后的地址

2. `proxy_pass http://localhost:8080;`

   后面不包含`/`时，转发后的路径包含location后的地址

3. `proxy_pass http://localhost:8080/uri;`

   携带uri时，会将location后面的参数替换为uri

以下例子包括了带二级目录和不带二级目录时，location和proxy_pass后缀带有和不带有‘/’的所有情况

```cpp
server {
   listen       80;
   server_name  localhost;

   location /api1/ {
       proxy_pass http://localhost:8080;
   }
   # http://localhost/api1/xxx -> http://localhost:8080/api1/xxx


   location /api2/ {
       proxy_pass http://localhost:8080/;
   }
   # http://localhost/api2/xxx -> http://localhost:8080/xxx


   location /api3 {
       proxy_pass http://localhost:8080;
   }
   # http://localhost/api3/xxx -> http://localhost:8080/api3/xxx


   location /api4 {
       proxy_pass http://localhost:8080/;
   }
   # http://localhost/api4/xxx -> http://localhost:8080//xxx，请注意这里的双斜线，好好分析一下。

   # =================================== 
   # 下面是包含二级目录的情况
   # ===================================

   location /api5/ {
       proxy_pass http://localhost:8080/haha;
   }
   # http://localhost/api5/xxx -> http://localhost:8080/hahaxxx，请注意这里的haha和xxx之间没有斜杠，分析一下原因。

   location /api6/ {
       proxy_pass http://localhost:8080/haha/;
   }
   # http://localhost/api6/xxx -> http://localhost:8080/haha/xxx

   location /api7 {
       proxy_pass http://localhost:8080/haha;
   }
   # http://localhost/api7/xxx -> http://localhost:8080/haha/xxx

   location /api8 {
       proxy_pass http://localhost:8080/haha/;
   }
   # http://localhost/api8/xxx -> http://localhost:8080/haha//xxx，请注意这里的双斜杠。
}
```