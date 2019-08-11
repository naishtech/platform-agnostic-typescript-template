import { observable } from "mobx";

export class DatabaseStore {

    @observable public rows: any;
    public key: string;
    public val: string;

}

export const DatabaseState = new DatabaseStore();