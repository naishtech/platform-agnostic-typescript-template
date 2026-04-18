import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import App from "./components/App";
import { Configuration } from "./services/Configuration";

declare const require: (path: string) => { default: React.ComponentType; };
declare let module: {
    hot?: {
        accept: (path: string, callback: () => void) => void;
    }
};

/**
 * Sample index component with hot reload support.
 */

const rootEl = document.getElementById("root");
let root: Root | null = null;

const renderApp = (Component: React.ComponentType) => {
    if (!rootEl) {
        return;
    }

    if (!root) {
        root = createRoot(rootEl);
    }

    root.render(<Component />);
};

Configuration.configure("config.json")
    .then(() => renderApp(App));

if (module.hot) {
    module.hot.accept("./components/App", () => {
        const NewApp = require("./components/App").default;
        Configuration.configure("config.json")
            .then(() => renderApp(NewApp));
    });
}
