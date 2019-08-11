import * as React from "react";
import { observer } from "mobx-react";
import { Messages } from "../../services/Messages";
import { LoginState } from "./LoginState";
import { Routing } from "../../services/Routing";
import "../../Common.scss";
import * as firebase from "firebase/app";
import { Redirect } from "react-router";

/**
 * Sample login / log out component
 */

@observer
export default class AccountMenu extends React.Component<{}, {}> {

    constructor(props: any) {

        super(props);
        this.listenForLogin();

    }

    private listenForLogin() {

        firebase.app().auth().onAuthStateChanged(user => LoginState.user = user);

    }

    /**
     * Clear firebase references and signs the user out when the logout link is clicked
     */

    private onClickLogout() {

        LoginState.subscriptions.filter(unsub => !!unsub).forEach(unsub => unsub());

        firebase.auth().signOut().then(() => {
            LoginState.user = null;
            Routing.redirect = Routing.HOME;
        }, (error) => {
            console.error(error);
        });
        
    }

    private onClickLogin() {

        Routing.redirect = Routing.LOGIN;

    }

    render() {
        return (
            <div>
                <strong>{Messages.get("shakeout-test-auth")}</strong>
                <a className={LoginState.user ? "visible" : "hidden"}
                    href="javascript:void(0)"
                    onClick={this.onClickLogout.bind(this)}>
                    {Messages.get("shakeout-test-logout")}
                </a>
                <a className={LoginState.user ? "hidden" : "visible"}
                    href="javascript:void(0)"
                    onClick={this.onClickLogin.bind(this)}>
                    {Messages.get("shakeout-test-login")}
                </a>
                {LoginState.user ? Messages.get("welcome") + " " + LoginState.user.email : ""}
                {Routing.redirect ? <Redirect to={Routing.redirect} /> : null}
            </div>
        );
    }
}