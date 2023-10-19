echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r -i ~laundyhubvn.com dist/* root@143.198.214.247:/var/www/laundryhubvn/
echo "Done!"
chmod u+x deploy.sh