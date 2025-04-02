#!/bin/sh
export DOCKER_DEFAULT_PLATFORM=linux/amd64
docker build -t mino-admin .
docker tag mino-admin mw60680/mino-admin
docker push mw60680/mino-admin