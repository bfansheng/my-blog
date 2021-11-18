---
title: Jenkins scp免密解决
date: 2021-11-18
categories: 
 - Technology
tags:
 - Jenkins
---

1. Jenkins服务器切换jenkins用户

   ```sh
   vi /etc/passwd
   # 修改jenkins:/bin/false为/bin/bash
   vim ~/.bash_profile
   # 末行增加
   export PS1='[\u@\h \W]\$'
   source ~/.bash_profile
   ```

2. 配置ssh免登录

   ```sh
   ssh-keygen -t rsa
   ssh-copy-id -i ~/.ssh/id_rsa.pub fzis@192.168.16.88
   ```

配玩上面步骤pipeline就能用scp了，如果还是不行，看下~.ssh/known_hosts中有没有要访问的ip了，如果没有执行：

```sh
# 如果有jenkins用户了，直接su jenkins
su -s /bin/bash jenkins
# 如果有jenkins用户了，直接cd ~
cd /var/lib/jenkins/
cd .ssh/
cat known_hosts
ssh fzis@192.168.16.88
cat known_hosts
```

