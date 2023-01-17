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
const COMMON_PROPS = ['message', 'stack', 'user', 'extravalues', 'statevalues'];
class JLIError {
    constructor() {
        this.message = '';
        this.stack = '';
        this.user = null;
        this.extravalues = new Map();
        this.statevalues = new Map();
    }
    isvalid() {
        if (!this.message)
            return false;
        return true;
    }
    setvalue(key, value) {
        if (COMMON_PROPS.indexOf(key) === -1) {
            if (!this.statevalues.has(key) && !this.extravalues.has(key)) {
                this.extravalues.set(key, value);
            }
        }
    }
    addstatevalues(statevalues) {
        for (let i = 0; i < statevalues.length; i++) {
            let key = statevalues[i].key;
            let value = statevalues[i].value;
            if (!this.statevalues.has(key) && !this.extravalues.has(key) && COMMON_PROPS.indexOf(key) === -1) {
                this.statevalues.set(key, value);
            }
        }
    }
    log(loggingtoken) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = this;
            return new Promise((success, failure) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const logobject = {};
                    logobject.message = me.message;
                    logobject.stack = me.stack;
                    logobject.user = me.user;
                    if (me.extravalues) {
                        for (let key of me.extravalues.keys()) {
                            logobject[key] = me.extravalues.get(key);
                        }
                    }
                    if (me.statevalues) {
                        for (let key of me.statevalues.keys()) {
                            logobject[key] = me.statevalues.get(key);
                        }
                    }
                    yield httpinterface_1.default.post(loggingtoken, 'error', logobject);
                    success(null);
                }
                catch (e) {
                    failure(e);
                }
            }));
        });
    }
}
exports.default = JLIError;
;
