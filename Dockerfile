# syntax=docker/dockerfile-upstream:master-labs
# region header
# [Project page](https://torben.website/polyfill-bundler)

# Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

# License
# -------

# This library written by Torben Sickert stand under a creative commons naming
# 3.0 unported license.
# See https://creativecommons.org/licenses/by/3.0/deed.de

# Basic ArchLinux with user-mapping, AUR integration and support for decryption
# of security related files.
# endregion
# region create commands
# Run the following command in the directory where this file lives to build a
# new docker image:

# - docker pull node:current-alpine && docker buildx build --no-cache --tag ghcr.io/thaibault/polyfill-bundler:latest .
# endregion
# region start container commands
# Run the following command in the directory where this file lives to start:
# podman / docker run --interactive --name polyfill-bundler --publish 0.0.0.0:8080:8080 --rm --tty --volume "$(pwd):/application" ghcr.io/thaibault/polyfill-bundler:latest
# endregion
ARG        BASE_IMAGE

FROM       ${BASE_IMAGE:-'node:current-alpine'} AS base

LABEL      maintainer="Torben Sickert <info@torben.website>"
LABEL      Description="base" Vendor="thaibault products" Version="1.0"

ENV        APPLICATION_PATH /application/
ENV        PORT 8080
ENV        NODE_ENV production

RUN        mkdir --parents "$APPLICATION_PATH"

WORKDIR    "$APPLICATION_PATH"

FROM       base AS build

COPY       --link . "$APPLICATION_PATH"

           # Install dev dependencies build and slice out dev dependencies
           # afterwards.
           # NOTE: Use busybox compatible commands (shortoptions).
RUN        corepack enable && \
           yarn unlink clientnode; \
           yarn install && \
           yarn build && \
           yarn workspaces focus --production && \
           rm -f -r /tmp/*

FROM       base AS runtime

COPY       --from=build \
           --link \
               "${APPLICATION_PATH}index.js" \
               "${APPLICATION_PATH}index.js"
COPY       --from=build \
           --link \
               "${APPLICATION_PATH}node_modules" \
               "${APPLICATION_PATH}node_modules"
COPY       --from=build \
           --link \
               "${APPLICATION_PATH}package.json" \
               "${APPLICATION_PATH}package.json"

EXPOSE     $PORT

CMD        yarn start

#ENTRYPOINT ...
# region modline
# vim: set tabstop=4 shiftwidth=4 expandtab filetype=dockerfile:
# vim: foldmethod=marker foldmarker=region,endregion:
# endregion
