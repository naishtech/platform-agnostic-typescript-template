import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import { observer } from "mobx-react";
import Login from "./login/Login";
import Home from "./Home";
import { Switch } from "react-router-dom";
import { Configuration } from "../services/Configuration";
import * as ReactGA from "react-ga";
import * as firebase from "firebase/app";

/**
 * Sample component containing routes.
 * Initialises firebase and google analytics.
 */

@observer
export default class App extends React.Component<{}, {}> {

    constructor(props: any){
        super(props);
        this.initAnlytics();
        this.initFirebase();
    }

    private initFirebase(){
        const config = Configuration.getConfig("firebase");
        if (config && firebase.apps.length === 0) {
            return firebase.initializeApp(config);
        }
    }

    private initAnlytics(){
        const config = Configuration.getConfig("analytics")
        if(config) {
            ReactGA.initialize(config.google.config);
            window.onhashchange = () => {
                let hashPath = window.location.href.split("#");
                let page = hashPath.length === 2 ? hashPath[1] : "/index";
                ReactGA.pageview(page);
            };
        }
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" exact component={Home} />
                </Switch>
            </HashRouter>
        );
    }
}
