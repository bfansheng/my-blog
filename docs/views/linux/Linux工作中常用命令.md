---
title: Linux工作中常用命令
date: 2019-10-21
categories: 
 - Linux
tags: 
 - linux
---

::: tip

Linux中常用的命令收集整理

:::

<!-- more -->

[TOC]

## 文件压缩与解压

### tar

```shell
# 压缩文件
tar -czvf test.tar.gz a.c
# 排除目录和文件
tar -zcvf tomcat.tar.gz --exclude=tomcat/logs --exclude=tomcat/libs --exclude=tomcat/xiaoshan.txt tomcat
# 查看压缩文件
tar -tzvf test.tar.gz 
-rw-r--r-- root/root     0 2010-05-24 16:51:59 a.c
# 解压
tar -xzvf test.tar.gz 
# 解压到指定目录
tar zxvf test.tgz -C /opt
```

### zip与unzip

```shell
# 压缩文件
zip test.zip a.c
# 压缩文件夹
zip -r test.zip test
# 排除文件
zip -r test.zip test -x "./test/good.txt"
# 查看压缩包
unzip -l test.zip
# 解压文件
unzip test.zip
# 解压到指定目录
unzip test.zip -d /opt
```