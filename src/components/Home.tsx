
import * as React from "react";
import { observer } from "mobx-react";
import ServiceStatus from "./ServiceStatus";
import { Messages } from "../services/Messages";

/**
 * Sample Home Page component.
 * Contains ServiceStatus component
  */

@observer
export default class Home extends React.Component<{}, {}> {

    render() {
        return (
            <div>
                <h1>{Messages.get("home-title")}</h1>
                <ServiceStatus />
            </div>
        );
    }
}
