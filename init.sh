#!/bin/bash

docker run --detach -p 27017:27017 mongo

mongoimport --host localhost:27017 --db shutterstore --collection order  data/order.json
mongoimport --host localhost:27017 --db shutterstore --collection customer  data/customer.json

npm install
npm --prefix frontend install
npm --prefix frontend build
