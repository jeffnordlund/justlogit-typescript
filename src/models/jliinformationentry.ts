
import HttpInterface from "./httpinterface";
import StateValue from "./statevalue";

const COMMON_PROPS = ['method', 'details', 'user', 'statevalues'];


export default class JLIInformationEntry {
    method:string;
    details:string;
    user:string | null;
    statevalues: Map<string, string> | null;

    constructor() {
        this.method = '';
        this.details = '';
        this.user = null;
        this.statevalues = null;
    }

    isvalid(): boolean {
        if (!this.method) return false;
        if (!this.details) return false;

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
        queryitems.push('d=' + encodeURIComponent(this.details));
        if (this.user) {
            queryitems.push('u=' + encodeURIComponent(this.user));
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
                await HttpInterface.get(loggingtoken, 'info', querystring);
                success(null);
            }
            catch(e) {
                failure(e);
            }
        });
    }
}