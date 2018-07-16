# Use a Pre-Built CircleCI Docker Image known to work with Composer
FROM circleci/php:7.1-node-browsers


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
RUN composer install

# Install node dependencies
COPY --chown=circleci:circleci package.json ./
RUN npm install

# Copy the working directories into the container
COPY --chown=circleci:circleci ./bin /documentation/bin
COPY --chown=circleci:circleci ./scripts /documentation/scripts
COPY --chown=circleci:circleci ./features /documentation/features
COPY --chown=circleci:circleci ./app.sh ./behat.yml ./budget.json ./Gruntfile.js ./Rakefile ./sculpin.json ./watch.php ./wraith.yaml /documentation/

# Copy the app directory
COPY --chown=circleci:circleci ./app /documentation/app

# Compile assets (CSS and Terminus Manual)
COPY --chown=circleci:circleci ./source /documentation/source
RUN node_modules/.bin/grunt

RUN vendor/pantheon-systems/terminus/bin/terminus list > /documentation/source/docs/assets/terminus/commands.json --format=json

RUN curl https://api.github.com/repos/pantheon-systems/terminus/releases > /documentation/source/docs/assets/terminus/releases.json

# Generate the site in development mode (include drafts)
RUN bin/sculpin generate --env=dev \
&& cd output_dev && ln -s ./ source && cd ..\
&& bash -c "scripts/fix-changelog-index.sh"

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Serve the site
COPY --chown=circleci:circleci ./watch.php /documentation

# Copy anything not yet copied
COPY --chown=circleci:circleci . /documentation/

CMD /documentation/app.sh
