## 安装

```bash
# 运行以下命令以下载 Docker Compose 的当前稳定版本，要安装其他版本的 Compose，请替换 1.29.1。
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 将可执行权限应用于二进制文件：
sudo chmod +x /usr/local/bin/docker-compose

# 创建软链：
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# 测试是否安装成功：
docker-compose --version
```

