FROM appdynamics/bundy_base

MAINTAINER Jeff Morgan (jeff.morgan@appdynamics.com)

################## BEGIN INSTALLATION ######################

# Install tomcat7-user
RUN apt-get update
RUN apt-get -y install tomcat7-user

# Create Tomcat Instances
RUN tomcat7-instance-create /appdynamics/demo
RUN tomcat7-instance-create /appdynamics/slow

# Add hosts file entry
#ADD /hosts /etc/
#RUN sudo echo "127.0.0.1 www.shoewarehouse.com" >> /etc/hosts

# Setup slow config
ADD /slow.zip /appdynamics/
RUN unzip -o -d /appdynamics/slow/webapps/ /appdynamics/slow.zip
ADD /server_slow.xml /appdynamics/slow/conf/server.xml
ADD /startup_slow.sh /appdynamics/slow/bin/startup.sh
RUN chmod 755 /appdynamics/slow/bin/*

# Setup BundyBackend
ADD /BundyBackend.zip /appdynamics/
RUN unzip -o -d /appdynamics/demo/webapps/ /appdynamics/BundyBackend.zip
ADD /server.xml /appdynamics/demo/conf/
ADD /startup.sh /appdynamics/demo/bin/
ADD /setenv.sh /appdynamics/demo/bin/
RUN chmod 755 /appdynamics/demo/bin/*

# Configure AppDynamics Agent
ADD /AppServerAgent-3.9.2.1.zip /appdynamics/
RUN mkdir /appdynamics/AppServerAgent
RUN unzip -o -d /appdynamics/AppServerAgent /appdynamics/AppServerAgent-3.9.2.1.zip
ADD /controller-info.xml /appdynamics/AppServerAgent/conf/

# Add startup script
ADD /startup_java.sh /appdynamics/
RUN chmod 777 /appdynamics/startup_java.sh

# Make sure home dir is owned by user
RUN chown -R appdynamics.appdynamics /appdynamics

##################### INSTALLATION END #####################

# Expose Ports
EXPOSE 22
EXPOSE 8080
EXPOSE 8081

# Start it up!
CMD /appdynamics/startup_java.sh && tail -F /var/log/syslog
