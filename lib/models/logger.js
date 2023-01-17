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
exports.Logger = void 0;
const jlierror_1 = require("./jlierror");
const jliappaction_1 = require("./jliappaction");
const jlievententry_1 = require("./jlievententry");
const jliinformationentry_1 = require("./jliinformationentry");
const jliperformanceentry_1 = require("./jliperformanceentry");
const appactionlist_1 = require("./appactionlist");
class Logger {
    constructor(token) {
        this.token = token;
        if (!this.token) {
            console.log('No token was provided for the justlogit logger.  Logging will not function.');
        }
        this.appactionlist = new appactionlist_1.default(this.token, 60);
    }
    logError(errorobject, user, statevalues) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = this;
            return new Promise((success, failure) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const token = me.token;
                    if (token) {
                        const erroritem = new jlierror_1.default();
                        erroritem.message = (errorobject.hasOwnProperty('message')) ? errorobject.message : null;
                        erroritem.stack = (errorobject.hasOwnProperty('stack')) ? errorobject.stack : null;
                        erroritem.user = (typeof user !== 'undefined' && user) ? user : null;
                        if (typeof statevalues !== 'undefined' && statevalues) {
                            erroritem.addstatevalues(statevalues);
                        }
                        // capture any other error values
                        for (let key in errorobject) {
                            erroritem.setvalue(key, errorobject[key]);
                        }
                        erroritem.log(token);
                    }
                    success(null);
                }
                catch (e) {
                    failure(e);
                }
            }));
        });
    }
    logPerformance(method, timing, user, details, statevalues) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = this;
            return new Promise((success, failure) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const token = me.token;
                    if (token) {
                        const perfitem = new jliperformanceentry_1.default();
                        perfitem.method = method;
                        perfitem.timing = (typeof timing === 'number') ? timing : parseInt(timing, 10);
                        perfitem.user = (typeof user !== 'undefined') ? user : null;
                        perfitem.details = (typeof details !== 'undefined' && details) ? details : null;
                        if (typeof statevalues !== 'undefined' && statevalues) {
                            perfitem.addstatevalues(statevalues);
                        }
                        perfitem.log(token);
                    }
                    success(null);
                }
                catch (e) {
                    failure(e);
                }
            }));
        });
    }
    logEvent(name, description, user, statevalues) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = this;
            return new Promise((success, failure) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const token = me.token;
                    if (token) {
                        const eventitem = new jlievententry_1.default();
                        eventitem.name = name;
                        eventitem.description = description;
                        eventitem.user = (typeof user !== 'undefined' && user) ? user : null;
                        if (typeof statevalues !== 'undefined' && statevalues) {
                            eventitem.addstatevalues(statevalues);
                        }
                        eventitem.log(token);
                    }
                    success(null);
                }
                catch (e) {
                    failure(e);
                }
            }));
        });
    }
    logInformation(method, details, user, statevalues) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = this;
            return new Promise((success, failure) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const token = me.token;
                    if (token) {
                        const infoitem = new jliinformationentry_1.default();
                        infoitem.method = method;
                        infoitem.details = details;
                        infoitem.user = (typeof user !== 'undefined' && user) ? user : null;
                        if (typeof statevalues !== 'undefined' && statevalues) {
                            infoitem.addstatevalues(statevalues);
                        }
                        infoitem.log(token);
                    }
                    success(null);
                }
                catch (e) {
                    failure(e);
                }
            }));
        });
    }
    logAppAction(name, pid, timing) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = this;
            return new Promise((success, failure) => __awaiter(this, void 0, void 0, function* () {
                if (me.token) {
                    const appactionitem = new jliappaction_1.default(name, timing, pid);
                    me.appactionlist.addaction(appactionitem);
                }
                success(null);
            }));
        });
    }
    setAppActionLogInterval(seconds) {
        this.appactionlist.setlogginginterval(seconds);
    }
}
exports.default = Logger;
exports.Logger = Logger;
;
