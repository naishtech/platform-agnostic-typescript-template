import * as React from "react";
import { observer } from "mobx-react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Messages } from "../../services/Messages";

interface LoginComponentState {
    email: string;
    password: string;
    error: string;
    mode: "signin" | "signup";
}

/**
 * Sample Firebase login component
 */
@observer
export default class Login extends React.Component<{}, LoginComponentState> {

    public state: LoginComponentState = {
        email: "",
        password: "",
        error: "",
        mode: "signin",
    };

    private async onSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        try {
            if (this.state.mode === "signup") {
                await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            } else {
                await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            }

            this.setState({ error: "" });
        } catch (error: any) {
            this.setState({ error: error?.message ?? "Unable to authenticate." });
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <strong>{Messages.get("signin-prompt")}</strong>
                <ul>
                    <li>
                        <input
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(evt) => this.setState({ email: evt.target.value })}
                        />
                    </li>
                    <li>
                        <input
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(evt) => this.setState({ password: evt.target.value })}
                        />
                    </li>
                    <li>
                        <button type="submit">
                            {this.state.mode === "signin" ? "Sign in" : "Create account"}
                        </button>
                        <button
                            type="button"
                            onClick={() => this.setState({ mode: this.state.mode === "signin" ? "signup" : "signin", error: "" })}>
                            {this.state.mode === "signin" ? "Need an account?" : "Already have an account?"}
                        </button>
                    </li>
                    {this.state.error ? <li>{this.state.error}</li> : null}
                </ul>
            </form>
        );
    }
}