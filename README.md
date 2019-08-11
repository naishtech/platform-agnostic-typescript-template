# Platform Agnostic TypeScript Template (PATT)

[![Build Status](https://travis-ci.org/naishtech/platform-agnostic-typescript-template.svg?branch=master)](https://travis-ci.org/naishtech/platform-agnostic-typescript-template)

PATT is a template for multi-platform TypeScript applications with hosting support.

PATT can span mulitple devices natively including Web, Desktop, Android and iOS.

PATT has built in services to help you authenticate users, gather analytics, connect to an online database and upload files to online storage.

PATT is free/open source. Enjoy.

If you find PATT useful, please consider donating:

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=LPZXWY9YRQVXC&currency_code=AUD&source=url" target="_blank"><img title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal" src="https://www.paypalobjects.com/en_AU/i/btn/btn_donate_LG.gif"/></a>

# Table of contents

1. [ Features ](#features)
2. [ Requirements ](#requirements)
3. [ Modules ](#dependencies)
4. [ Setup ](#setup)

<a name="features"></a>

# 1. Features:

- Android, iOS, Desktop and Web support.
- Plain email/password authentication.
- Google Analytics support.
- Local, Test and Production environment configurations.
- Firebase hosting, database and storage support. Firebase Functions with Typscript not included (there's a [template](https://github.com/firebase/functions-samples/tree/master/typescript-getting-started) for that already)
- Multilingual i18n support.

<img src="docs/ComponentDiagram.png"
     alt="Components"/>

<a name="requirements"></a>

# 2. Requirements:

- NodeJS.
- npm.
- Android Studio (Android).
- XCode (iOS).

<a name="modules"></a>

# 3. Modules:

- PATT includes the following main dependencies:

- [Capacitor](https://capacitor.ionicframework.com/)
- [Firebase](https://firebase.google.com/)
- [Google Analytics](https://analytics.google.com/analytics/web/)
- [Webpack](https://webpack.js.org/)
- [Jest](https://jestjs.io/)
- [Mobx](https://github.com/mobxjs/mobx)
- [TypeScript](https://www.typescriptlang.org/) 
- [tslint](https://palantir.github.io/tslint/)
- [Scss](https://sass-lang.com/)
- [stylelint](https://stylelint.io/)

<a name="setup"></a>

# 4. Setup:

## Install your IDE's:

1. Install [VSCode](https://code.visualstudio.com/).

2. Install [NodeJS/npm](https://nodejs.org/en/).

3. Optionally, for Android support, install [Android Studio](https://developer.android.com/studio).
    - Make sure your JAVA_HOME and ANDROID_SDK_ROOT environment variables are set correctly.
    - Make sure you setup a Virtual Device (you can do this as part of the android launch, see below).

4. Optionally, for iOS support, install [XCode](https://developer.apple.com/xcode/).

5. Open a command prompt and change directory to your project's root directory.

6. Execute `npm install`.

# Development Guide:

## Getting Started:

### Building the web app:

`npm run build:dev`

- Notes:
    - [Capacitor](https://capacitor.ionicframework.com/) works by copying your web application bundle (HTML / JavaScript / CSS) to other target platforms (IOS/Android/Desktop). This script will build your web application using the configuration in `/webpack/dev.js`.
    - If you navigate to the `/webpack` directory you will also see WebPack configurations for test (`test.json`) and production (`prod.json`) - those configurations are used to deploy to your test and production servers.

### Running tests:

`npm run test`

- Notes:
    - This template includes Jest as a unit testing tool. A sample test rendering the `<App/>` component can be found in `/src/__tests__/App.test.tsx`. To execute the tests run:
    - All tests should be placed under `/src/__tests__/`
    - A coverage report will be added to `/src/__coverage__/`

### Starting the local web development server:

`npm run start`

- Notes:
    - Once you have built your application, you can start a local web host at http://localhost:8080 using the above command:
    - Note the local webpack development server comes with an inbuilt hot loader and will reload as you make changes to your source code.

### Starting the local Android emulator:

`npm run start:android`

- Notes:
    - Make sure you have installed Android Studio as per installation instructions above.
    - If this is the first time you have opened the project in Android Studio it will prompt you for import. Just select the defauls and continue.
    - Once Android Studio has started the project should automatically build, once built you can execute it via the Run menu.

### Starting the local iOS emulator:

`npm run start:ios`

- Notes:
    - Make sure you have installed XCode as per installation instructions above.
    - If this is the first time you have opened the project in XCode it will prompt you for import. Just select the defauls and continue.
    - Once XCode has started the project should automatically build, once built you can execute it via the Run button.

### Starting the desktop application:

`npm run start:desktop`

- Notes:
    - Electron support for Capacitor is currently in preview, and lags behind iOS, Android, and Web support.
    - First time starting this might take a while, be patient

# Hosting

## Deploying to a Firebase test server

- This template provides configuration for a firebase test server.

1. First, create a new Firebase project.
2. Add the project id for your test Firebase project under the `test` field in `.firebaserc`:

 
```
 {
  "projects": {
...
    "test": "test-firebase-project",
...
  }
}
```

3. Add the relevant configuration to the following file.

`/static/config/test.json`

```
...
        "firebase" : {
            "apiKey": "",
            "authDomain": "",
            "databaseURL": "",
            "projectId": "",
            "storageBucket": "",
            "messagingSenderId": ""
        }
...
```

- Firebase project settings can be found in your Firebase project under `Project Settings`
- Once you have configured as per above, run the following:

`npm run deploy:test`

## Deploying to a Firebase production server

- This template provides configuration for a firebase production server.

1. First, create a new Firebase project.
2. Add the project id for your production Firebase project under the `prod` field in `.firebaserc`:

 
```
 {
  "projects": {
...
    "prod": "test-firebase-project",
...
  }
}
```


3. Add the relevant configuration to the following file.

`/static/config/prod.json`

```
...
        "firebase" : {
            "apiKey": "",
            "authDomain": "",
            "databaseURL": "",
            "projectId": "",
            "storageBucket": "",
            "messagingSenderId": ""
        }
...
```

- Firebase project settings can be found in your Firebase project under `Project Settings`
- Once you have configured as per above, run the following:

`npm run deploy:prod`

# Developer Guide

## Sample Components

- `src/components/AccountMenu.tsx`: Simple account menu with a login link. Clicking the link will send the user to Login.tsx
- `src/components/Login.tsx`: Contains the FirebaseUI plain email/password login/sign up button
- `src/App.tsx`: Main container with configured routes (with dev hot loader support)
- `src/Home.tsx`: Simple home screen showing PATT service configuration and shakeout tests
- `index.tsx`: Index page with dev hot loader support

## Sample States

- `src/components/LoginState.ts`: Login state with mobx (decorator) support

## Services

- The included services are under the following directory: `/src/services/`. 
- Note: Services are executed in the following order:

    1. Configuation.ts
    2. Messages.ts

### Built in services:

-  Authentication.ts
    - Make sure you have configured your signin method(s) on your Firebase project (under the [firebase console](https://console.firebase.google.com) go to Authentication -> Signin-Method) 
    - When configured, will listen for user login (either via firebase auto sign in or manual login with the Login.tsx component)
    - Example usage:

    ```
    import {Authentication} from 'Authentication';

    /* 
        Listen for sign in
    */

    Authentication.listenForLogin();

    ```

- Configuration.ts
    - Configuration service supporting dev, test and prod configurations under `src/static/config/`;
    - Messages.json are loaded via XHR Request (see Messages.ts)
    - The dev, test and prod configuration is deployed with the relative npm script targets `npm deploy:<dev|test|prod>`
    - Example usage:

    ```
    import {Configuration} from 'Configuration';

    /* 
        Get the storage bucket string from config.
    */
    
    const storageBucket = Configuration.getConfig('firebase').storageBucket;

    ```


- Messages.ts



## Configuration

## Adding firebase functions support

- Firebase functions should be developed in a different project/repository, here's a decent TypeScript template to get you started

https://github.com/firebase/functions-samples/tree/master/typescript-getting-started




