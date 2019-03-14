#/bin/bash

printf "Stopping any running pantheon-docs containers... \n \n"

docker container stop pantheon-docs

printf "Removing old container.. \n \n"

docker container rm pantheon-docs

printf "Pulling latest image... \n \n"

docker image pull pantheonsystems/documentation

printf "\n Done! Execute ./runthedocs.sh to start the application. \n \n"
