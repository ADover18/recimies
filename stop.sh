#!/bin/sh
docker container stop $(docker container ls | grep postgres | awk '{print $1}')