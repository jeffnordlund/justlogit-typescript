
import HttpInterface from "./httpinterface";
import StateValue from "./statevalue";

const COMMON_PROPS = ['name', 'description', 'user', 'statevalues'];

export default class JLIEventEntry {
    name: string;
    description: string;
    user: string | null;
    statevalues: Map<string, string> | null;

    constructor() {
        this.name = '';
        this.description = '';
        this.user = null;
        this.statevalues = null;
    }

    isvalid():boolean {
        if (!this.name) return false;
        if (!this.description) return false;

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
        queryitems.push('n=' + encodeURIComponent(this.name));
        queryitems.push('d=' + encodeURIComponent(this.description));
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
                await HttpInterface.get(loggingtoken, 'event', querystring);
                success(null);
            }
            catch(e) {
                failure(e);
            }
        });
    }
}