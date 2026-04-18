import * as React from "react";
import { observer } from "mobx-react";
import firebase from "firebase/compat/app";
import AccountMenu from "./login/AccountMenu";
import Upload from "./upload/Upload";
import { LoginState } from "./login/LoginState";
import DatabaseView from "./database/DatabaseView";

@observer
export default class ServiceStatus extends React.Component {

    render() {
        const hasFirebase = firebase.apps.length > 0;

        return (
            <div>
                {hasFirebase ? <AccountMenu /> : null}
                {hasFirebase && LoginState.user ?
                    <ul>
                        <li>
                            <DatabaseView />
                        </li>
                        <li>
                            <Upload />
                        </li>
                    </ul>
                    : null}
            </div>
        );
    }
}

