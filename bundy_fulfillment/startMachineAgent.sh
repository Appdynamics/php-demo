#!/bin/sh

JAVA=/appdynamics/appdynamics-php-agent/proxy/jre/bin/java
AGENT_HOME=/appdynamics/MachineAgent
AGENT="$AGENT_HOME/machineagent.jar"
UNIQUE_HOST_ID=Fulfillment-Node1

echo "Configuring Machine Agent Analytics properties..."
/configAnalytics.sh

# Agent Options
# Uncomment and make available as needed
# -Dappdynamics.agent.applicationName   : application that the agent participates in
# -Dappdynamics.agent.logging.dir       : directory to put logs (agent "user" must have write permissions
# -Dmetric.http.listener=true | false   : open a kill port
# -Dmetric.http.listener.port                   : the port to send kill messages

AGENT_OPTIONS=
#AGENT_OPTIONS="$AGENT_OPTIONS -Dappdynamics.agent.applicationName=<application-name>"
#AGENT_OPTIONS="$AGENT_OPTIONS -Dappdynamics.agent.logging.dir="
#AGENT_OPTIONS="$AGENT_OPTIONS -Dmetric.http.listener=true | false
#AGENT_OPTIONS="$AGENT_OPTIONS -Dmetric.http.listener.port=<port>"
AGENT_OPTIONS="$AGENT_OPTIONS -Dappdynamics.agent.uniqueHostId=$UNIQUE_HOST_ID"

nohup $JAVA $AGENT_OPTIONS -jar $AGENT &
