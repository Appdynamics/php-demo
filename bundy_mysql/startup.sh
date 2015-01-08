#!/bin/bash

# This is a script to start Bundy's MySQL server

# Start MySQL
sudo service mysql start

# Configure MySQL
sudo mysqladmin -uroot password webdev1
sudo mysql -uroot -pwebdev1 -e "grant all on *.* to 'root'@'%' IDENTIFIED BY 'webdev1'"

# Create Databases
sudo mysql -uroot -pwebdev1 -e "create database Store"
sudo mysql -uroot -pwebdev1 -e "create database CRM"
sudo mysql -uroot -pwebdev1 -e "create database Fulfillment"

# Upload DB files
sudo mysql -uroot -pwebdev1 Store < /root/store.sql
sudo mysql -uroot -pwebdev1 CRM < /root/crm.sql
sudo mysql -uroot -pwebdev1 CRM < /root/crm-sprocs.sql
sudo mysql -uroot -pwebdev1 Fulfillment < /root/fulfillment.sql

# Restart MySQL
sudo service mysql restart

exit 0
