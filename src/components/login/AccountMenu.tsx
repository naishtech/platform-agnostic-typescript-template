import * as React from "react";
import { observer } from "mobx-react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Navigate } from "react-router-dom";
import { Messages } from "../../services/Messages";
import { LoginState } from "./LoginState";
import { Routing } from "../../services/Routing";
import "../../Common.scss";

/**
 * Sample login / log out component
 */

@observer
export default class AccountMenu extends React.Component {

    constructor(props: any) {
        super(props);
        this.listenForLogin();
    }

    /**
     * Listens for Firebase authentication changes.
     */
    private listenForLogin() {
        if (!firebase.apps.length) {
            return;
        }

        firebase.auth().onAuthStateChanged((user) => LoginState.user = user);
    }

    /**
     * Clear firebase references and sign the user out.
     */
    private onClickLogout() {
        LoginState.subscriptions.filter((unsub) => !!unsub).forEach((unsub) => unsub());

        firebase.auth().signOut().then(() => {
            LoginState.user = null;
            Routing.redirect = Routing.HOME;
        }).catch((error) => {
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
                <button className={LoginState.user ? "visible" : "hidden"}
                    onClick={this.onClickLogout.bind(this)}>
                    {Messages.get("shakeout-test-logout")}
                </button>
                <button className={LoginState.user ? "hidden" : "visible"}
                    onClick={this.onClickLogin.bind(this)}>
                    {Messages.get("shakeout-test-login")}
                </button>
                {LoginState.user ? `${Messages.get("welcome")} ${LoginState.user.email}` : ""}
                {Routing.redirect ? <Navigate to={Routing.redirect} /> : null}
            </div>
        );
    }
}