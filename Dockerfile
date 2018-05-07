# build Ruby artifacts
FROM circleci/ruby

USER $USER

WORKDIR /build

ADD . /build

RUN bundler

# Build Composer and NPM artifcts
FROM circleci/php:7.1-node-browsers

USER $USER

WORKDIR /documentation

ADD . /documentation

RUN composer install 

RUN npm install

RUN grunt

RUN bin/sculpin generate --env=dev

EXPOSE 8000

CMD bin/sculpin server 
