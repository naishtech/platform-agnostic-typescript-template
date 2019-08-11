import * as React from "react";
import { shallow } from "enzyme";
import App from "../components/App";
import { Configuration } from "../services/Configuration";
import { Messages } from "../services/Messages";
import {testConfig, testMessages} from "./TestConfig";

describe("A suite", () => {

    beforeAll(() => {
        Configuration.setConfig(testConfig);
        Messages.setMessages(testMessages);
    });

    it("should render App without throwing an error", () => {
        shallow(<App/>);
    });

});