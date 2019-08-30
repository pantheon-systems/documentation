#!/bin/bash

# Move to the project root
cd /documentation/

#Start Grunt to listen for CSS changes - DISABLED until permissions issue for files mounted from the host are resolved.
#node_modules/.bin/grunt watch &

# Kill any existing processes
pkill php
# Start the watch script and PHP web server
php ./scripts/watch.php & php -S0.0.0.0:8000 -t output_dev/
