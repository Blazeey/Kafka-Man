FROM ruby:2.6.3-alpine AS build-env
ARG RAILS_ROOT=/backend
ARG BUILD_PACKAGES="build-base curl-dev git snappy"
ARG DEV_PACKAGES="postgresql-dev yaml-dev zlib-dev nodejs yarn build-base libexecinfo automake autoconf libtool"
ARG RUBY_PACKAGES="tzdata"
ENV BUNDLE_APP_CONFIG="$RAILS_ROOT/.bundle"
WORKDIR $RAILS_ROOT
# install packages
RUN apk update \
    && apk upgrade \
    && apk add --update --no-cache $BUILD_PACKAGES $DEV_PACKAGES \
       $RUBY_PACKAGES 

RUN gem install bundler -v 2.1.4

COPY Gemfile* package.json ./
RUN bundle install --path=vendor/bundle \
# Remove unneeded files (cached *.gem, *.o, *.c)
    && rm -rf vendor/bundle/ruby/2.6.0/cache/*.gem \
    && find vendor/bundle/ruby/2.6.0/gems/ -name "*.c" -delete \
    && find vendor/bundle/ruby/2.6.0/gems/ -name "*.o" -delete

RUN yarn install
COPY . .
RUN bin/rails assets:precompile

# Remove folders not needed in resulting image
RUN rm -rf node_modules tmp/cache app/assets vendor/assets spec

FROM ruby:2.6.3-alpine

ARG RAILS_ROOT=/backend
ARG PACKAGES="tzdata postgresql-client nodejs bash"
ARG POSTGRES_HOST=localhost
ARG POSTGRES_PORT=5432
ARG POSTGRES_USERNAME=postgres
ARG POSTGRES_PASSWORD

ENV POSTGRES_HOST=${POSTGRES_HOST}
ENV POSTGRES_PORT=${POSTGRES_PORT}
ENV POSTGRES_USERNAME=${POSTGRES_USERNAME}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

ENV BUNDLE_APP_CONFIG="$RAILS_ROOT/.bundle"

WORKDIR $RAILS_ROOT

# install packages
RUN apk update \
    && apk upgrade \
    && apk add --update --no-cache $PACKAGES

RUN gem install bundler -v 2.1.4

COPY --from=build-env $RAILS_ROOT $RAILS_ROOT
EXPOSE 3000

COPY entrypoint.sh $RAILS_ROOT
RUN chmod +x $RAILS_ROOT/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

