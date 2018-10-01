# Use a Pre-Built CircleCI Docker Image known to work with Composer
FROM circleci/php:7.1-node-browsers-legacy


# Define the user as circleci, as provided by the parent image
USER circleci

# Set working directory
WORKDIR documentation

# Install Ruby
RUN sudo apt-get install ruby-full

# Install Ruby dependencies
RUN sudo apt-get install zlib1g-dev
RUN sudo gem install pkg-config -v "~> 1.1"
RUN sudo chown -R circleci /var/lib/gems/ /usr/local/bin .
RUN gem install bundler --no-rdoc --no-ri
COPY --chown=circleci:circleci Gemfile ./
RUN bundle install --jobs=4

# Update Composer
#RUN composer self-update

# Install PHP dependencies
COPY --chown=circleci:circleci composer.json ./
COPY --chown=circleci:circleci composer.lock ./
RUN composer install

# Install node dependencies
COPY --chown=circleci:circleci package.json ./
RUN npm install

# Copy the working directories into the container
COPY --chown=circleci:circleci ./features /documentation/features
COPY --chown=circleci:circleci ./behat.yml ./budget.json ./Gruntfile.js ./Rakefile ./sculpin.json ./wraith.yaml /documentation/

# Copy the app directory
COPY --chown=circleci:circleci ./app /documentation/app

# Install Terminus Globally
RUN composer global require pantheon-systems/terminus

# Compile assets (CSS and Terminus Manual)
COPY --chown=circleci:circleci ./source /documentation/source
RUN node_modules/.bin/grunt
RUN ~/.composer/vendor/pantheon-systems/terminus/bin/terminus list > /documentation/source/docs/assets/terminus/commands.json --format=json
RUN curl https://api.github.com/repos/pantheon-systems/terminus/releases > /documentation/source/docs/assets/terminus/releases.json

# Generate the site in development mode (include drafts)
RUN bin/sculpin generate --env=dev

# Symlink source inside output_dev
RUN cd output_dev && ln -s ./ source

# Copy scripts into the container
COPY --chown=circleci:circleci ./scripts /documentation/scripts

# Run changelog fix script
RUN ./scripts/fix-changelog-index.sh

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Add Versioning
ADD VERSION .
