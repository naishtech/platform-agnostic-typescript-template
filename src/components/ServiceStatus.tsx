
import * as React from "react";
import { observer } from "mobx-react";
import AccountMenu from "./login/AccountMenu";
import Upload from "./upload/Upload";
import { LoginState } from "./login/LoginState";
import DatabaseView from "./database/DatabaseView";
import firebase = require("firebase");

@observer
export default class ServiceStatus extends React.Component<{}, {}> {

    render() {

        return (
            <div>
                {firebase.app.length > 0 ? <AccountMenu /> : null}
                {firebase.app.length > 0 && LoginState.user ? 
                    <ul>
                        <li>
                            {LoginState.user ? <DatabaseView /> : null}
                        </li>
                        <li>
                            {LoginState.user ? <Upload /> : null}
                        </li>
                    </ul>
                : null}
            </div>
        );
    }
}


