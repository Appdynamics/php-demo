#!/bin/bash

if [ -z "${CONTROLLER}" ]; then
	export CONTROLLER="controller";
fi

if [ -z "${APPD_PORT}" ]; then
	export APPD_PORT=8090;
fi

if [ -z "${APP_NAME}" ]; then
	export APP_NAME="Online Retail";
fi

if [ -z "${COM_TIER_NAME}" ]; then
	export COM_TIER_NAME="Commerce";
fi

if [ -z "${COM_NODE_NAME}" ]; then
	export COM_NODE_NAME="Commerce-Node1";
fi

if [ -z "${EUM_KEY}" ]; then
	export EUM_KEY=DEMO;
fi
