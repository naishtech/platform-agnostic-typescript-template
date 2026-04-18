import * as React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react";
import Login from "./login/Login";
import Home from "./Home";
import { Configuration } from "../services/Configuration";
import ReactGA from "react-ga4";
import firebase from "firebase/compat/app";

/**
 * Sample component containing routes.
 * Initialises firebase and google analytics.
 */

@observer
export default class App extends React.Component {

    constructor(props: any) {
        super(props);
        this.initAnalytics();
        this.initFirebase();
    }

    private initFirebase() {
        const config = Configuration.getConfig("firebase");
        if (config?.apiKey && firebase.apps.length === 0) {
            firebase.initializeApp(config);
        }
    }

    private initAnalytics() {
        const config = Configuration.getConfig("analytics");
        if (config?.google?.config) {
            ReactGA.initialize(config.google.config);
            const trackPage = () => {
                const hashPath = window.location.href.split("#");
                const page = hashPath.length === 2 ? hashPath[1] : "/index";
                ReactGA.send({ hitType: "pageview", page });
            };
            trackPage();
            window.onhashchange = trackPage;
        }
    }

    render() {
        return (
            <HashRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </HashRouter>
        );
    }
}
