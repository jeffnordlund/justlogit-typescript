import StateValue from "./statevalue";
export default class JLIError {
    message: string;
    stack: string | null;
    user: string | null;
    extravalues: Map<string, string>;
    statevalues: Map<string, string>;
    constructor();
    isvalid(): boolean;
    setvalue(key: string, value: any): void;
    addstatevalues(statevalues: Array<StateValue>): void;
    log(loggingtoken: string): Promise<unknown>;
}
