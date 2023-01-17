"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as https from 'node:https';
const http = require("node:http");
// const ROOT_LOGGING_HOST = 'addto.justlog.it';
const ROOT_LOGGING_HOST = 'localhost';
const ROOT_LOGGING_PATH = '/v1/log/';
class HttpInterface {
    static get(loggingtoken, logtype, querystring) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((success, failure) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const path = ROOT_LOGGING_PATH + loggingtoken + '/' + logtype + '?' + querystring;
                    const options = {
                        hostname: ROOT_LOGGING_HOST,
                        path: path,
                        port: 8000
                    };
                    const request = http.get(options, (res) => {
                        let response = '', status = res.statusCode;
                        res.on('data', (d) => {
                            response += d;
                        });
                        res.on('end', () => {
                            if (status === 200 || status === 204) {
                                success(null);
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
                catch (e) {
                    failure(e);
                }
            }));
        });
    }
    static post(loggingtoken, logtype, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((success, failure) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let json = (typeof data === 'string') ? data : JSON.stringify(data);
                    const path = ROOT_LOGGING_PATH + loggingtoken + '/' + logtype;
                    const options = {
                        hostname: ROOT_LOGGING_HOST,
                        path: path,
                        port: 8000,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': json.length
                        }
                    };
                    const request = http.request(options, (res) => {
                        let response = '', status = res.statusCode;
                        res.on('data', (d) => {
                            response += d;
                        });
                        res.on('end', () => {
                            if (status === 200 || status === 204) {
                                success(null);
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
                catch (e) {
                    failure(e);
                }
            }));
        });
    }
}
exports.default = HttpInterface;
;
