#!/bin/sh

#UNIQUE_HOST_ID=Inventory-Node1

#!/bin/bash

#nohup java -Dappdynamics.agent.uniqueHostId=${UNIQUE_HOST_ID} -jar /appdynamics/MachineAgent/machineagent.jar &
nohup java -jar /appdynamics/MachineAgent/machineagent.jar &
