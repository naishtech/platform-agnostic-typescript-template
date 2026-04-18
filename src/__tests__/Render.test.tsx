import * as React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";
import { Messages } from "../services/Messages";
import { testMessages } from "./Services.test";
import { Configuration } from "../services/Configuration";

jest.mock("react-ga4", () => ({
    initialize: jest.fn(),
    send: jest.fn(),
}));

/**
 * Sample .tsx test
 */
describe("Component Suite", () => {

    beforeAll(() => {
        Configuration.setConfig({});
        Messages.setMessages(testMessages);
    });

    it("should render App without throwing an error", () => {
        render(<App />);
        expect(screen.getByText("PATT Home")).toBeInTheDocument();
    });
});