import StateValue from "./statevalue";
export default class JLIPerformanceEntry {
    method: string;
    timing: number;
    user: string | null;
    details: string | null;
    statevalues: Map<string, string> | null;
    constructor();
    isvalid(): boolean;
    addstatevalues(statevalues: Array<StateValue>): void;
    getquerystring(): string;
    log(loggingtoken: string): Promise<unknown>;
}
