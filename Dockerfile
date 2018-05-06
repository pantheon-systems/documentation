# build Ruby artifacts
FROM circleci/ruby

USER $USER

WORKDIR /build

ADD . /build


## Debug line
RUN bundler --version

RUN bundler


# Build Composer and NPM artifcts
FROM circleci/php:7.1-node-browsers

USER $USER

WORKDIR /documentation

ADD . /documentation

#COPY --from=0 /usr/local/bin /usr/local/bin


RUN composer install 


## Debug line
RUN npm install

RUN npm --version

RUN npx grunt

RUN bin/sculpin generate --env=dev

EXPOSE 8000

CMD bin/sculpin server 
