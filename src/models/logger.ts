
import JLIError from "./jlierror";
import JLIAppAction from "./jliappaction";
import JLIEventEntry from "./jlievententry";
import JLIInformationEntry from "./jliinformationentry";
import JLIPerformanceEntry from "./jliperformanceentry";
import AppActionList from "./appactionlist";
import StateValue from "./statevalue";

export default class Logger {
    token: string;
    appactionlist: AppActionList;

    constructor(token: string) {
        this.token = token;
        if (!this.token) {
            console.log('No token was provided for the justlogit logger.  Logging will not function.');
        }

        this.appactionlist = new AppActionList(this.token, 60);
    }
    
    async logError(errorobject:any, user?:string | null, statevalues?: Array<StateValue> | null | undefined) {    
        try {
            const token = this.token;
            if (token) {
                const erroritem = new JLIError();
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
        }
        catch(e) {
            console.error(e);
        }
    }

    async logPerformance(method: string, timing: number, user?: string | null, details?: string | null, statevalues?: Array<StateValue> | null | undefined) {
        try {
            const token = this.token;
            if (token) {
                const perfitem = new JLIPerformanceEntry();
                perfitem.method = method;
                perfitem.timing = (typeof timing === 'number') ? timing : parseInt(timing, 10);
                perfitem.user = (typeof user !== 'undefined') ? user : null;
                perfitem.details = (typeof details !== 'undefined' && details) ? details : null;
                if (typeof statevalues !== 'undefined' && statevalues) {
                    perfitem.addstatevalues(statevalues);
                }
                
                perfitem.log(token);
            }
        }
        catch(e) {
            console.error(e);
        }
    }

    async logEvent(name: string, description: string, user?: string | null, statevalues?: Array<StateValue> | null | undefined) {
        try {
            const token = this.token;
            if (token) {
                const eventitem = new JLIEventEntry();
                eventitem.name = name;
                eventitem.description = description;
                eventitem.user = (typeof user !== 'undefined' && user) ? user : null;
                if (typeof statevalues !== 'undefined' && statevalues) {
                    eventitem.addstatevalues(statevalues);
                }
                eventitem.log(token);
            }
        }
        catch(e) {
            console.error(e);
        }
    }

    async logInformation(method: string, details: string, user?: string | null, statevalues?: Array<StateValue> | null | undefined) {
        try {
            const token = this.token;
            if (token) {
                const infoitem = new JLIInformationEntry();
                infoitem.method = method;
                infoitem.details = details;
                infoitem.user = (typeof user !== 'undefined' && user) ? user : null;
                if (typeof statevalues !== 'undefined' && statevalues) {
                    infoitem.addstatevalues(statevalues);
                }
                infoitem.log(token);
            }
        }
        catch(e) {
            console.error(e);
        }
    }

    async logAppAction(name: string, pid: string | null, timing: number) {
        if (this.token) {
            const appactionitem = new JLIAppAction(name, timing, pid);
            this.appactionlist.addaction(appactionitem);
        }
    }

    setAppActionLogInterval(seconds: number) {
        this.appactionlist.setlogginginterval(seconds);
    }
};

export { Logger };