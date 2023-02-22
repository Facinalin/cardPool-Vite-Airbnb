#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B master
git add -A
git commit -m 'deploy'

#以下是兩個選項，要main分支的選擇一，要gh-pages選擇二：

# 選擇一：if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# 選擇二：if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Facinalin/cardPool-Vite-Airbnb.git master:gh-pages


cd -