#! /bin/bash

if [ "$#" -eq 1 ]; then
  export TAG_VERSION=$1
  echo "Pushing images with tag: ${TAG_VERSION} to dockerhub"
  for i in $(docker images | grep "appdynamics/ecommerce" | grep $TAG_VERSION | awk {'print $1'}); do
    echo Pushing:  $i:${TAG_VERSION}
    docker push $i:$TAG_VERSION
  done
elif [ "$#" -eq 3 ]; then
  export TAG_VERSION=$1;
  export REGISTRY=$2;
  export APP_NAME=$3;
  echo "Pushing images with tag: ${TAG_VERSION} to ${REGISTRY}/${APP_NAME}"
  for i in $(docker images | grep ${REGISTRY} | grep ${APP_NAME} | grep $TAG_VERSION | awk {'print $1'}); do
    echo Pushing:  $i:${TAG_VERSION}
    docker push $i:$TAG_VERSION
  done
else
  echo "Usage: pushAll.sh <tag> [<registry> <application>]"
  exit
fi
