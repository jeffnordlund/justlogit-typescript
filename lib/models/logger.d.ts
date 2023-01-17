import AppActionList from "./appactionlist";
import StateValue from "./statevalue";
export default class Logger {
    token: string;
    appactionlist: AppActionList;
    constructor(token: string);
    logError(errorobject: any, user?: string | null, statevalues?: Array<StateValue> | null | undefined): Promise<unknown>;
    logPerformance(method: string, timing: number, user?: string | null, details?: string | null, statevalues?: Array<StateValue> | null | undefined): Promise<unknown>;
    logEvent(name: string, description: string, user?: string | null, statevalues?: Array<StateValue> | null | undefined): Promise<unknown>;
    logInformation(method: string, details: string, user?: string | null, statevalues?: Array<StateValue> | null | undefined): Promise<unknown>;
    logAppAction(name: string, pid: string | null, timing: number): Promise<unknown>;
    setAppActionLogInterval(seconds: number): void;
}
export { Logger };
