---
title: RabbitMQ消息队列的使用
date: 2020-03-29
categories: 
 - Technology
tags: 
 - RabbitMQ
---

RabbitMQ是实现了高级消息队列协议（AMQP）的开源消息代理软件（亦称面向消息的中间件）。RabbitMQ服务器是用Erlang语言编写的，而集群和故障转移是构建在开放电信平台框架上的。所有主要的编程语言均有与代理接口通讯的客户端库

## 安装

环境：centos7

### 安装erlang

Erlang下载地址：https://www.rabbitmq.com/releases/erlang/。Erlang环境一定要与RabbitMQ版本匹配：https://www.rabbitmq.com/which-erlang.html

> 本文使用18版本：https://www.rabbitmq.com/releases/erlang/erlang-18.3.4.4-1.el7.centos.x86_64.rpm

安装：`rpm -ivh erlang-18.3.4.4-1.el7.centos.x86_64.rpm`

### 安装socat

下载地址：http://mirror.centos.org/centos/7/os/x86_64/Packages/socat-1.7.3.2-2.el7.x86_64.rpm

安装：`rpm -ivh socat-1.7.3.2-2.el7.x86_64.rpm`

### 安装rabbitmq-server

RabbitMQ下载地址：https://www.rabbitmq.com/releases/rabbitmq-server/

> 本文使用：https://www.rabbitmq.com/releases/rabbitmq-server/v3.6.15/rabbitmq-server-3.6.15-1.el7.noarch.rpm

安装：`rpm -ivh rabbitmq-server-3.6.15-1.el7.noarch.rpm`

### 配置rabbitmq

修改文件vim /usr/lib/rabbitmq/lib/rabbitmq_server-3.6.5/ebin/rabbit.app，删除**loopback_users**将里面的**<<"guest">>**。

删除后的内容为：**{loopback_users, []}**。

### 安装管理插件

运行`rabbitmq-plugins enable rabbitmq_management`

### 访问地址

url：http://localhost:15672，用户：guest/guest

### 启动服务

```bash
systemctl start rabbitmq-server.service
```

如果有权限问题，运行命令：

```base
chown -R rabbitmq:rabbitmq /var/lib/rabbitmq/mnesia/
chown -R rabbitmq:rabbitmq /var/log/rabbitmq
```