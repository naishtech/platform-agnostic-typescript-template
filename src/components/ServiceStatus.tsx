
import * as React from "react";
import { observer } from "mobx-react";
import AccountMenu from "./login/AccountMenu";
import Upload from "./upload/Upload";
import { LoginState } from "./login/LoginState";
import DatabaseView from "./database/DatabaseView";
import { Configuration } from "../services/Configuration";

/**
 * Sample service status  / shakeout test component
 */

const ServiceNames = {

    FIREBASE: "firebase",
    ANALYTICS: "analytics",
    MESSAGES: "messages"

};


const configured = <span style={{ color: "green" }}> Configured</span>;
const error = <span style={{ color: "red" }}>Error, check file: static/config/dev/config.json</span>;

@observer
export default class ServiceStatus extends React.Component<{}, {}> {

    render() {

        return (
            <div>
                <h3>Service Status:</h3>
                <ul>
                    <li>Internationalisation Service (src/services/Messages.ts). Configuration Status:
                        <strong>{Configuration.configured(ServiceNames.MESSAGES) ? configured : error}</strong>
                    </li>
                    <li>Firebase Service (src/services/Firebase.ts). Configuration Status:
                        <strong> {Configuration.configured(ServiceNames.FIREBASE) ? configured : error}</strong>
                    </li>
                    <li>Analytics Service  (src/services/Analytics.ts). Configuration Status:
                        <strong> {Configuration.configured(ServiceNames.ANALYTICS) ? configured : error}</strong>
                    </li>
                </ul>
                <h3>Shakeout Tests:</h3>
                <ul>
                    <li className={Configuration.configured(ServiceNames.FIREBASE) ? "visible" : "hidden"}>
                        <AccountMenu />
                    </li>
                    {LoginState.user ? <DatabaseView /> : null}
                    {LoginState.user ? <Upload /> : null}
                </ul>
            </div>
        );
    }
}


