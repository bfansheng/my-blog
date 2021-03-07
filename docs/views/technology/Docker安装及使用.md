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

## DOCKER --HELP

```bash
Usage:
docker [OPTIONS] COMMAND [arg...]

       docker daemon [ --help | ... ]

       docker [ --help | -v | --version ]



A
self-sufficient runtime for containers.



Options:



  --config=~/.docker              Location of client config files  #客户端配置文件的位置

  -D, --debug=false               Enable debug mode  #启用Debug调试模式

  -H, --host=[]                   Daemon socket(s) to connect to  #守护进程的套接字（Socket）连接

  -h, --help=false                Print usage  #打印使用

  -l, --log-level=info            Set the logging level  #设置日志级别

  --tls=false                     Use TLS; implied by--tlsverify  #

  --tlscacert=~/.docker/ca.pem    Trust certs signed only by this CA  #信任证书签名CA

  --tlscert=~/.docker/cert.pem    Path to TLS certificate file  #TLS证书文件路径

  --tlskey=~/.docker/key.pem      Path to TLS key file  #TLS密钥文件路径

  --tlsverify=false               Use TLS and verify the remote  #使用TLS验证远程

  -v, --version=false             Print version information and quit  #打印版本信息并退出



Commands:

    attach    Attach to a running container  #当前shell下attach连接指定运行镜像

    build     Build an image from a Dockerfile  #通过Dockerfile定制镜像

    commit    Create a new image from a container's changes  #提交当前容器为新的镜像

    cp    Copy files/folders from a container to a HOSTDIR or to STDOUT  #从容器中拷贝指定文件或者目录到宿主机中

    create    Create a new container  #创建一个新的容器，同run 但不启动容器

    diff    Inspect changes on a container's filesystem  #查看docker容器变化

    events    Get real time events from the server#从docker服务获取容器实时事件

    exec    Run a command in a running container#在已存在的容器上运行命令

    export    Export a container's filesystem as a tar archive  #导出容器的内容流作为一个tar归档文件(对应import)

    history    Show the history of an image  #展示一个镜像形成历史

    images    List images  #列出系统当前镜像

    import    Import the contents from a tarball to create a filesystem image  #从tar包中的内容创建一个新的文件系统映像(对应export)

    info    Display system-wide information  #显示系统相关信息

    inspect    Return low-level information on a container or image  #查看容器详细信息

    kill    Kill a running container  #kill指定docker容器

    load    Load an image from a tar archive or STDIN  #从一个tar包中加载一个镜像(对应save)

    login    Register or log in to a Docker registry#注册或者登陆一个docker源服务器

    logout    Log out from a Docker registry  #从当前Docker registry退出

    logs    Fetch the logs of a container  #输出当前容器日志信息

    pause    Pause all processes within a container#暂停容器

    port    List port mappings or a specific mapping for the CONTAINER  #查看映射端口对应的容器内部源端口

    ps    List containers  #列出容器列表

    pull    Pull an image or a repository from a registry  #从docker镜像源服务器拉取指定镜像或者库镜像

    push    Push an image or a repository to a registry  #推送指定镜像或者库镜像至docker源服务器

    rename    Rename a container  #重命名容器

    restart    Restart a running container  #重启运行的容器

    rm    Remove one or more containers  #移除一个或者多个容器

    rmi    Remove one or more images  #移除一个或多个镜像(无容器使用该镜像才可以删除，否则需要删除相关容器才可以继续或者-f强制删除)

    run    Run a command in a new container  #创建一个新的容器并运行一个命令

    save    Save an image(s) to a tar archive#保存一个镜像为一个tar包(对应load)

    search    Search the Docker Hub for images  #在docker
hub中搜索镜像

    start    Start one or more stopped containers#启动容器

    stats    Display a live stream of container(s) resource usage statistics  #统计容器使用资源

    stop    Stop a running container  #停止容器

    tag         Tag an image into a repository  #给源中镜像打标签

    top       Display the running processes of a container #查看容器中运行的进程信息

    unpause    Unpause all processes within a container  #取消暂停容器

    version    Show the Docker version information#查看容器版本号

    wait         Block until a container stops, then print its exit code  #截取容器停止时的退出状态值



Run 'docker COMMAND --help' for more information on a command.  #运行docker命令在帮助可以获取更多信息
```

