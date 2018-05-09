#!/bin/bash

# Start the Sculpin server
#bin/sculpin server

# Instead, use the watch.php script and a basic server
grunt watch && php watch.php & php -S0.0.0.0:8000 -t output_dev/
