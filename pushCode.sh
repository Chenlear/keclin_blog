cd /keclin/keclin_blog/

git reset --hard origin/master

git clean -f

git pull

rm -rf /dist

npm run build
