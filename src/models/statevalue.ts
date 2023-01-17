

export default class StateValue {
    key: string;
    value: any;

    constructor(key:string, value:any) {
        this.key = key;
        this.value = value;
    }
};

export { StateValue };