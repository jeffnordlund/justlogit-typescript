export default class HttpInterface {
    static get(loggingtoken: string, logtype: string, querystring: string): Promise<unknown>;
    static post(loggingtoken: string, logtype: string, data: object | string): Promise<unknown>;
}
