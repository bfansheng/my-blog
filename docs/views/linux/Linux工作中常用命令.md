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

```bash
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

```bash
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

## 系统性能

```bash
# 系统版本
cat /etc/redhat-release
# cpu数量
cat /proc/cpuinfo
# 内存
cat /proc/meminfo
free -h
# 进程
top
htop
# 整体资源
glances
# 网络流量
iftop
# 网络连接
netstat -tunpl
netstat -tunp
ss -tunpl
ss -tunp
# 磁盘使用
df -h
# 统计文件夹大小
du --max-depth=1 -h
```

**注意**：

- `htop`需要手动安装：`yum install htop`，可以通过H（大写）切换仅显示主进程
- `glances`需要手动安装：`yum install glances`

