---
title: Docker安装及使用
date: 2020-04-13
categories: 
 - Technology
tags: 
 - Docker
---

[TOC]

## 简介

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中,然后发布到任何流行的Linux机器或Windows 机器上,也可以实现虚拟化,容器是完全使用沙箱机制,相互之间不会有任何接口。

> Docker is the world’s leading software container platform.
>
> Docker is an open platform for developers and sysadmins to build, ship, and run distributed applications, whether on laptops, data center VMs, or the cloud.

## 应用场景

- Automating the packaging and deployment of applications（使应用的打包与部署自动化）
- Creation of lightweight, private PAAS environments（创建轻量、私密的PAAS环境）
- Automated testing and continuous integration/deployment（实现自动化测试和持续的集成/部署）
- Deploying and scaling web apps, databases and backend services（部署与扩展webapp、数据库和后台服务）

## 安装

```bash
yum install -y yum-utils   device-mapper-persistent-data   lvm2
yum-config-manager     --add-repo     http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum list docker-ce --showduplicates | sort -r
yum install docker-ce-19.03.8 docker-ce-cli-19.03.8 containerd.io
systemctl start docker
docker run hello-world
```

### 配置镜像

从阿里云镜像获取地址：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

```bash
vi /etc/docker/daemon.json
```

将地址添加到以下内容：

```json
{
  "registry-mirrors":["https://xxx.mirror.aliyuncs.com"]
}
```

重启服务：

```bash
systemctl daemon-reload
systemctl restart docker
```

检查是否生效：

```bash
docker info
```

包含以下内容则生效：

```bash
 Registry Mirrors:
  https://ygfhfvwl.mirror.aliyuncs.com/
```

## 容器状态

- created（已创建）
- restarting（重启中）
- running（运行中）
- removing（迁移中）
- paused（暂停）
- exited（停止）
- dead（死亡）

## 常用命令

### 容器相关命令

```bash
# 获取镜像
docker pull ubuntu:13.10
# 通过镜像启动容器（后台运行）
docker run -itd ubuntu /bin/bash
# 查看容器进程 -a查看所有
docker ps
# 停止容器
docker stop 容器id/名称
# 进入容器（容器在后台运行）
docker exec -it 容器id /bin/bash
# 导出容器
docker export 容器id > ubuntu.tar
cat ubuntu.tar | docker import - test/ubuntu:v1
# 删除容器
docker rm 容器id
# 查看日志
docker logs -f 容器id/名称
```

### 镜像相关命令

```bash
# 查看本地镜像列表
docker images
# 查找镜像
docker search httpd
# 拉取镜像
docker pull httpd
# 删除镜像
docker rmi hello-world
# 更新镜像
docker commit -m="has update" -a="bfans" 容器id runoob/ubuntu:v2
# 构建镜像，需要有Dockerfile文件。@see springboot-docker
# -t ：指定要创建的目标镜像名
# . ：Dockerfile 文件所在目录，可以指定Dockerfile 的绝对路径
docker build -t runoob/centos:6.7 .
# 设置镜像标签
docker tag 镜像id ubuntu/test:dev
```

