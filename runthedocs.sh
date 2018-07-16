#/bin/bash

# Invoke the docker image with a shared volume for source and ability to quit with CTRL+C

docker run -p 8000:8000 -v /home/alex/repos/documentati/source:/documentation/source -it documentation

