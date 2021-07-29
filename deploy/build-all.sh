#!/bin/bash
# export BUILD_ENV=production
# export export BUILD_ENV=test
echo "CIMS - build started"

if [ $# -eq 0 ]
  then
    echo "No arguments supplied."
    exit 1
fi

if [ "$1" == "front" ]; then
    echo "building front end application env $BUILD_ENV"
    cd ../frontend
    if test -d node_modules;then 
        echo "node_modules exist."
        echo "build without npm install command"
    else
        echo "Installing node modules"
        npm install
    fi
    npm run-script build
    echo "building front end docker image.."
    docker build -t cims_nginx .
fi

if [ "$1" == "back" ] || [ "$2" == "back" ]; then
    cd ../backend
    echo "building backend docker image..."
    ./mvnw -Pprod,swagger jib:dockerBuild -Dmaven.test.skip=true
fi


cd ../deploy
echo "completed building and creating docker images"
echo "================================================================"
