
import HttpInterface from "./httpinterface";
import StateValue from "./statevalue";


const COMMON_PROPS = ['message', 'stack', 'user', 'extravalues', 'statevalues'];


export default class JLIError {
    message:string;
    stack: string | null;
    user: string | null;
    extravalues: Map<string, string>;
    statevalues: Map<string, string>;

    constructor() {
        this.message = '';
        this.stack = '';
        this.user = null;

        this.extravalues = new Map<string, string>();
        this.statevalues = new Map<string, string>();
    }

    isvalid() : boolean {
        if (!this.message) return false;
        
        return true;
    }

    setvalue(key:string, value:any) {
        if (COMMON_PROPS.indexOf(key) === -1) {
            if (!this.statevalues.has(key) && !this.extravalues.has(key)) {
                this.extravalues.set(key, value);
            }
        }
    }

    addstatevalues(statevalues: Array<StateValue>) {
        for (let i = 0; i < statevalues.length; i++) {
            let key = statevalues[i].key;
            let value = statevalues[i].value;

            if (!this.statevalues.has(key) && !this.extravalues.has(key) && COMMON_PROPS.indexOf(key) === -1) {
                this.statevalues.set(key, value);
            }
        }
    }

    async log(loggingtoken:string) {
        const me = this;
        return new Promise(async (success, failure) => {
            try {
                const logobject:any = {};
                logobject.message = me.message;
                logobject.stack = me.stack;
                logobject.user = me.user;

                if (me.extravalues) {
                    for (let key in me.extravalues.keys()) {
                        logobject[key] = me.extravalues.get(key);
                    }
                }

                if (me.statevalues) {
                    for (let key in me.statevalues.keys()) {
                        logobject[key] = me.statevalues.get(key);
                    }
                }

                await HttpInterface.post(loggingtoken, 'error', logobject);
                success(null);
            }
            catch(e) {
                failure(e);
            }
        });
    }

};
