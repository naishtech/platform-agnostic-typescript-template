import { Configuration } from "../services/Configuration";
import { Messages } from "../services/Messages";

export const testConfig = {
    "config" : {
        "firebase" : {
            "apiKey": "testApiKey",
            "authDomain": "testAuthDomain",
            "databaseURL": "testDatabaseURL",
            "projectId": "testProjectId",
            "storageBucket": "testStorageBucket",
            "messagingSenderId": "1234567890"
        },
        "analytics": {
            "google": {
                "config": "UA-TEST-1"
            }
        },
        "messages" : "messages.json"
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

    Configuration.setConfig(testConfig);
    Messages.setMessages(testMessages);

});
