#!/bin/bash

# Set correct variables
source /appdynamics/env.sh

MACHINE_AGENT_HOME=/appdynamics/MachineAgent
ACCOUNT_NAME=${GLOBAL_ACCOUNT_NAME}
ACCESS_KEY=${CTRLR_KEY}
NODE_NAME=${COM_NODE_NAME}
TIER_NAME=${COM_TIER_NAME}
APP_NAME=${APP_NAME}

# Configure analytics-agent.properties
aaprop=${MACHINE_AGENT_HOME}/monitors/analytics-agent/conf/analytics-agent.properties

if [ "$(grep '^http.event.endpoint=' $aaprop)" ]; then
        echo "${aaprop}: setting event.endpoint: ${EVENT_ENDPOINT}"
	sed -i "/^http.event.endpoint=/c\http.event.endpoint=${EVENT_ENDPOINT}\/v1" ${aaprop}
else
        echo "${aaprop}: http.event.endpoint property not found"
fi

if [ "$(grep '^http.event.accountName=' $aaprop)" ]; then
        echo "${aaprop}: setting event.accountName: ${ACCOUNT_NAME}"
	sed -i "/^http.event.accountName=/c\http.event.accountName=${ACCOUNT_NAME}" ${aaprop}
else
        echo "${aaprop}: http.event.accountName property not found"
fi

if [ "$(grep '^http.event.accessKey=' $aaprop)" ]; then
        echo "${aaprop}: setting event.accessKey: ${ACCESS_KEY}"
        sed -i "/^http.event.accessKey=/c\http.event.accessKey=${ACCESS_KEY}" ${aaprop}
else
        echo "${aaprop}: http.event.accessKey property not found"
fi

# Configure monitor.xml
monxml=${MACHINE_AGENT_HOME}/monitors/analytics-agent/monitor.xml

if [ "$(grep '<enabled>false</enabled>' $monxml)" ]; then
        echo "${monxml}: setting to "true""
	sed -i 's#<enabled>false</enabled>#<enabled>true</enabled>#g' ${monxml}
else
        echo "${monxml}: already enabled or doesn't exist"
fi

# Set NODE, TIER and APP names for Apache error log monitoring
# Log file location is pre-configured and log analytics enabled
apelj=${MACHINE_AGENT_HOME}/monitors/analytics-agent/conf/job/bundy_webserver-error-log.job

if [ "$(grep '_NODE_NAME' ${apelj})" ]; then
        echo "${apelj}: setting NODE_NAME to "${NODE_NAME}""
        sed -i "s/_NODE_NAME/${NODE_NAME}/g" ${apelj}
else
        echo "Error configuring ${apelj}: _NODE_NAME not found"
fi

if [ "$(grep '_TIER_NAME' ${apelj})" ]; then
        echo "${apelj}: setting TIER_NAME to "${TIER_NAME}""
        sed -i "s/_TIER_NAME/${TIER_NAME}/g" ${apelj}
else
        echo "Error configuring ${apelj}: _TIER_NAME not found"
fi

if [ "$(grep '_APP_NAME' ${apelj})" ]; then
        echo "${apelj}: setting APP_NAME to "${APP_NAME}""
        sed -i "s/_APP_NAME/${APP_NAME}/g" ${apelj}
else
        echo "Error configuring ${apelj}: _APP_NAME not found"
fi

# Set NODE, TIER and APP names for Apache access log monitoring
# Log file location is pre-configured and log analytics enabled
apalj=${MACHINE_AGENT_HOME}/monitors/analytics-agent/conf/job/bundy_webserver-access-log.job

if [ "$(grep '_NODE_NAME' ${apalj})" ]; then
        echo "${apalj}: setting NODE_NAME to "${NODE_NAME}""
        sed -i "s/_NODE_NAME/${NODE_NAME}/g" ${apalj}
else
        echo "Error configuring ${apalj}: _NODE_NAME not found"
fi

if [ "$(grep '_TIER_NAME' ${apalj})" ]; then
        echo "${apalj}: setting TIER_NAME to "${TIER_NAME}""
        sed -i "s/_TIER_NAME/${TIER_NAME}/g" ${apalj}
else
        echo "Error configuring ${apalj}: _TIER_NAME not found"
fi

if [ "$(grep '_APP_NAME' ${apalj})" ]; then
        echo "${apalj}: setting APP_NAME to "${APP_NAME}""
        sed -i "s/_APP_NAME/${APP_NAME}/g" ${apalj}
else
        echo "Error configuring ${apalj}: _APP_NAME not found"
fi
