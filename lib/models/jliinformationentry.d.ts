import StateValue from "./statevalue";
export default class JLIInformationEntry {
    method: string;
    details: string;
    user: string | null;
    statevalues: Map<string, string> | null;
    constructor();
    isvalid(): boolean;
    addstatevalues(statevalues: Array<StateValue>): void;
    getquerystring(): string;
    log(loggingtoken: string): Promise<unknown>;
}
