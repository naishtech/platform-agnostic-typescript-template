import { Configuration } from "../services/Configuration";
import { Messages } from "../services/Messages";

export const testConfig = {
    config : {
        firebase : {
            apiKey: "testApiKey",
        }
    }
};

export const testMessages = {
    "en-US" : {
        "logout" : "Log out",
        "login" : "Log in",
        "signin-prompt": "Sign in:"
    }
};

it("Should load configuration", () => {

    Configuration.setConfig(testConfig.config);

    const firebaseKey = Configuration.getConfig("firebase").apiKey;

    expect(firebaseKey).toBe('testApiKey');

    Messages.setMessages(testMessages);

});

it("Should load messages", () => {

    Messages.setMessages(testMessages);

    const message = Messages.get("logout")

    expect(message).toBe('Log out');

});

it("Should format messages", () => {

    Messages.setMessages(testMessages);

    const message = Messages.format("Hello {0}",["Patt"])

    expect(message).toBe("Hello Patt");

});
