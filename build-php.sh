#!/bin/bash

# Temp dir for installers
mkdir -p .appdynamics

# Prompt for location of Controller and EUEM Installers if called without arguments
if  [ $# -eq 0 ]
then   
    read -e -p "Enter path to Agent Installer: " AGENT_INSTALL
    cp ${AGENT_INSTALL} .appdynamics/appdynamics-php-agent-x64-linux.tar.bz2
    read -e -p "Enter path to MA Installer: " MA_INSTALL
    cp ${MA_INSTALL} .appdynamics/MachineAgent.zip
    read -e -p "Enter path to MA Installer: " JA_INSTALL
    cp ${JA_INSTALL} .appdynamics/AppServerAgent.zip
else
  # Download Agent, MA, and JA Installers from download.appdynamics.com
  # Requires an AppDynamics portal login: prompt user for email/password
  if [[ $1 == *--download* ]]
  then
    # Requires an AppDynamics portal login to download AppServer, Machine and DB Agents

    echo "Please Sign In to download agent..."
    echo "Email ID/UserName: "
    read USER_NAME

    stty -echo
    echo "Password: "
    read PASSWORD
    stty echo

    if [ "$USER_NAME" != "" ] && [ "$PASSWORD" != "" ];
    then
        wget --save-cookies cookies.txt  --post-data "username=$USER_NAME&password=$PASSWORD" --no-check-certificate https://login.appdynamics.com/sso/login/

        echo "Downloading AppDynamics PHP Agent..."
        wget --load-cookies cookies.txt https://download.appdynamics.com/onpremise/public/latest/appdynamics-php-agent-x64-linux.tar.bz2 -O .appdynamics/appdynamics-php-agent-x64-linux.tar.bz2
        if [ $? -ne 0 ]; then
            rm cookies.txt index.html*
            exit 
        fi
        AGENT_INSTALL=".appdynamics/appdynamics-php-agent-x64-linux.tar.bz2"

        echo "Downloading MA..."
        wget --load-cookies cookies.txt https://download.appdynamics.com/onpremise/public/latest/MachineAgent.zip -O .appdynamics/MachineAgent.zip
        if [ $? -ne 0 ]; then
            rm cookies.txt index.html*
            exit 
        fi
        MA_INSTALL=".appdynamics/MachineAgent.zip"
        
	echo "Downloading JA..."
        wget --load-cookies cookies.txt https://download.appdynamics.com/onpremise/public/latest/AppServerAgent.zip -O .appdynamics/AppServerAgent.zip
        if [ $? -ne 0 ]; then
            rm cookies.txt index.html*
            exit 
        fi
        JA_INSTALL=".appdynamics/AppServerAgent.zip"
    else
        echo "Username or Password missing"
    fi

    # Clean up - remove cookies and index.html
    rm cookies.txt index.html*

  else

    # Allow user to specify locations of Controller and EUEM Installers
    while getopts "c:e:" opt; do
      case $opt in
        c)
          AGENT_INSTALL=$OPTARG
          if [ ! -e ${AGENT_INSTALL} ]
          then
            echo "Not found: ${AGENT_INSTALL}"
            exit
          fi
          cp ${AGENT_INSTALL} .appdynamics/appdynamics-php-agent-x64-linux.tar.bz2
          ;;
        e)
          MA_INSTALL=$OPTARG
          if [ ! -e ${MA_INSTALL} ]
          then
            echo "Not found: ${MA_INSTALL}"
            exit
          fi
          cp ${MA_INSTALL} .appdynamics/MachineAgent.zip
          ;;
        d)
          JA_INSTALL=$OPTARG
          if [ ! -e ${JA_INSTALL} ]
          then
            echo "Not found: ${JA_INSTALL}"
            exit
          fi
          cp ${JA_INSTALL} .appdynamics/AppServerAgent.zip
          ;;
        \?)
          echo "Invalid option: -$OPTARG"
          ;;
      esac
    done

  fi

fi
          
# Copy installation files and scripts to build base image
cp .appdynamics/appdynamics-php-agent-x64-linux.tar.bz2 bundy_webserver/
cp .appdynamics/appdynamics-php-agent-x64-linux.tar.bz2 bundy_fulfillment/
cp .appdynamics/MachineAgent.zip bundy_webserver/
cp .appdynamics/MachineAgent.zip bundy_fulfillment/
cp .appdynamics/AppServerAgent.zip bundy_inventory/

# Build PHP Demo image then tidy up
(cd bundy_webserver; docker build -t appdynamics/bundy_web:4.0.4.2 .)
(cd bundy_fulfillment; docker build -t appdynamics/bundy_ful:4.0.4.2 .)
(cd bundy_inventory; docker build -t appdynamics/bundy_inv:4.0.4.2 .)
(rm -rf bundy_webserver/appdynamics-php-agent-x64-linux.tar.bz2 bundy_webserver/MachineAgent.zip bundy_fulfillment/appdynamics-php-agent-x64-linux.tar.bz2 bundy_fulfillment/MachineAgent.zip bundy_inventory/AppServerAgent.zip)

# Cleanup temp dirs
rm -rf .appdynamics
