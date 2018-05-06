# Use a Pre-Built CircleCI Docker Image known to work with Composer
FROM circleci/php:7.1-node-browsers

USER $USER

# Declare working directory
WORKDIR /documentation

# Copy the working directory into the container
ADD . /documentation

RUN composer self-update && composer install && sudo apt-get install ruby-full && gem install bundler && npm install

# Compile CSS
RUN ./node_modules/.bin/grunt

# Generate the site in development mode (include drafts)
RUN bin/sculpin generate --env=dev

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Serve the site
CMD bin/sculpin server
