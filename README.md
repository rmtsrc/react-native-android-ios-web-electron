# Example React Native Android, iOS, Web, and Electron app

This is an example [React Native Expo](https://expo.io/) App supporting Android, iOS, Web, and Electron desktop apps.

## Prerequisites

1. `brew cask install adoptopenjdk/openjdk/adoptopenjdk8 android-studio ngrok`
1. `yarn install`
1. (Optional) Open Android Studio
    1. Follow the wizard to create a blank project
    1. Wait for the app to finish building
    1. Click `Build` > `Generate Signed Bundle / APK` > `Next` > `Create new...`
    1. Enter some application details and save as `keystore.jks` in this folder
1. (Optional) Open Xcode
    1. Click `Xcode` > `Preferences`
    1. Click `Account`, add an Apple account
    1. `Manage Certificates...` > Generate a new developer certificate
1. (Optional) For production apps:

       cat >> .env <<EOL
       # Replace <var> with your details from steps above
       # Deployed `dist` folder or run `yarn serve:dist` to do this automatically
       export EXPO_APP_PUBLIC_URL="https://<Your ID>.ngrok.io"
       # Deployed `dist-electron` folder or run `yarn serve:electron:dist` to do this automatically
       export EXPO_ELECTRON_PUBLIC_URL="https://<Your ID>.ngrok.io"
       # From Android Studio step above
       export EXPO_ANDROID_KEYSTORE_PASSWORD="<Your 1st Password>"
       export EXPO_ANDROID_KEY_PASSWORD="<Your 2nd Password>"
       export EXPO_ANDROID_KEYSTORE_ALIAS="<Your Key Alias e.g key0>"
       EOL

## Running development apps

For Android, iOS, and Web:

    yarn start

For the Electron desktop app:

    yarn electron

## Building production apps with auto updates

Build Android APK:

    # First tab (if `dist` folder is not deployed online)
    yarn serve:dist

    # Update `.env` file with displayed ngrok domain

    # Second tab, outputs APK to: `~/expo-apps`
    yarn android:build

    # Copy to phone and install check that it works, then bump the version number in `package.json`
    yarn build

    # Relaunch the app, check ngrok logs to see if app it downloading the latest bundle, restart app to apply update

Build Electron desktop app:

    # First tab: to serve the `dist-electron` folder (if not deployed online)
    yarn serve:electron:dist
    
    # Second tab, outputs to: `dist/mac`
    yarn electron:build:packed

    # Install via the `dmg` file, bump the version number in `package.json` and rerun the `electron:build:packed` command above

    # Watch the update being downloaded via
    /Applications/react_native_android_ios_web_electron.app/Contents/MacOS/react_native_android_ios_web_electron

Build Web app:

    # Outputs to: `web-build`
    yarn web:build

    # Run server
    yarn serve web-build
