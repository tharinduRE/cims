<p align="center">
    <img src="docs/logo-512w.png" alt="Chakra logo" width="100" />
</p>
<h1 align="center"> Chemical Inventory Management System </h1> <br>

![LICENSE](https://img.shields.io/github/license/tharinduRE/cims-web-app)



![mockup-image](docs/mockup-image-1.png)

# Frontend
React SPA 
```
cd cims-frontend

npm start
```

# Backend 

Backend repo [here](http://github.com/tharinduRe/cims-rest-api)

```
git clone http://github.com/tharinduRe/cims-rest-api.git

mvn springboot:run
```
# Deploy

```
cd deploy

./build-back
./build-front

docker-compose up
```