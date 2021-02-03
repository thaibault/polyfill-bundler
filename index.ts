// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module polyfill.io */
'use strict'
// region import
import Tools from 'clientnode'
import {Mapping} from 'clientnode/type'
import {
    // createServer,
    Http2Server as HttpServer,
    Http2ServerResponse as HTTPServerResponse,
    Http2ServerRequest as HTTPServerRequest
} from 'http2'
import {createServer} from 'http'
import polyfillLibrary from 'polyfill-library'
import url from 'url'
// endregion
// region types
const Flags = ['always', 'gated'] as const
type Flag = Flags[number]
const UnknownTechnologyConfigurations = ['ignore', 'polyfill'] as const
type UnknownTechnologyConfiguration = UnknownTechnologyConfigurations[number]
// endregion
const instance:HttpServer = createServer(
    async (
        request:HTTPServerRequest, response:HTTPServerResponse
    ):Promise<void> => {
        try {
            console.info('Got request url', request.url)

            if (!request.url.startsWith('/polyfill.'))
                response.statusCode = 404
            else {
                // region parse query parameter
                const queryParameter = url.parse(request.url, true).query

                const excludes:Array<string> = queryParameter.excludes ?
                    queryParameter.excludes.split(',') :
                    []
                const features:Array<string> = queryParameter.features ?
                    queryParameter.features.split(',') :
                    []
                const flags:Array<Flag> = queryParameter.flags ?
                    queryParameter.flags.split(',').filter(
                        (flagCandidate:string):boolean =>
                            Flags.includes(flagCandidate)
                    ) :
                    []
                const unknown:UnknownTechnologyConfiguration =
                    queryParameter.unknown ?
                        UnknownTechnologyConfigurations.includes(
                            polyfill.unknown
                        ) :
                        'polyfill'
                // endregion
                // region build feature options
                const featureOptions:Mapping<{flags:Array<string>}> = {}
                for (const feature of features) {
                    const configuration:[string, ...Array<Flag>] =
                        feature.split('|')
                    featureOptions[configuration[0]] = {
                        flags: configuration.length > 1 ?
                            configuration[1] :
                            flags
                    }
                }
                // endregion
                // region build configuration and log
                const configuration = {
                    excludes,
                    features: featureOptions,
                    minify: request.url.includes('.min.js?'),
                    uaString: request.headers['user-agent'],
                    unknown
                }

                console.info(
                    'Apply polyfill configuration: "' +
                    `${Tools.represent(configuration)}"`
                )
                // endregion
                // region write response
                response.statusCode = 200
                response.setHeader(
                    'Content-Type',
                    'content-type: text/javascript; charset=utf-8'
                )
                response.write(
                    await polyfillLibrary.getPolyfillString(configuration)
                )
                // endregion
            }
        } catch (error) {
            console.warn('Error occurred:', error)
            response.statusCode = 500
        } finally {
            response.end()
        }
    }
)

const port:number =
    parseInt(process.argv[2] ?? process.env.POLYFILL_PORT ?? 8080)

console.info(`Listen on port ${port} for incoming requests.`)

instance.listen(port)

process.on('SIGINT', ():void => {
    console.info('\nCaught interrupt signal: stopping server.')

    instance.close(():void => console.info('Server stopped.'))
})
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
