export default class JLIAppAction {
    name: string;
    processid: string | null;
    timing: number;
    count: number;
    mintiming: number;
    maxtiming: number;
    logstart: Date;
    constructor(name: string, timing: number, processid: string | null);
    isvalid(): boolean;
    log(loggingtoken: string, logginginterval: number): Promise<unknown>;
}
