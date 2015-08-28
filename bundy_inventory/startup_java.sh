#!/bin/bash

# This is a startup script for the Bundy Java server

# Add entry to hosts file
sudo echo "127.0.0.1 www.shoewarehouse.com" >> /etc/hosts

# Startup
source /appdynamics/env.sh
#su - appdynamics -c "source /appdynamics/env.sh && mv /appdynamics/controller-info.xml ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/"
source /appdynamics/env.sh && mv /appdynamics/controller-info.xml ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/
#su - appdynamics -c "source /appdynamics/env.sh && sed -i 's#<controller-host></controller-host>#<controller-host>${CONTROLLER}</controller-host>#g' ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml"
source /appdynamics/env.sh && sed -i "s#<controller-host></controller-host>#<controller-host>${CONTROLLER}</controller-host>#g" ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml
#su - appdynamics -c "source /appdynamics/env.sh && sed -i 's#<controller-port></controller-port>#<controller-port>${APPD_PORT}</controller-port>#g' ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml"
source /appdynamics/env.sh && sed -i "s#<controller-port></controller-port>#<controller-port>${APPD_PORT}</controller-port>#g" ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml
#su - appdynamics -c "source /appdynamics/env.sh && sed -i 's#<application-name></application-name>#<application-name>${APP_NAME}</application-name>#g' ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml"
source /appdynamics/env.sh && sed -i "s#<application-name></application-name>#<application-name>${APP_NAME}</application-name>#g" ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml
#su - appdynamics -c "source /appdynamics/env.sh && sed -i 's#<tier-name></tier-name>#<tier-name>${INV_TIER_NAME}</tier-name>#g' ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml"
source /appdynamics/env.sh && sed -i "s#<tier-name></tier-name>#<tier-name>${INV_TIER_NAME}</tier-name>#g" ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml
#su - appdynamics -c "source /appdynamics/env.sh && sed -i 's#<node-name></node-name>#<node-name>${INV_NODE_NAME}</node-name>#g' ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml"
source /appdynamics/env.sh && sed -i "s#<node-name></node-name>#<node-name>${INV_NODE_NAME}</node-name>#g" ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml
#su - appdynamics -c "source /appdynamics/env.sh && sed -i 's#<account-name></account-name>#<account-name>customer1</account-name>#g' ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml"
source /appdynamics/env.sh && sed -i "s#<account-name></account-name>#<account-name>customer1</account-name>#g" ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml
#su - appdynamics -c "source /appdynamics/env.sh && sed -i 's#<account-access-key></account-access-key>#<account-access-key>${CTRLR_KEY}</account-access-key>#g' ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml"
source /appdynamics/env.sh && sed -i "s#<account-access-key></account-access-key>#<account-access-key>${CTRLR_KEY}</account-access-key>#g" ${CATALINA_HOME}/AppServerAgent/${VERSION_STRING}/conf/controller-info.xml
#su - appdynamics -c '/appdynamics/demo/bin/startup.sh'
source /appdynamics/demo/bin/startup.sh
#su - appdynamics -c '/appdynamics/slow/bin/startup.sh'
source /appdynamics/slow/bin/startup.sh

exit 0
