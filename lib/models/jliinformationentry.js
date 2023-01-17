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
const httpinterface_1 = require("./httpinterface");
const COMMON_PROPS = ['method', 'details', 'user', 'statevalues'];
class JLIInformationEntry {
    constructor() {
        this.method = '';
        this.details = '';
        this.user = null;
        this.statevalues = null;
    }
    isvalid() {
        if (!this.method)
            return false;
        if (!this.details)
            return false;
        return true;
    }
    addstatevalues(statevalues) {
        if (!this.statevalues)
            this.statevalues = new Map();
        for (let i = 0; i < statevalues.length; i++) {
            let key = statevalues[i].key;
            let value = statevalues[i].value;
            if (!this.statevalues.has(key) && COMMON_PROPS.indexOf(key) === -1) {
                this.statevalues.set(key, value);
            }
        }
    }
    getquerystring() {
        const queryitems = [];
        queryitems.push('m=' + encodeURIComponent(this.method));
        queryitems.push('d=' + encodeURIComponent(this.details));
        if (this.user) {
            queryitems.push('u=' + encodeURIComponent(this.user));
        }
        if (this.statevalues) {
            for (let key of this.statevalues.keys()) {
                queryitems.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.statevalues.get(key)));
            }
        }
        return queryitems.join('&');
    }
    log(loggingtoken) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = this;
            return new Promise((success, failure) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // format the query string
                    const querystring = me.getquerystring();
                    yield httpinterface_1.default.get(loggingtoken, 'info', querystring);
                    success(null);
                }
                catch (e) {
                    failure(e);
                }
            }));
        });
    }
}
exports.default = JLIInformationEntry;
