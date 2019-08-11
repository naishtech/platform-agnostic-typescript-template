import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/App";
import { Configuration } from "./services/Configuration";

declare const require: (path: string) => { default: any; };

/**
 * Sample index compnent with live hot swap
 * Attempts to 
 */

const rootEl = document.getElementById("root");

Configuration.configure("config.json")
    .then(() => render(
        <AppContainer>
            <App />
        </AppContainer>,
        rootEl));

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
    module.hot.accept("./components/App", () => {
        const NewApp = require("./components/App").default;
        Configuration.configure("config.json")
            .then(() => render(
                <AppContainer>
                    <NewApp />
                </AppContainer>,
                rootEl));
    });
}
