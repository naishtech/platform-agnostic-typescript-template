import * as React from "react";
import { shallow } from "enzyme";
import App from "../components/App";
import { Messages } from "../services/Messages";
import { testMessages, testConfig } from "./Services.test"; 
import { Configuration } from "../services/Configuration";

/**
 * Sample .tsx test
 */
describe("Component Suite", () => {

    beforeAll(() => {

        Configuration.setConfig(testConfig)
        Messages.setMessages(testMessages);

    });

    it("should render App without throwing an error", () => {
        shallow(<App/>);
    });


});