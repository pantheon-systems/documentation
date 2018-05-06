FROM circleci/php:7.1-node-browsers

WORKDIR /documentation

ADD . /documentation

RUN composer install && bundler && npm install

RUN grunt

RUN bin/sculpin generate --env=dev

EXPOSE 8000

CMD bin/sculpin server 
