#!/bin/sh

JAVA=/appdynamics/appdynamics-php-agent/proxy/jre/bin/java
AGENT_HOME=/appdynamics/MachineAgent
AGENT="$AGENT_HOME/machineagent.jar"
UNIQUE_HOST_ID=Commerce-Node1

echo "Configuring Machine Agent Analytics properties..."
/configAnalytics.sh

# Agent Options
# Uncomment and make available as needed
# -Dappdynamics.agent.applicationName   : application that the agent participates in
# -Dappdynamics.agent.logging.dir       : directory to put logs (agent "user" must have write permissions
# -Dmetric.http.listener=true | false   : open a kill port
# -Dmetric.http.listener.port           : the port to send kill messages

# Uncomment to configure Agents using controller-info.xml
echo "Configuring Machine Agent properties: ${AGENT_HOME}/conf/controller-info.xml"
sed -i "s/<controller-host>/<controller-host>${CONTROLLER}/g" /${AGENT_HOME}/conf/controller-info.xml
echo " controller-host: ${CONTROLLER}"
sed -i "s/<controller-port>/<controller-port>${APPD_PORT}/g" /${AGENT_HOME}/conf/controller-info.xml
echo " controller-port: ${APPD_PORT}"
sed -i "s/<account-access-key>/<account-access-key>${CTRLR_KEY}/g" /${AGENT_HOME}/conf/controller-info.xml
echo " account-access-key: ${CTRLR_KEY}"
sed -i "s/<application-name>/<application-name>${APP_NAME}/g" /${AGENT_HOME}/conf/controller-info.xml
echo " application-name: ${APP_NAME}"
sed -i "s/<tier-name>/<tier-name>${WEB_TIER_NAME}/g" /${AGENT_HOME}/conf/controller-info.xml
echo " tier-name: ${WEB_TIER_NAME}"
sed -i "s/<node-name>/<node-name>${WEB_NODE_NAME}/g" /${AGENT_HOME}/conf/controller-info.xml
echo " node-name: ${WEB_NODE_NAME}"

# Uncomment for multi-tenant controllers
# sed -i "s/<account-name>/<account-name>${ACCOUNT_NAME%%_*}/g" /${CATALINA_HOME}/appagent/conf/controller-info.xml
# echo " account-name: ${ACCOUNT_NAME%%_*}/g"

# Uncomment for Machine Agent config
sed -i "s/<sim-enabled>false/<sim-enabled>true/g" ${AGENT_HOME}/conf/controller-info.xml
echo " sim-enabled: true"
sed -i "s/<unique-host-id>/<unique-host-id>${UNIQUE_HOST_ID}/g" ${AGENT_HOME}/conf/controller-info.xml
echo " unique-host-id: ${UNIQUE_HOST_ID}"
sed -i "s/<machine-path>/<machine-path>${MACHINE_PATH_1}|${MACHINE_PATH_2}/g" ${AGENT_HOME}/conf/controller-info.xml
echo " machine-path: ${MACHINE_PATH_1}|${MACHINE_PATH_2}"

#AGENT_OPTIONS=-Dappdynamics.sim.enabled=true
#AGENT_OPTIONS="$AGENT_OPTIONS -Dappdynamics.agent.logging.dir="
#AGENT_OPTIONS="$AGENT_OPTIONS -Dmetric.http.listener=true | false"
#AGENT_OPTIONS="$AGENT_OPTIONS -Dmetric.http.listener.port=<port>"
#AGENT_OPTIONS="$AGENT_OPTIONS -Dappdynamics.agent.applicationName=${APP_NAME}"
#AGENT_OPTIONS="$AGENT_OPTIONS -Dappdynamics.controller.hostName=${CONTROLLER} -Dappdynamics.controller.port=${APPD_PORT}"
#AGENT_OPTIONS="$AGENT_OPTIONS -Dappdynamics.agent.uniqueHostId=$UNIQUE_HOST_ID"

nohup $JAVA $AGENT_OPTIONS -jar $AGENT &
