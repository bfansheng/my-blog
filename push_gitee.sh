#!/usr/bin

cd ./public

git init
git add -A
git commit -m 'deploy'

git push -f git@gitee.com:bfansheng/bfansheng.git master