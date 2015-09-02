#!/bin/bash

if [ -z "${CONTROLLER}" ]; then
	export CONTROLLER="controller";
fi

if [ -z "${APPD_PORT}" ]; then
	export APPD_PORT=8090;
fi

if [ -z "${APP_NAME}" ]; then
	export APP_NAME="Online_Retail";
fi

if [ -z "${INV_TIER_NAME}" ]; then
        export INV_TIER_NAME="Inventory";
fi

if [ -z "${INV_NODE_NAME}" ]; then
        export INV_NODE_NAME="Inventory-Node1";
fi

if [ -z "${CTRLR_ACCOUNT}" ]; then
        export CTRLR_ACCOUNT=customer1;
fi

if [ -z "${CTRLR_KEY}" ]; then
        export CTRLR_KEY=key;
fi

# Set in Dockerfile based on installed App Server Agent version: _VERSION_STRING will be replaced during build
export VERSION_STRING="_VERSION_STRING"
