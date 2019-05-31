#!/bin/bash

# db running and initializing script

containerName=$(docker run -d -p 27017:27017 mongo)

docker cp parts.json ${containerName}:/tmp/parts.json

docker exec ${containerName} mongoimport -d shutter -c parts --file /tmp/parts.json
