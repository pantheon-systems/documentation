#/bin/bash


# Invoke the docker image with a shared volume for source.
if docker run -p 8000:8000 --name=pantheon-docs -v $(pwd)/source:/documentation/source -dit pantheonsystems/documentation; then
    printf "Container built and running \n"
else
    printf "Container exists... \n"
    docker container start pantheon-docs
fi

printf "Building the latest docs... \n"
docker exec pantheon-docs /documentation/node_modules/.bin/grunt --force
docker exec pantheon-docs /documentation/bin/sculpin generate --env=dev

# Start app script, which invokes grunt, the watch script, and a simple PHP web server
docker exec pantheon-docs /documentation/scripts/app.sh
