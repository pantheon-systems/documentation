#/bin/bash

printf "Creating the Docker container... \n"

# Invoke the docker image with a shared volume for source.
if docker run -p 8000:8000 --name=pantheon-docs -v $(pwd)/source:/documentation/source -dit pantheonsystems/documentation > /dev/null 2>&1; then
    printf "Container built and running. 👍👍 \n"
else
    printf "Container exists, restarting... \n"
    docker container start pantheon-docs
    printf "\n"
    printf "Container restarted. 👍👍 \n"
fi

printf "Building the latest docs... \n"
#docker exec pantheon-docs /documentation/node_modules/.bin/grunt --force > /dev/null - Disabled pending permissions resolution
docker exec pantheon-docs /documentation/bin/sculpin generate --env=dev

printf "Done! Go to http://localhost:8000/docs in your browser.\n\n"

# Start app script, which invokes grunt (disabled), the watch script, and a simple PHP web server
docker exec pantheon-docs /documentation/scripts/app.sh
