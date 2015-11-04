#! /bin/bash

if [ "$#" -eq 1 ]; then
  export TAG_VERSION=$1
  export REGISTRY="appdynamics"
elif [ "$#" -eq 2 ]; then
  export TAG_VERSION=$1;
  export REGISTRY=$2;
else
  echo "Usage: tagAll.sh <tag> [<registry>]"
  exit
fi

export WEB_LATEST=`docker images | grep 'appdynamics/bundy_web' | grep 'latest' | awk '{print $3}'`
export FUL_LATEST=`docker images | grep 'appdynamics/bundy_ful' | grep 'latest' | awk '{print $3}'`
export INV_LATEST=`docker images | grep 'appdynamics/bundy_inv' | grep 'latest' | awk '{print $3}'`
export LOAD_LATEST=`docker images | grep 'appdynamics/bundy_load' | grep 'latest' | awk '{print $3}'`

if [ ${REGISTRY} == "appdynamics" ]; then
  echo "Tagging to Default Registry: Dockerhub"
  docker tag -f $WEB_LATEST appdynamics/bundy-web:$TAG_VERSION
  docker tag -f $FUL_LATEST appdynamics/bundy_ful:$TAG_VERSION
  docker tag -f $INV_LATEST appdynamics/bundy_inv:$TAG_VERSION
  docker tag -f $LOAD_LATEST appdynamics/bundy_load:$TAG_VERSION
else
  echo "Tagging to Registry: ${REGISTRY}"
  docker tag -f $WEB_LATEST ${REGISTRY}/bundy/bundy_web:$TAG_VERSION
  docker tag -f $FUL_LATEST ${REGISTRY}/bundy/bundy_ful:$TAG_VERSION
  docker tag -f $INV_LATEST ${REGISTRY}/bundy/bundy_inv:$TAG_VERSION
  docker tag -f $LOAD_LATEST ${REGISTRY}/bundy/bundy_load:$TAG_VERSION
fi

if [[ `docker images -q --filter "dangling=true"` ]]
then
  echo
  echo "Deleting intermediate containers..."
  docker images -q --filter "dangling=true" | xargs docker rmi;
fi
