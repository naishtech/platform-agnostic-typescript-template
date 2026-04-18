const { TextDecoder, TextEncoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

if (!global.Response) {
    global.Response = class Response {};
}

if (!global.Request) {
    global.Request = class Request {};
}

if (!global.Headers) {
    global.Headers = class Headers {};
}

if (!global.fetch) {
    global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        json: async () => ({}),
        text: async () => ""
    }));
}

require("@testing-library/jest-dom");

