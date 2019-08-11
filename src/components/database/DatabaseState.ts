import { observable } from "mobx";

/**
 * Sample Database state
 */
export class DatabaseStore {

    @observable public rows: any;
    public key: string;
    public val: string;


}

export const DatabaseState = new DatabaseStore();