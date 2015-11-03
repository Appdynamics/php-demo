FROM appdynamics/bundy_base

MAINTAINER Jeff Morgan (jeff.morgan@appdynamics.com)

################## BEGIN INSTALLATION ######################

# Install tomcat7-user
RUN apt-get update
RUN apt-get -y install tomcat7-user

# Create Tomcat Instances
RUN tomcat7-instance-create /appdynamics/demo
RUN tomcat7-instance-create /appdynamics/slow

# Setup slow config
ADD /src/slow /appdynamics/slow/webapps/slow
ADD /server_slow.xml /appdynamics/slow/conf/server.xml
ADD /startup_slow.sh /appdynamics/slow/bin/startup.sh
RUN chmod 755 /appdynamics/slow/bin/*

# Setup BundyBackend
ADD /src/BundyBackend /appdynamics/demo/webapps/BundyBackend
ADD /server.xml /appdynamics/demo/conf/
ADD /startup.sh /appdynamics/demo/bin/
ADD /setenv.sh /appdynamics/demo/bin/
RUN chmod 755 /appdynamics/demo/bin/*

# Configure AppDynamics Agent
ENV CATALINA_HOME /appdynamics
ADD /AppServerAgent.zip /appdynamics/
RUN mkdir /appdynamics/AppServerAgent
RUN unzip -o -d /appdynamics/AppServerAgent /appdynamics/AppServerAgent.zip
ADD /controller-info.xml /appdynamics/

# Install Machine Agent
ADD /MachineAgent.zip /appdynamics/
RUN mkdir /appdynamics/MachineAgent
RUN unzip -o -d /appdynamics/MachineAgent /appdynamics/MachineAgent.zip
ADD /startMachineAgent.sh /appdynamics/MachineAgent/
RUN chmod 777 /appdynamics/MachineAgent/startMachineAgent.sh
ADD /killMachineAgent.sh /appdynamics/MachineAgent/
RUN chmod 777 /appdynamics/MachineAgent/killMachineAgent.sh

# Add startup script
ADD /startup_java.sh /appdynamics/
RUN chmod 777 /appdynamics/startup_java.sh
ADD /env.sh /appdynamics/
RUN chmod 777 /appdynamics/env.sh
RUN (version=`find ${CATALINA_HOME}/AppServerAgent -maxdepth 1 -type d -name "ver*" | sed "s:^${CATALINA_HOME}/AppServerAgent/::"`; sed -e "s:_VERSION_STRING:$version:g" /appdynamics/env.sh > /appdynamics/env.sh.tmp && mv /appdynamics/env.sh.tmp /appdynamics/env.sh)
#RUN chown -R appdynamics.appdynamics /appdynamics

##################### INSTALLATION END #####################

# Expose Ports
EXPOSE 22
EXPOSE 8080
EXPOSE 8081

# Start it up!
CMD /appdynamics/startup_java.sh && tail -F /var/log/dmesg
