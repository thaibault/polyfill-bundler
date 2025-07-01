<!-- !/usr/bin/env markdown
-*- coding: utf-8 -*-
region header
Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

License
-------

This library written by Torben Sickert stand under a creative commons naming
3.0 unported license. See https://creativecommons.org/licenses/by/3.0/deed.de
endregion -->

Project status
--------------

[![npm](https://img.shields.io/npm/v/polyfill-bundler?color=%23d55e5d&label=npm%20package%20version&logoColor=%23d55e5d&style=for-the-badge)](https://www.npmjs.com/package/polyfill-bundler)
[![npm downloads](https://img.shields.io/npm/dy/polyfill-bundler.svg?style=for-the-badge)](https://www.npmjs.com/package/polyfill-bundler)

[![build](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/build.yaml?style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/build.yaml)
[![build push package](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/build-package-and-push.yaml?label=build%20push%20package&style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/build-package-and-push.yaml)

[![check types](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/check-types.yaml?label=check%20types&style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/check-types.yaml)

[![build push image](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/build-image-and-push-periodically-2.yaml?label=build%20push%20image&style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/build-image-and-push-periodically-2.yaml)

[![deploy documentation website](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/deploy-documentation-website.yaml?label=deploy%20documentation%20website&style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/deploy-documentation-website.yaml)
[![documentation website](https://img.shields.io/website-up-down-green-red/https/torben.website/polyfill-bundler.svg?label=documentation-website&style=for-the-badge)](https://torben.website/polyfill-bundler)

Use case
--------

```JavaScript
<script
    src="https://polyfill.your.domain/polyfill.js?features=AbortController%2CArray.from"
></script>
```
