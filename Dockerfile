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
# Run the following command in the directory where this file lives to build a
# new docker image:
# - podman pull node && podman build --file Dockerfile --no-cache --tag docker.pkg.github.com/thaibault/on-premise-polyfill.io/base .
# - docker pull node && docker build --no-cache --tag tsickert/on-premise-polyfill.io:latest ./
# - podman push docker.pkg.github.com/thaibault/on-premise-polyfill.io/base:latest --creds "thaibault:$(cat "${ILU_CONFIGURATION_PATH}web/github/masterToken.txt")"
# - docker push tsickert/on-premise-polyfill.io
# endregion
# region start container commands
# Run the following command in the directory where this file lives to start:
# docker/podman run tsickert/on-premise-polyfill.io
# endregion
FROM        node
LABEL       maintainer="Torben Sickert <info@torben.website>"
LABEL       Description="base" Vendor="thaibault products" Version="1.0"
RUN         mkdir --parents /application
COPY        . /application
WORKDIR     /application
RUN         npm run build
EXPOSE      8080
CMD         npm run start
# region modline
# vim: set tabstop=4 shiftwidth=4 expandtab filetype=dockerfile:
# vim: foldmethod=marker foldmarker=region,endregion:
# endregion
