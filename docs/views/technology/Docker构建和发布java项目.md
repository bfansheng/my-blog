---
title: Docker构建和发布java项目
date: 2020-04-19
categories: 
 - Technology
tags: 
 - Docker
---

[TOC]

## 构建镜像

文件：

- sys-rbac-0.0.1-SNAPSHOT.jar
- Dockerfile

Dockerfile:

```dockerfile
FROM openjdk:8
LABEL maintainer="bfans"
WORKDIR /
ADD sys-rbac-0.0.1-SNAPSHOT.jar sys-rbac-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","sys-rbac-0.0.1-SNAPSHOT.jar"]
```

运行构建命令：

```bash
docker build -t sys-rbac:0.0.1 .
```

成功后运行`docker images`可以看到构建完成的镜像。

## 发布镜像

使用阿里云-容器镜像服务：https://cr.console.aliyun.com/cn-hangzhou/instances/repositories

- 将镜像推送到Registry

  ```bash
  docker login --username=xxx registry.cn-hangzhou.aliyuncs.com
  docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/bfans/dev:[镜像版本号]
  docker push registry.cn-hangzhou.aliyuncs.com/bfans/dev:[镜像版本号]
  ```

- 从Registry中拉取镜像

  ```bash
  docker pull registry.cn-hangzhou.aliyuncs.com/bfans/dev:[镜像版本号]
  ```

- 重命并推送

  ```
  docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/bfans/sys-rbac:[镜像版本号]
  docker push registry.cn-hangzhou.aliyuncs.com/bfans/sys-rbac:[镜像版本号]
  ```

  