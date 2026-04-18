import { makeObservable, observable } from "mobx";

/**
 * Sample Database state
 */
export class DatabaseStore {

    @observable public rows: Record<string, string> = {};
    public key: string = "";
    public val: string = "";

    constructor() {
        makeObservable(this);
    }

}

export const DatabaseState = new DatabaseStore();