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

# x86_64

# - podman pull node && podman build --file https://raw.githubusercontent.com/thaibault/on-premise-polyfill.io/master/Dockerfile --no-cache --tag ghcr.io/thaibault/on-premise-polyfill.io:latest-x86-64 .
# - podman push ghcr.io/thaibault/on-premise-polyfill.io:latest-x86-64 --creds "thaibault:$(cat "${ILU_GITHUB_BASE_CONFIGURATION_PATH}masterToken.txt")"

# - docker pull node && docker build --no-cache --tag ghcr.io/thaibault/on-premise-polyfill.io:latest-x86-64 ./
# - cat "${ILU_GITHUB_BASE_CONFIGURATION_PATH}masterToken.txt" | docker login ghcr.io --username thaibault --password-stdin && docker push ghcr.io/thaibault/on-premise-polyfill.io:latest-x86-64

# arm_64

# - docker pull arm64v8/node && docker build --build-arg BASE_IMAGE=arm64v8/node --no-cache --tag ghcr.io/thaibault/on-premise-polyfill.io:latest-arm-64 ./
# - cat "${ILU_GITHUB_BASE_CONFIGURATION_PATH}masterToken.txt" | docker login ghcr.io --username thaibault --password-stdin && docker push ghcr.io/thaibault/on-premise-polyfill.io:latest-arm-64
# endregion
# region start container commands
# Run the following command in the directory where this file lives to start:
# podman / docker run --interactive --name polyfill.io -p 0.0.0.0:8080:8080 --rm --tty ghcr.io/thaibault/on-premise-polyfill.io
# endregion
ARG         BASE_IMAGE

FROM        ${BASE_IMAGE:-'node'}

ENV         POLYFILL_PORT 8080
ENV         NODE_ENV production

LABEL       maintainer="Torben Sickert <info@torben.website>"
LABEL       Description="base" Vendor="thaibault products" Version="1.0"

RUN         mkdir --parents /application

COPY        . /application

WORKDIR     /application

# Install dev dependencies build and slice out dev dependencies afterwards.
RUN         yarn --production=false && \
            yarn unlink clientnode; \
            yarn install --force --production=false && \
            yarn build && \
            rm node_modules --force --recursive && \
            yarn --production=true

EXPOSE      $POLYFILL_PORT

CMD         yarn start
# region modline
# vim: set tabstop=4 shiftwidth=4 expandtab filetype=dockerfile:
# vim: foldmethod=marker foldmarker=region,endregion:
# endregion
