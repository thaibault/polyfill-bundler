# region header
# [Project page](https://torben.website/on-premise-polyfill.io)

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

# - docker pull arm64v8/node && docker build --no-cache --tag ghcr.io/thaibault/on-premise-polyfill.io:latest ./
# - cat "${ILU_GITHUB_BASE_CONFIGURATION_PATH}mainToken.txt" | docker login ghcr.io --username thaibault --password-stdin && docker push ghcr.io/thaibault/on-premise-polyfill.io:latest

# endregion
# region start container commands
# Run the following command in the directory where this file lives to start:
# podman / docker run --interactive --name polyfill.io -p 0.0.0.0:8080:8080 --rm --tty ghcr.io/thaibault/on-premise-polyfill.io:latest
# endregion
ARG         BASE_IMAGE

FROM        ${BASE_IMAGE:-'node'} as base

ENV         APPLICATION_PATH /application/
ENV         POLYFILL_PORT 8080
ENV         NODE_ENV production

LABEL       maintainer="Torben Sickert <info@torben.website>"
LABEL       Description="base" Vendor="thaibault products" Version="1.0"

RUN         mkdir --parents "$APPLICATION_PATH"

WORKDIR     "$APPLICATION_PATH"

FROM        base as build

COPY        . "$APPLICATION_PATH"

# Install dev dependencies build and slice out dev dependencies afterwards.
RUN         yarn --production=false && \
            yarn unlink clientnode; \
            yarn install --force --production=false && \
            yarn build && \
            rm node_modules --force --recursive && \
            yarn --production=true && \
            rm --force --recursive /tmp/*

FROM        base as runtime

ADD         --from=build "${APPLICATION_PATH}index.js"
ADD         --from=build "${APPLICATION_PATH}node_modules"
ADD         --from=build "${APPLICATION_PATH}package.json"

EXPOSE      $POLYFILL_PORT

CMD         yarn start
# region modline
# vim: set tabstop=4 shiftwidth=4 expandtab filetype=dockerfile:
# vim: foldmethod=marker foldmarker=region,endregion:
# endregion
