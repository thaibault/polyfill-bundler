// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module index */
'use strict'
// region import
import Tools, {CloseEventNames} from 'clientnode'
import {Mapping} from 'clientnode/type'
import {
    createServer as createHttp2Server,
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
type Flag = typeof Flags[number]
const UnknownTechnologyConfigurations = ['ignore', 'polyfill'] as const
type UnknownTechnologyConfiguration =
    typeof UnknownTechnologyConfigurations[number]
// endregion
const instance:HttpServer = (
    createServer as unknown as typeof createHttp2Server
)(
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

                let excludes:Array<string> = []
                for (const parameter of ([] as Array<string>).concat(
                    queryParameter.excludes || []
                ))
                    excludes = excludes.concat(parameter.split(','))

                let features:Array<string> = []
                for (const parameter of ([] as Array<string>).concat(
                    queryParameter.features || []
                ))
                    features = features.concat(parameter.split(','))

                let flags:Array<Flag> = []
                for (const parameter of ([] as Array<string>).concat(
                    queryParameter.flags || []
                ))
                    flags = flags.concat(
                        parameter
                            .split(',')
                            .filter((flagCandidate:string):boolean =>
                                Flags.includes(flagCandidate as Flag)
                            ) as Array<Flag>
                    )

                const givenUnknown:Array<string> =
                    ([] as Array<string>).concat(queryParameter.unknown || [])
                const unknown:UnknownTechnologyConfiguration =
                    givenUnknown.length &&
                    UnknownTechnologyConfigurations.includes(
                        givenUnknown[0] as UnknownTechnologyConfiguration
                    ) ?
                        givenUnknown[0] as UnknownTechnologyConfiguration :
                        'polyfill'
                // endregion
                // region build feature options
                const featureOptions:Mapping<{flags:Array<Flag>}> = {}
                for (const feature of features) {
                    const configuration:[string, ...Array<Flag>] =
                        feature.split('|') as [string, ...Array<Flag>]

                    featureOptions[configuration[0]] = {
                        flags: configuration.length > 1 ?
                            configuration[1] as unknown as Array<Flag> :
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
                    'Content-Type', 'text/javascript; charset=utf-8'
                )
                response.write(
                    await polyfillLibrary.getPolyfillString(configuration) as
                        string
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

for (const name of CloseEventNames)
    process.on(name, ():void => {
        console.info(`\nGot "${name}" signal: stopping server.`)

        instance.close(():void => console.info('Server stopped.'))
    })
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
