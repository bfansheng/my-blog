#!/usr/bin

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run build

# 进入生成的文件夹
cd ./public

# 如果是发布到自定义域名
echo 'bfans.xyz' > CNAME

