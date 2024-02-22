
import * as https from 'node:https';

const ROOT_LOGGING_HOST = 'addto.justlog.it';
const ROOT_LOGGING_PATH = '/v1/log/';

export default class HttpInterface {

    static async get(loggingtoken:string, logtype: string, querystring: string) {
        const path = ROOT_LOGGING_PATH + loggingtoken + '/' + logtype + '?' + querystring;
        const options = {
            hostname: ROOT_LOGGING_HOST,
            path: path,
            port: 443
        };

        const request = https.get(options, (res) => {
            let response = '',
                status = res.statusCode;

            res.on('data', (d) => {
                response += d;
            });

            res.on('end', () => {
                if (status === 200 || status === 204) {
                    return;
                }
                else {
                    // call failed
                    throw 'Logging call failed';
                }
            });
        });

        request.on('error', (err) => {
            throw err;
        });
    }

    static async post(loggingtoken: string, logtype: string, data: object | string) {
        const json = (typeof data === 'string') ? data : JSON.stringify(data);
        const path = ROOT_LOGGING_PATH + loggingtoken + '/' + logtype;
        
        const options = {
            hostname: ROOT_LOGGING_HOST,
            path: path,
            port: 443,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length' : json.length
            }
        };
        
        const request = https.request(options, (res) => {
            let response = '',
                status = res.statusCode;

            res.on('data', (d) => {
                response += d;
            });

            res.on('end', () => {
                if (status === 200 || status === 204) {
                    return;
                }
                else {
                    // call failed
                    throw 'Logging call failed';
                }
            });
        });

        request.on('error', (err) => {
            // failure(err);
            throw err;
        });

        request.write(json);
        request.end();
    }
};
