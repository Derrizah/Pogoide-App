import { registerRootComponent } from 'expo';
import {View, Platform} from 'react-native';

import App from './App';

import React, {Fragment, useState, useEffect, useRef } from 'react';
import {AppRegistry} from 'react-native';
import { StatusBar } from 'react-native';
import {name as appName} from './app.json';
import MainNavigator from './src/containers/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";
import {scale} from "react-native-size-matters";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync} from "./src/scripts/NotificationsHandler";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

StatusBar.setBarStyle('light-content', true);
StatusBar.backgroundColor = '#000';

export default function Root() {

    registerForPushNotificationsAsync();

    return (
        <SafeAreaProvider><Fragment>
            {/*<SafeAreaView/>*/}
            <View style={{ flex: 1}}>
                <MainNavigator />
                <FlashMessage position="bottom" icon="info" backgroundColor="#003a70" style={{height: scale(60)}}/>
            </View>
        </Fragment></SafeAreaProvider>
    )
};
//
// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in the Expo client or in a native build,
// // the environment is set up appropriately
registerRootComponent(Root);