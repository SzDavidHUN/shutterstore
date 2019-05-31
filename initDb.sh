#!/usr/bin/env bash

docker kill $(docker ps -q)
#docker rm $(docker ps -a -q)

docker run --detach -p 27017:27017 mongo

mongoimport --host localhost:27017 --db shutterstore --collection order  data/order.json
mongoimport --host localhost:27017 --db shutterstore --collection customer  data/customer.json
