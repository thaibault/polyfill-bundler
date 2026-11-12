<!-- !/usr/bin/env markdown
-*- coding: utf-8 -*-
region header
Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

License
-------

This library written by Torben Sickert stands under a creative commons naming
3.0 unported license. See https://creativecommons.org/licenses/by/3.0/deed.de
endregion -->

<!--|deDE:Projektstatus-->
<!--|frFR:Statut du projet-->
Project Status
--------------

[![npm](https://img.shields.io/npm/v/polyfill-bundler?color=%23d55e5d&label=npm%20package%20version&logoColor=%23d55e5d&style=for-the-badge)](https://www.npmjs.com/package/polyfill-bundler)
[![npm downloads](https://img.shields.io/npm/dy/polyfill-bundler.svg?style=for-the-badge)](https://www.npmjs.com/package/polyfill-bundler)

[![build](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/build.yaml?style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/build.yaml)
[![build push package](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/build-package-and-push.yaml?label=build%20push%20package&style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/build-package-and-push.yaml)

[![check types](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/check-types.yaml?label=check%20types&style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/check-types.yaml)

[![build push image](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/build-image-and-push-periodically-2.yaml?label=build%20push%20image&style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/build-image-and-push-periodically-2.yaml)

[![deploy web documentation](https://img.shields.io/github/actions/workflow/status/thaibault/polyfill-bundler/deploy-web-documentation.yaml?label=deploy%20web%20documentation&style=for-the-badge)](https://github.com/thaibault/polyfill-bundler/actions/workflows/deploy-web-documentation.yaml)
[![web documentation](https://img.shields.io/website-up-down-green-red/https/tsickert.com/polyfill-bundler.svg?label=web-documentation&style=for-the-badge)](https://tsickert.com/polyfill-bundler)


<!--|deDE:Einsatzmöglichkeiten-->
<!--|frFR:Cas d'utilisation-->
Use case
--------

A self-hosted polyfill service. Your website requests one script and names the
modern browser features it relies on. The service looks at the visitor's
browser and answers with a bundle containing only the polyfills this browser
actually needs. Modern browsers get an almost empty file, older ones get what
is missing. The polyfills come from
[polyfill-library](https://www.npmjs.com/package/polyfill-library), the
collection behind the former public polyfill.io service, so you can run the
same thing on your own infrastructure.
<!--deDE:
    Ein selbst gehosteter Polyfill-Dienst. Ihre Website lädt ein einziges
    Skript und nennt die modernen Browserfunktionen, auf die sie angewiesen
    ist. Der Dienst prüft den Browser des Besuchers und antwortet mit einem
    Bündel, das nur die Polyfills enthält, die dieser Browser tatsächlich
    braucht. Moderne Browser erhalten eine nahezu leere Datei, ältere das, was
    ihnen fehlt. Die Polyfills stammen aus
    [polyfill-library](https://www.npmjs.com/package/polyfill-library), der
    Sammlung hinter dem früheren öffentlichen Dienst polyfill.io, sodass Sie
    dasselbe auf Ihrer eigenen Infrastruktur betreiben können.
-->
<!--frFR:
    Un service de polyfills auto-hébergé. Votre site web charge un seul
    script et indique les fonctionnalités modernes du navigateur dont il a
    besoin. Le service examine le navigateur du visiteur et répond avec un
    paquet contenant uniquement les polyfills dont ce navigateur a réellement
    besoin. Les navigateurs modernes reçoivent un fichier presque vide, les
    plus anciens ce qui leur manque. Les polyfills proviennent de
    [polyfill-library](https://www.npmjs.com/package/polyfill-library), la
    collection utilisée par l'ancien service public polyfill.io, ce qui vous
    permet d'exécuter la même chose sur votre propre infrastructure.
-->

Features included:
<!--deDE:Enthaltene Funktionen:-->
<!--frFR:Fonctionnalités incluses:-->

- Bundles tailored to each browser based on its user agent.<!--deDE:Auf jeden Browser zugeschnittene Bündel anhand seines User-Agents.--><!--frFR:Paquets adaptés à chaque navigateur en fonction de son agent utilisateur.-->
- Plain or minified output.<!--deDE:Normale oder minimierte Ausgabe.--><!--frFR:Sortie normale ou minifiée.-->
- Feature selection, exclusions and flags via query parameters.<!--deDE:Auswahl von Funktionen, Ausschlüsse und Flags über Query-Parameter.--><!--frFR:Sélection des fonctionnalités, exclusions et options via les paramètres de requête.-->
- Ready to use container image and systemd unit.<!--deDE:Sofort einsetzbares Container-Image und systemd-Unit.--><!--frFR:Image de conteneur et unité systemd prêtes à l'emploi.-->

<div class="wd-table-of-contents">
    <h2 id="content">Content<!--deDE:Inhalt--><!--frFR:Contenu--></h2>
    <!--wd-table-of-contents-->
</div>

<!--|deDE:Dienst starten-->
<!--|frFR:Démarrer le service-->
Running the service
-------------------

The service listens on port "8080" by default. Choose another port via the
environment variable "PORT" or as first command line argument.
<!--deDE:
    Der Dienst lauscht standardmäßig auf Port "8080". Einen anderen Port
    wählen Sie über die Umgebungsvariable "PORT" oder als erstes
    Kommandozeilenargument.
-->
<!--frFR:
    Le service écoute par défaut sur le port "8080". Choisissez un autre port
    via la variable d'environnement "PORT" ou comme premier argument de ligne
    de commande.
-->

<!--|deDE:Mit Docker-->
<!--|frFR:Avec Docker-->
### With Docker

A container image is built regularly and published on the GitHub container
registry:
<!--deDE:
    Ein Container-Image wird regelmäßig gebaut und in der GitHub Container
    Registry veröffentlicht:
-->
<!--frFR:
    Une image de conteneur est construite régulièrement et publiée sur le
    registre de conteneurs GitHub:
-->

```bash
docker run --publish 8080:8080 --rm ghcr.io/thaibault/polyfill-bundler:latest
```

For a permanent setup the repository contains "systemd.service". It starts
the container in a Docker network named "proxy", so a reverse proxy in the
same network can forward requests to it. Copy it to
"/etc/systemd/system/polyfill-bundler.service" and enable it:
<!--deDE:
    Für einen dauerhaften Betrieb enthält das Repository "systemd.service".
    Es startet den Container in einem Docker-Netzwerk namens "proxy", sodass
    ein Reverse-Proxy im selben Netzwerk Anfragen an ihn weiterleiten kann.
    Kopieren Sie die Datei nach
    "/etc/systemd/system/polyfill-bundler.service" und aktivieren Sie sie:
-->
<!--frFR:
    Pour une installation permanente, le dépôt contient "systemd.service". Il
    démarre le conteneur dans un réseau Docker nommé "proxy", afin qu'un proxy
    inverse dans le même réseau puisse lui transmettre les requêtes. Copiez-le
    vers "/etc/systemd/system/polyfill-bundler.service" et activez-le:
-->

```bash
systemctl enable --now polyfill-bundler
```

<!--|deDE:Mit Node.js-->
<!--|frFR:Avec Node.js-->
### With Node.js

```bash
npm install --global polyfill-bundler
polyfill-bundler 8080
```

<!--|deDE:Verwendung-->
<!--|frFR:Utilisation-->
Usage
-----

Include the script before your own scripts and list the needed features:
<!--deDE:
    Binden Sie das Skript vor Ihren eigenen Skripten ein und listen Sie die
    benötigten Funktionen auf:
-->
<!--frFR:
    Intégrez le script avant vos propres scripts et listez les
    fonctionnalités nécessaires:
-->

```HTML
<script
    src="https://polyfill.your.domain/polyfill.min.js?features=AbortController,Array.from,fetch"
></script>
```

Request "/polyfill.js" for readable or "/polyfill.min.js" for minified
output. All other paths answer with status "404". The following query
parameters are supported, lists are separated by commas:
<!--deDE:
    Fragen Sie "/polyfill.js" für lesbare oder "/polyfill.min.js" für
    minimierte Ausgabe an. Alle anderen Pfade antworten mit Status "404".
    Folgende Query-Parameter werden unterstützt, Listen werden durch Kommas
    getrennt:
-->
<!--frFR:
    Demandez "/polyfill.js" pour une sortie lisible ou "/polyfill.min.js"
    pour une sortie minifiée. Tous les autres chemins répondent avec le
    statut "404". Les paramètres de requête suivants sont pris en charge, les
    listes étant séparées par des virgules:
-->

- "features": Features to polyfill, e.g. "Promise" or "IntersectionObserver",
  or aliases for groups like "es2015" or "default". See the
  [list of polyfills](https://github.com/mrhenry/polyfill-library/tree/main/polyfills)
  for available names.<!--deDE:"features": Zu ergänzende Funktionen, z. B. "Promise" oder "IntersectionObserver", oder Aliase für Gruppen wie "es2015" oder "default". Verfügbare Namen finden Sie in der [Liste der Polyfills](https://github.com/mrhenry/polyfill-library/tree/main/polyfills).--><!--frFR:"features": Fonctionnalités à compléter, par exemple "Promise" ou "IntersectionObserver", ou des alias de groupes comme "es2015" ou "default". Les noms disponibles figurent dans la [liste des polyfills](https://github.com/mrhenry/polyfill-library/tree/main/polyfills).-->
- "excludes": Features to leave out, e.g. because you ship them yourself.<!--deDE:"excludes": Auszulassende Funktionen, z. B. weil Sie sie selbst mitliefern.--><!--frFR:"excludes": Fonctionnalités à omettre, par exemple parce que vous les fournissez vous-même.-->
- "flags": "always" includes polyfills regardless of the browser, "gated"
  wraps each polyfill in a check so it only runs if the feature is missing.<!--deDE:"flags": "always" liefert Polyfills unabhängig vom Browser aus, "gated" umschließt jedes Polyfill mit einer Prüfung, sodass es nur läuft, wenn die Funktion fehlt.--><!--frFR:"flags": "always" inclut les polyfills quel que soit le navigateur, "gated" entoure chaque polyfill d'une vérification afin qu'il ne s'exécute que si la fonctionnalité manque.-->
- "features" entries can carry own flags separated by "|", e.g.
  "fetch|always|gated". They replace the global "flags" for this feature.<!--deDE:Einträge in "features" können eigene, durch "|" getrennte Flags tragen, z. B. "fetch|always|gated". Sie ersetzen für diese Funktion die globalen "flags".--><!--frFR:Les entrées de "features" peuvent porter leurs propres options séparées par "|", par exemple "fetch|always|gated". Elles remplacent les "flags" globaux pour cette fonctionnalité.-->
- "unknown": What to do for browsers the library does not know. "polyfill"
  (default) sends all requested polyfills, "ignore" sends none.<!--deDE:"unknown": Verhalten bei Browsern, die die Bibliothek nicht kennt. "polyfill" (Standard) sendet alle angeforderten Polyfills, "ignore" keine.--><!--frFR:"unknown": Comportement pour les navigateurs inconnus de la bibliothèque. "polyfill" (par défaut) envoie tous les polyfills demandés, "ignore" n'en envoie aucun.-->

The response depends on the "User-Agent" header. If you put a cache or CDN in
front of the service, make sure it caches per user agent.
<!--deDE:
    Die Antwort hängt vom "User-Agent"-Header ab. Wenn Sie einen Cache oder
    ein CDN vor den Dienst schalten, stellen Sie sicher, dass pro User-Agent
    zwischengespeichert wird.
-->
<!--frFR:
    La réponse dépend de l'en-tête "User-Agent". Si vous placez un cache ou
    un CDN devant le service, assurez-vous qu'il met en cache par agent
    utilisateur.
-->

<!--|deDE:Entwicklung-->
<!--|frFR:Développement-->
Development
-----------

```bash
yarn install
yarn build
yarn start
```

Build a container image locally:
<!--deDE:Ein Container-Image lokal bauen:-->
<!--frFR:Construire une image de conteneur localement:-->

```bash
docker buildx build --tag ghcr.io/thaibault/polyfill-bundler:latest .
```
