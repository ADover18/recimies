#!/bin/bash
docker pull postgres;
docker run --rm  --name rdb -e POSTGRES_PASSWORD=$PGPW -e POSTGRES_USER=recipies -e POSTGRES_DB=recimies -d -p 5432:5432 postgres;
