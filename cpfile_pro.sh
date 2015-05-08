ember build -e production
rm -rf ~/Mission/bull/public/mobile/
cp -rf ~/Mission/frontend/dist/ ~/Mission/bull/public/mobile/
cp ~/Mission/frontend/dist/index.html ~/Mission/bull/app/views/mobile/
