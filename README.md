# Platform Agnostic TypeScript Template

A refreshed TypeScript starter for multi-platform apps using React, Webpack, Capacitor, Firebase, MobX, Jest, and Sass.

This repository has been updated to a current toolchain and verified on Windows in April 2026.

## Highlights

- React 18 application bootstrap
- Webpack 5 build pipeline
- TypeScript 5 project setup
- Jest and Testing Library for unit tests
- Firebase integration for auth, storage, and Firestore
- Capacitor support for web, Android, and iOS targets
- ESLint 9 and Stylelint for code quality

## Verified status

The following workflows were validated during the refresh:

- Install dependencies successfully
- Run tests successfully
- Build the web app successfully
- Run ESLint successfully
- Run Stylelint successfully

## Requirements

- Node.js 20, 22, or 24 recommended
- npm 10 or newer
- Android Studio for Android builds
- Xcode for iOS builds

> Node 25 may work for local development, but some optional Firebase tooling currently prefers supported LTS releases.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Start the local web app:

```bash
npm start
```

3. Open the dev server:

```text
http://localhost:8080
```

## Available scripts

```bash
npm start
npm run build:dev
npm run build:test
npm run build:prod
npm test
npm run lint
npm run lint:es
npm run lint:sass
npm run start:android
npm run start:ios
npm run deploy:test
npm run deploy:prod
```

## Project structure

- src/: application source
- src/components/: UI components and feature views
- src/services/: configuration, routing, and message services
- src/__tests__/: unit tests
- static/config/: environment-specific config files
- static/messages/: localization messages
- webpack/: build configurations

## Configuration

Environment config files live in the following folders:

- static/config/dev/
- static/config/test/
- static/config/prod/

Update the appropriate config.json file with your Firebase project settings before trying authentication, Firestore, or Storage features.

Example structure:

```json
{
  "config": {
    "firebase": {
      "apiKey": "your_api_key",
      "authDomain": "your-project.firebaseapp.com",
      "projectId": "your-project-id",
      "storageBucket": "your-project.appspot.com"
    }
  }
}
```

## Authentication

The sample app includes a lightweight email and password sign-in screen backed by Firebase Auth.

If you want login to work end-to-end, make sure email and password sign-in is enabled in your Firebase console.

## Testing

Tests live under src/__tests__/ and use Jest with React Testing Library.

Coverage output is written under the test coverage folder after running the test suite.

## Notes on native targets

The web workflow has been verified as part of this refresh.

Android and iOS support remain wired through Capacitor, but native IDE builds still depend on your local SDK setup and platform-specific signing configuration.

## Future improvements

This repo is now on a modern, working base. A future cleanup could still migrate the remaining Firebase compatibility imports to the fully modular SDK.

## License

MIT

