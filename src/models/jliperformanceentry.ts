
import HttpInterface from "./httpinterface";
import StateValue from "./statevalue";

const COMMON_PROPS = ['method', 'timing', 'user', 'statevalues', 'details'];

export default class JLIPerformanceEntry {
    method:string;
    timing: number;
    user: string | null;
    details: string | null;
    statevalues: Map<string, string> | null;

    constructor() {
        this.method = '';
        this.timing = 0;
        this.user = null;
        this.details = null;
        this.statevalues = null;
    }

    isvalid(): boolean {
        if (!this.method) return false;
        if (this.timing === null || this.timing < 0) return false;

        return true;
    }
    
    addstatevalues(statevalues: Array<StateValue>) {
        if (!this.statevalues) this.statevalues = new Map<string, string>();

        for (let i = 0; i < statevalues.length; i++) {
            let key = statevalues[i].key;
            let value = statevalues[i].value;

            if (!this.statevalues.has(key) && COMMON_PROPS.indexOf(key) === -1) {
                this.statevalues.set(key, value);
            }
        }
    }

    getquerystring(): string {
        const queryitems = [];
        queryitems.push('m=' + encodeURIComponent(this.method));
        queryitems.push('t=' + this.timing);
        if (this.user) {
            queryitems.push('u=' + encodeURIComponent(this.user));
        }
        if (this.details) {
            queryitems.push('d=' + encodeURIComponent(this.details));
        }

        if (this.statevalues) {
            for (let key in this.statevalues.keys()) {
                queryitems.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.statevalues.get(key) as string));
            }
        }
        
        return queryitems.join('&');
    }

    async log(loggingtoken: string) {
        const me = this;
        return new Promise(async (success, failure) => {
            try {
                // format the query string
                const querystring = me.getquerystring();
                await HttpInterface.get(loggingtoken, 'perf', querystring);
                success(null);
            }
            catch(e) {
                failure(e);
            }
        });
    }
};
