# Use a Pre-Built CircleCI Docker Image known to work with Composer
FROM circleci/php:7.1-node-browsers

# Set working directory
WORKDIR documentation

# Install Ruby
RUN sudo apt-get install ruby-full

# Install Ruby dependencies
RUN sudo apt-get install zlib1g-dev
RUN sudo gem install pkg-config -v "~> 1.1"
RUN sudo chmod -R 777 /var/lib/gems/ /usr/local/bin .
# TODO: add --no-document
RUN gem install bundler
COPY Gemfile ./
RUN bundle install --jobs=4

# Update Composer
RUN composer self-update

# Install PHP dependencies
COPY composer.json ./
RUN composer install

# Install node dependencies
COPY package.json ./
RUN npm install

# Copy the working directory into the container
ADD . ./

RUN sudo chmod -R 777 .

# Compile assets (CSS and Terminus Manual)
RUN node_modules/.bin/grunt

RUN vendor/pantheon-systems/terminus/bin/terminus list > source/docs/assets/terminus/commands.json --format=json

RUN curl https://api.github.com/repos/pantheon-systems/terminus/releases > source/docs/assets/terminus/releases.json

# Generate the site in development mode (include drafts)
RUN bin/sculpin generate --env=dev \
&& cd output_dev && ln -s ./ source && cd ..\
&& bash -c "scripts/fix-changelog-index.sh"

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Serve the site
CMD /documentation/app.sh
