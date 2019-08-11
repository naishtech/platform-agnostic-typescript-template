import { observable } from "mobx";

export class LoginStore {

    @observable public user: firebase.User;

}

export const LoginState = new LoginStore();