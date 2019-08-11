import * as React from "react";
import { observer } from "mobx-react";
import { Messages } from "../../services/Messages";
import { DatabaseState } from "./DatabaseState";
import * as firebase from "firebase/app";
import "firebase/firestore";

/**
 * Sample Database view
*/

const colectionName = "shakeout-tests";
const docName = "rows";

@observer
export default class DatabaseView extends React.Component<{}, {}> {

    private key: string;
    private val: string;

    constructor(props: any) {
        super(props);
        this.getValues();
    }

    private async deleteValues() {

        firebase.firestore()
            .collection(colectionName)
            .doc(docName).delete();
    }

    private async getValues() {
        firebase.firestore()
            .collection(colectionName)
            .doc(docName)
            .onSnapshot(snapShot => DatabaseState.rows = snapShot.data());
    }

    private onAddButtonClicked() {
        if (this.key && this.val) {
            const update = {};
            update[this.key] = this.val;
            firebase.firestore()
                .collection(colectionName).doc(docName)
                .set(update, { merge: true });
        }

    }

    private onKeyChange(evt: any) {
        this.key = evt.target.value;
    }

    private onValChange(evt: any) {
        this.val = evt.target.value;
    }

    render() {

        const rows = [];

        for (let key in DatabaseState.rows) {
            rows.push(<li>{key} | {DatabaseState.rows[key]}</li>);
        }

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
