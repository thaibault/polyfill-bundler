import type { Http2ServerResponse as HTTPServerResponse, Http2ServerRequest as HTTPServerRequest } from 'http2';
export declare const requestHandler: (request: HTTPServerRequest, response: HTTPServerResponse) => Promise<void>;
