#!/bin/sh
nohup node app.js > /dev/null 2>&1 &
envoy -c /usr/src/app/service-envoy.yaml --service-cluster service2
