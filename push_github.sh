#!/usr/bin

cd ./dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:bfansheng/bfansheng.github.io.git master