import { observable } from "mobx";

/**
 * Sample Login State
 */
export class LoginStore {

    @observable public user: firebase.User;
    public subscriptions: any[] = [];

}

export const LoginState = new LoginStore();