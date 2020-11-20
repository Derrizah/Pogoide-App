import { registerRootComponent } from 'expo';

import App from './App';

import React from 'react';
import {AppRegistry} from 'react-native';
import { StatusBar } from 'react-native';
import {name as appName} from './app.json';
import AppNavigator from 'containers/AppNavigator';
import { createAppContainer } from '@react-navigation/native';

StatusBar.setBarStyle('light-content', true);
StatusBar.backgroundColor = '#000';

const Navigation = createAppContainer(AppNavigator);
const Root = () => <Navigation />;

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(Root);
