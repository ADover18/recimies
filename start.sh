#!/bin/zsh
./docker_db.sh && sleep 10; python3 recimies_site/manage.py migrate && python3 recimies_site/manage.py runserver
