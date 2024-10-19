
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

    addstatevalues(statevalues: Array<StateValue> | object) {
        if (Array.isArray(statevalues)) {
            for (const item of statevalues) {
                const { key, value} = item;
                if (key && value) {
                    if (!this.statevalues.has(key) && !this.extravalues.has(key) && COMMON_PROPS.indexOf(key) === -1) {
                        this.statevalues.set(key, value);
                    }
                }
            }
        }
        else {
            for (const key of Object.keys(statevalues)) {
                this.statevalues.set(key, (statevalues as any)[key]);
            }
        }
    }

    async log(loggingtoken:string) {
        const logobject:any = {};
        logobject.message = this.message;
        logobject.stack = this.stack;
        logobject.user = this.user;

        if (this.extravalues) {
            for (let key of this.extravalues.keys()) {
                logobject[key] = this.extravalues.get(key);
            }
        }

        if (this.statevalues) {
            for (let key of this.statevalues.keys()) {
                logobject[key] = this.statevalues.get(key);
            }
        }

        await HttpInterface.post(loggingtoken, 'error', logobject);
    }

};
