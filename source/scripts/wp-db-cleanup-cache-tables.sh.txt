#!/bin/bash

echo 'Provide the site name (e.g. your-awesome-site), then press [ENTER]:';
read SITE;

echo 'Provide the site name (multidev, dev, test, or live), then press [ENTER]:';
read ENV;

# Get a list of all cache tables
CACHETABLES="$(terminus wp $SITE.$ENV -- db query "SHOW TABLES LIKE 'cache%';")"

# Trucate each cache table in a loop to avoid resource contention and potential deadlocks.

for table in $CACHETABLES; do
    terminus wp $SITE.$ENV -- db query "TRUNCATE TABLE $table;"
done
