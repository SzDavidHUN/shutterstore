#!/bin/bash

# db running and initializing script

docker run -d -p 27017:27017 mongo

mongoimport --host localhost:27017 -d shutter -c parts --file parts.json