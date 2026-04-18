import * as React from "react";
import { observer } from "mobx-react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Messages } from "../../services/Messages";
import { DatabaseState } from "./DatabaseState";
import { LoginState } from "../login/LoginState";

/**
 * Sample Database view
*/

const collectionName = "shakeout-tests";
const docName = "rows";

@observer
export default class DatabaseView extends React.Component {

    private key: string = "";
    private val: string = "";

    constructor(props: any) {
        super(props);
        this.getValues();
    }

    /**
    * Deletes the sample Firestore values.
    */
    private async deleteValues() {
        firebase.firestore()
            .collection(collectionName)
            .doc(docName).delete();
    }

    /**
     * Gets the sample Firestore values.
     */
    private async getValues() {
        const unsubscribe = firebase.firestore()
            .collection(collectionName)
            .doc(docName)
            .onSnapshot((snapshot) => DatabaseState.rows = (snapshot.data() as Record<string, string>) || {});

        LoginState.subscriptions.push(unsubscribe);
    }

    /**
     * Updates the Firestore sample values.
     */
    private async setValue() {
        const update: Record<string, string> = {};
        update[this.key] = this.val;
        firebase.firestore()
            .collection(collectionName).doc(docName)
            .set(update, { merge: true });
    }

    private onAddButtonClicked() {
        if (this.key && this.val) {
            this.setValue();
        }
    }

    private onKeyChange(evt: React.ChangeEvent<HTMLInputElement>) {
        this.key = evt.target.value;
    }

    private onValChange(evt: React.ChangeEvent<HTMLInputElement>) {
        this.val = evt.target.value;
    }

    render() {
        const rows = Object.keys(DatabaseState.rows || {}).map((key) => (
            <li key={key}>{key} | {DatabaseState.rows[key]}</li>
        ));

        return (
            <div>
                <strong>{Messages.get("shakeout-test-database")}</strong>
                <ul>
                    <li>{Messages.get("shakeout-test-key")}<input onChange={this.onKeyChange.bind(this)} type="text" id="key" name="key" /></li>
                    <li>{Messages.get("shakeout-test-val")}<input onChange={this.onValChange.bind(this)} type="text" id="val" name="val" /></li>
                    <li><button onClick={this.onAddButtonClicked.bind(this)}>{Messages.get("shakeout-test-add")}</button></li>
                    <li><button onClick={this.deleteValues.bind(this)}>{Messages.get("shakeout-test-delete")}</button></li>
                    {rows}
                </ul>
            </div>
        );
    }
}
