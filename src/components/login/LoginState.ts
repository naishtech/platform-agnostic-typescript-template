import firebase from "firebase/compat/app";
import { makeObservable, observable } from "mobx";

/**
 * Sample Login State
 */
export class LoginStore {

    @observable public user: firebase.User | null = null;
    public subscriptions: Array<() => void> = [];

    constructor() {
        makeObservable(this);
    }

}

export const LoginState = new LoginStore();