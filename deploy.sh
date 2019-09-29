#!/usr/bin
git_path=E:/30-MyData/bfansheng.github.io

cnpm run build
rm -rf $git_path
cp ./public $git_path

git init
git add -A
git commit -m 'deploy'

git remote add origin https://github.com/bfansheng/bfansheng.github.io.git
git push -u origin master
#git push

