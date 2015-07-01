ember build -e production
rm -rf ~/Mission/qilebao/public/assets
rm -rf ~/Mission/qilebao/public/images
cp -rf ~/Mission/frontend/dist/ ~/Mission/qilebao/public/
