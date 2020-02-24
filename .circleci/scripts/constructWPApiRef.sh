#!/bin/bash
set -e

# This script is designed to run as part of the CircleCI build process. To run it locally, you must first have $GITHUB_TOKEN defined in your session, and run it from the project root.

cd $BUILD_PATH

## Construct an array of API Objects we want to query
declare -a Objects=("posts" "blocks" "categories" "tags" "pages" "comments" "taxonomies" "media" "users" "types" "statuses" "settings" "themes")

## Construct an empty JSON Array
printf "{" > source/data/wpApiRef.json

for obj in "${Objects[@]}"
do
    ## Construct Arrays for each object
    echo "Contricting $obj array:"
    printf "\"$obj\":" >> source/data/wpApiRef.json

    ## Import Posts Reference
    curl -X OPTIONS https://demo.wp-api.org/wp-json/wp/v2/$obj >> source/data/wpApiRef.json

    ## Comma before the next item
    printf "," >> source/data/wpApiRef.json

    ## Don't make the API endpoint hate us
    sleep 1
done
## Close parent arra
#printf "}" >> source/data/wpApiRef.json
sed -i -r 's/(.*)\,/\1\}/' source/data/wpApiRef.json 