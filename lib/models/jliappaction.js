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
class JLIAppAction {
    constructor(name, timing, processid) {
        this.name = name;
        this.processid = (typeof processid !== 'undefined' && processid) ? processid : null;
        this.timing = (typeof timing === 'number') ? timing : parseInt(timing, 10);
        if (isNaN(this.timing))
            throw 'Invalid timing value';
        this.count = 1;
        this.mintiming = this.timing;
        this.maxtiming = this.timing;
        this.logstart = new Date();
    }
    isvalid() {
        if (!this.name)
            return false;
        if (!this.timing)
            return false;
        return true;
    }
    log(loggingtoken, logginginterval) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = this;
            return new Promise((success, failure) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const actioninstance = {};
                    actioninstance.name = me.name;
                    actioninstance.count = me.count;
                    actioninstance.timestamp = me.logstart.getTime();
                    actioninstance.interval = logginginterval;
                    actioninstance.processid = me.processid;
                    actioninstance.mintiming = me.mintiming;
                    actioninstance.maxtiming = me.maxtiming;
                    actioninstance.timing = me.timing;
                    yield httpinterface_1.default.post(loggingtoken, 'appaction', actioninstance);
                    success(null);
                }
                catch (e) {
                    failure(e);
                }
            }));
        });
    }
}
exports.default = JLIAppAction;
;
