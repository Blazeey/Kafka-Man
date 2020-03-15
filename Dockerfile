FROM ruby:2.6.3-alpine AS build-env
ARG RAILS_ROOT=/backend
ARG BUILD_PACKAGES="build-base curl-dev git snappy sqlite sqlite-dev"
ARG DEV_PACKAGES="yaml-dev zlib-dev nodejs yarn build-base libexecinfo automake autoconf libtool"
ARG RUBY_PACKAGES="tzdata"
ENV BUNDLE_APP_CONFIG="$RAILS_ROOT/.bundle"
WORKDIR $RAILS_ROOT
# install packages
RUN apk update \
    && apk upgrade \
    && apk add --update --no-cache $BUILD_PACKAGES $DEV_PACKAGES \
       $RUBY_PACKAGES 

RUN gem install bundler -v 2.1.4

COPY backend/Gemfile* backend/package.json ./
RUN bundle install --path=vendor/bundle \
# Remove unneeded files (cached *.gem, *.o, *.c)
    && rm -rf vendor/bundle/ruby/2.6.0/cache/*.gem \
    && find vendor/bundle/ruby/2.6.0/gems/ -name "*.c" -delete \
    && find vendor/bundle/ruby/2.6.0/gems/ -name "*.o" -delete

# RUN yarn install
COPY backend/ .
RUN bin/rails assets:precompile

# Remove folders not needed in resulting image
RUN rm -rf node_modules tmp/cache app/assets vendor/assets spec

# Building angular
FROM node:12.6-alpine AS angular-build

RUN apk add --no-cache \
    build-base \
    python

ARG ANGULAR_ROOT=/frontend

WORKDIR $ANGULAR_ROOT
COPY frontend/package.json .
COPY frontend/package-lock.json .
RUN npm clean-install
COPY frontend/ .

RUN npm run build

# Main image
FROM ruby:2.6.3-alpine

LABEL maintainer="rey6venkatesh@gmail.com"
LABEL name="blazeey"

ARG RAILS_ROOT=/backend
ARG ANGULAR_ROOT=/frontend

ARG PACKAGES="tzdata nodejs bash sqlite sqlite-dev nginx supervisor"

ENV BUNDLE_APP_CONFIG="$RAILS_ROOT/.bundle"

WORKDIR $RAILS_ROOT

# install packages
RUN apk update \
    && apk upgrade \
    && apk add --update --no-cache $PACKAGES \
    && rm -rf /var/cache/apk/*
RUN gem install bundler -v 2.1.4

COPY --from=build-env $RAILS_ROOT $RAILS_ROOT
EXPOSE 3000

RUN mkdir -p /tmp/nginx/client-body
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=angular-build $ANGULAR_ROOT/dist/kafka-man /usr/share/nginx/html

RUN bundle exec rake db:drop db:create db:migrate

# supervisor base configuration
COPY supervisord.conf /etc/supervisord.conf
CMD ["supervisord", "-c", "/etc/supervisord.conf"]