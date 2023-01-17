import JLIAppAction from "./jliappaction";
export default class AppActionList {
    loggingintervalseconds: number;
    loggingtoken: string;
    actions: Array<JLIAppAction>;
    constructor(token: string, logginginterval: number | null);
    findaction(name: string, pid: string | null): JLIAppAction | null;
    removeaction(name: string, pid: string | null): void;
    addaction(action: JLIAppAction): void;
    setlogginginterval(interval: number | string): void;
}
