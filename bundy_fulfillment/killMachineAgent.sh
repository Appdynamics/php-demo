#!/bin/bash

echo "killing MachineAgent"

echo `ps -ef | grep machineagent.jar | grep -v grep | awk '{print $2}'`

kill -9 `ps -ef | grep machineagent.jar | grep -v grep | awk '{print $2}'`
