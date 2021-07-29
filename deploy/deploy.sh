#!/bin/bash

echo "staring to deploy cims"

echo "[docker-compose down]"
docker compose down

# echo "[docker image rm -f "$DOCKER_REPO"/ifsx_ng:latest]"
# docker image rm -f cims_ngnix:latest

#
docker compose up -d 

echo "deployment complete....."