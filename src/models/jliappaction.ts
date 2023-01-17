import HttpInterface from "./httpinterface";


export default class JLIAppAction {
    name:string;
    processid: string | null;
    timing:number;
    count:number;
    mintiming: number;
    maxtiming: number;
    logstart: Date;

    constructor(name: string, timing: number, processid: string | null) {
        this.name = name;
        this.processid = (typeof processid !== 'undefined' && processid) ? processid : null;
        this.timing = (typeof timing === 'number') ? timing : parseInt(timing, 10);
        if (isNaN(this.timing)) throw 'Invalid timing value';
        
        this.count = 1;
        this.mintiming = this.timing;
        this.maxtiming = this.timing;
        
        this.logstart = new Date();
    }

    isvalid(): boolean {
        if (!this.name) return false;
        if (!this.timing) return false;

        return true;
    }

    async log(loggingtoken: string, logginginterval: number) {
        const me = this;
        return new Promise(async (success, failure) => {
            try {
                const actioninstance:any = {};
                actioninstance.name = me.name;
                actioninstance.count = me.count;
                actioninstance.timestamp = me.logstart.getTime();
                actioninstance.interval = logginginterval;
                actioninstance.processid = me.processid;
                actioninstance.mintiming = me.mintiming;
                actioninstance.maxtiming = me.maxtiming;
                actioninstance.timing = me.timing;

                await HttpInterface.post(loggingtoken, 'appaction', actioninstance);
                success(null);
            }
            catch(e) {
                failure(e);
            }
        });
    }
};