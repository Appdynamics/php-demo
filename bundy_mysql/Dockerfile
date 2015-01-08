FROM ubuntu

MAINTAINER Jeff Morgan (jeff.morgan@appdynamics.com)

################## BEGIN INSTALLATION ######################

# Update the repository sources list
RUN apt-get update

# Install Packages
RUN apt-get -y install mysql-server
RUN apt-get -y install python-mysqldb

# Configure MySQL
RUN sed -i '/^bind-address/c\bind-address=0.0.0.0' /etc/mysql/my.cnf
#RUN service mysql start && mysqladmin -uroot password webdev1
#RUN service mysql start && mysql -uroot -pwebdev1 -e "grant all on *.* to 'root'@'%' IDENTIFIED BY 'webdev1'"

# Create Databases
#RUN service mysql start && mysql -uroot -pwebdev1 -e "create database Store"
#RUN service mysql start && mysql -uroot -pwebdev1 -e "create database CRM"
#RUN service mysql start && mysql -uroot -pwebdev1 -e "create database Fullfillment"

# Add DB files (using root)
ADD /store.sql /root/
ADD /crm.sql /root/
ADD /fulfillment.sql /root/
ADD /crm-sprocs.sql /root/

# Upload DB files to DBs
#RUN service mysql start && mysql -uroot -pwebdev1 Store < /root/store.sql
#RUN service mysql start && mysql -uroot -pwebdev1 CRM < /root/crm.sql
#RUN service mysql start && mysql -uroot -pwebdev1 CRM < /root/crm-sprocs.sql
#RUN service mysql start && mysql -uroot -pwebdev1 Fullfillment < /root/fullfillment.sql

# Add startup script
ADD /startup.sh /root/
RUN chmod 777 /root/startup.sh
RUN chown -R root.root /root/

##################### INSTALLATION END #####################

# Expose Ports
EXPOSE 3306
EXPOSE 22

CMD /root/startup.sh && tail -F /var/log/mysql/error.log
