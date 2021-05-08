# build frontend
echo 'Building frontend ...'
cd ../frontend/
npm run-script build

echo 'Building nginx docker'
docker build -t cims-web-app .