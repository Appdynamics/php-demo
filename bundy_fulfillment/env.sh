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

if [ -z "${FUL_TIER_NAME}" ]; then
        export FUL_TIER_NAME="Fulfillment";
fi

if [ -z "${FUL_NODE_NAME}" ]; then
        export FUL_NODE_NAME="Fulfillment-Node1";
fi

if [ -z "${CTRLR_ACCOUNT}" ]; then
        export CTRLR_ACCOUNT=customer1;
fi

if [ -z "${MACHINE_PATH_1}" ]; then 
        export MACHINE_PATH_1=Online-Retail
fi

if [ -z "${MACHINE_PATH_2}" ]; then 
        export MACHINE_PATH_2=Fulfillment
fi
