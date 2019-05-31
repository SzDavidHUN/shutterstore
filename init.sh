#!/bin/bash

docker run --detach -p 27017:27017 mongo

mongoimport --host localhost:27017 --db shutterstore --collection order  data/order.json
mongoimport --host localhost:27017 --db shutterstore --collection customer  data/customer.json
mongoimport --host localhost:27017 --db shutterstore --collection invoice  data/invoice.json

npm install
npm --prefix frontend install
npm --prefix frontend run-script build
