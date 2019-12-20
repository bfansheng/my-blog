#!/usr/bin

cd ./dist

git init
git add -A
git commit -m 'deploy'

git push -f git@gitee.com:bfansheng/bfansheng.git master