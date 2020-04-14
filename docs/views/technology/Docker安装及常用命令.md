---
title: Docker安装及常用命令
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

## 配置镜像

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

