<!-- !/usr/bin/env markdown
-*- coding: utf-8 -*-
region header
Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

License
-------

This library written by Torben Sickert stands under a creative commons naming
3.0 unported license. See https://creativecommons.org/licenses/by/3.0/deed.de
endregion -->

<!--|deDE:Projektstatus-->
Project Status
--------------

[![npm](https://img.shields.io/npm/v/polyfill-bundler?color=%23d55e5d&label=npm%20package%20version&logoColor=%23d55e5d&style=for-the-badge)](https://www.npmjs.com/package/polyfill-bundler)
[![npm downloads](https://img.shields.io/npm/dy/polyfill-bundler.svg?style=for-the-badge)](https://www.npmjs.com/package/polyfill-bundler)

[![build](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/build.yaml?style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/build.yaml)
[![build push package](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/build-package-and-push.yaml?label=build%20push%20package&style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/build-package-and-push.yaml)

[![check types](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/check-types.yaml?label=check%20types&style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/check-types.yaml)

[![build push image](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/build-image-and-push-periodically-2.yaml?label=build%20push%20image&style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/build-image-and-push-periodically-2.yaml)

[![deploy web documentation](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/deploy-web-documentation.yaml?label=deploy%20web%20documentation&style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/deploy-web-documentation.yaml)
[![web documentation](https://img.shields.io/website-up-down-green-red/https/torben.website/polyfill-bundler.svg?label=web-documentation&style=for-the-badge)](https://torben.website/polyfill-bundler)

<!--|deDE:Verwendung-->
Use case
--------

This project is a browser-compatibility service: it generates a small
JavaScript bundle that adds only the missing features your app needs in older
browsers, so modern APIs can work without shipping unnecessary polyfills.

<div class="wd-table-of-contents">
    <h2 id="content">Content<!--deDE:Inhalt--><!--frFR:Contenu--></h2>
    <!--wd-table-of-contents-->
</div>

Installation
------------

You can install via package manager, simply download the compiled version as
zip file here and inject or request via CDN in HTML:
<!--deDE:
    Sie können das Paket über den Paketmanager installieren oder einfach die
    kompilierte Version als ZIP-Datei hier herunterladen und in HTML einbinden
    oder über ein CDN abrufen:
-->
<!--frFR:
    Vous pouvez installer le paquet via le gestionnaire de paquets ou
    simplement télécharger ici la version compilée sous forme de fichier ZIP,
    puis l'intégrer dans une page HTML ou la récupérer via un CDN:
-->

```bash
npm install polyfill-bundler
```

<!--|deDE:Beispiel-->
<!--|frFR:Exemple-->
Example
-------

```HTML
<script
    src="https://polyfill.your.domain/polyfill.js?features=AbortController%2CArray.from"
></script>
```
