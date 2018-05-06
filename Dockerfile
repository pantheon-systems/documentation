# Use a Pre-Built CircleCI Docker Image known to work with Composer
FROM circleci/php:7.1-node-browsers

USER $USER

# Declare working directory
WORKDIR /documentation

# Copy the working directory into the container
ADD . /documentation

# Install dependencies
RUN composer self-update && composer install \
&& sudo apt-get install ruby-full && sudo apt-get install zlib1g-dev && gem install pkg-config -v "~> 1.1" \
&& gem install bundler && bundle install \
&& npm install

# Compile assets (CSS and Terminus Manual)
RUN node_modules/.bin/grunt \
&& vendor/pantheon-systems/terminus/bin/terminus list > source/docs/assets/terminus/commands.json --format=json \
&& curl https://api.github.com/repos/pantheon-systems/terminus/releases > source/docs/assets/terminus/releases.json

# Generate the site in development mode (include drafts)
RUN bin/sculpin generate --env=dev \
&& cd output_dev && ln -s ./ source && cd ..\
&& bash -c "scripts/fix-changelog-index.sh"

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Serve the site
CMD bin/sculpin server
