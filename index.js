import { registerRootComponent } from 'expo';
import {View,
    SafeAreaView} from 'react-native';

import App from './App';

import React, {Fragment} from 'react';
import {AppRegistry} from 'react-native';
import { StatusBar } from 'react-native';
import {name as appName} from './app.json';
import MainNavigator from './src/containers/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";

StatusBar.setBarStyle('light-content', true);
StatusBar.backgroundColor = '#000';

export default () => {
    return <MainNavigator/>
};

// const Navigation = createAppContainer(TabNavigator);
const Root = () => <Fragment>
    <SafeAreaView style={{ flex: 0, backgroundColor: '#003a70' }} />
    <View style={{ flex: 1}}>
        <MainNavigator />
        <FlashMessage position="bottom" />
</View>
</Fragment>;
//
// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in the Expo client or in a native build,
// // the environment is set up appropriately
registerRootComponent(Root);
