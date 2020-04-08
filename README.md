# Example React Native Android, iOS, Web, and Electron app

This is an example [React Native Expo](https://expo.io/) App supporting Android, iOS, Web, and Electron desktop apps.

## Prerequisites

1. `brew cask install adoptopenjdk/openjdk/adoptopenjdk8 android-studio ngrok`
1. `yarn install`
1. Open Android Studio
    1. Follow the wizard to create a blank project
    1. Wait for the app to finish building
    1. Click `Build` > `Generate Signed Bundle / APK` > `Next` > `Create new...`
    1. Enter some application details and save as `keystore.jks` in this folder
1.  
       cat >> .env <<EOL
       # Deployed `dist` folder or run `yarn serve:dist` to do this automatically
       export EXPO_PUBLIC_URL="https://<YOUR-ID>.ngrok.io"
       # From Android Studio step above
       export EXPO_ANDROID_KEYSTORE_PASSWORD="YOUR-1ST-PASSWORD"
       export EXPO_ANDROID_KEY_PASSWORD="YOUR-2ND-PASSWORD"
       export EXPO_ANDROID_KEYSTORE_ALIAS="key0"
       EOL

## Running development apps

For Android, iOS, and Web:

    yarn start

For the Electron desktop app:

    yarn electron

## Building production apps

Build Android APK:

    # First tab (if `dist` folder is not deployed online)
    yarn serve:dist

    # Update `.env` file with displayed ngrok domain

    # Second tab, outputs APK to: `~/expo-apps`
    yarn android:build

Build Electron desktop app:

    # Outputs to: `dist/mac`
    yarn electron:build

Build Web app:

    # Outputs to: `web-build`
    yarn web:build
