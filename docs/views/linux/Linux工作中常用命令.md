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

### gzip

```bash
# 压缩
gzip test.log
# 解压
gzip -d test.log.gz
```

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

- `htop`需要手动安装：`yum install htop`；可以通过H（大写）切换仅显示主进程
- `glances`需要手动安装：`yum install glances`
- `top -p pid`可以指定查看单个进程

## 系统服务systemd

```bash
# 查看版本
systemctl --version
# 查看位置
whereis systemctl
# 列出所有可用单元（服务）
systemctl list-unit-files
# 列出所有运行中的单元
systemctl list-units
# 列出所有失败的单元
systemctl --failed
# 查看自启动的软件
systemctl list-unit-files | grep enable
# 查看某个单元是否开机启动
systemctl is-enabled nginx.service
# 查看某个单元的状态
systemctl status nginx.service
# 启动某个单元
systemctl start nginx.service
# 重启某个单元
systemctl restart nginx.service
# 停止某个单元
systemctl stop nginx.service
# 修改了某个单元的配置文件后，重载配置文件
systemctl daemon-reload
# 重载某个单元
systemctl reload nginx.service
# 设置开机自启动
systemctl enable nginx.service
# 关闭开机自启动
systemctl disable nginx.service
# 杀死单元
systemctl kill nginx
```



