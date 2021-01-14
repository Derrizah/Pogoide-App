import { registerRootComponent } from 'expo';
import {View, Platform, Text, Image, StyleSheet} from 'react-native';

import App from './App';

import React, {Fragment, useState, useEffect, useRef, Component } from 'react';
import {AppRegistry} from 'react-native';
import { StatusBar } from 'react-native';
import {name as appName} from './app.json';
import MainNavigator from './src/containers/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";
import {scale, verticalScale} from "react-native-size-matters";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync} from "./src/scripts/NotificationsHandler";
import AppIntroSlider from 'react-native-app-intro-slider';
import {IconButton} from "react-native-paper";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

StatusBar.setBarStyle('light-content', true);
StatusBar.backgroundColor = '#000';

export default class Root extends Component {
    constructor() {
        super();
        registerForPushNotificationsAsync();
    }
    state = {
        showRealApp: false
    }
    _renderItem = ({ item }) => {
        return (
            <View style={{flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: item.backgroundColor}}>
                <Text style={styles.title}>{item.title}</Text>
                <Image source={item.image} style={styles.image}/>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    }
    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <IconButton
                    name="md-arrow-round-forward"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    icon="arrow-right"
                />
            </View>
        );
    };
    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <IconButton
                    name="md-checkmark"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    icon="check"
                />
            </View>
        );
    };
    _renderSkipButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <IconButton
                    name="md-checkmark"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    icon="check"
                />
            </View>
        );
    }
    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
    }
    render() {
        if(this.state.showRealApp) {
            return (
                <SafeAreaProvider><Fragment>
                    {/*<SafeAreaView/>*/}
                    <View style={{flex: 1}}>
                        <MainNavigator/>
                        <FlashMessage position="bottom" icon="info" backgroundColor="#003a70"
                                      style={{height: scale(60)}}/>
                    </View>
                </Fragment></SafeAreaProvider>
            )
        } else {
            return (<SafeAreaProvider><AppIntroSlider renderItem={this._renderItem} data={slides}
                                                      showSkipButton={true}
                                                      onDone={this._onDone}
                                                      renderDoneButton={this._renderDoneButton}
                                                      renderNextButton={this._renderNextButton}/>
            </SafeAreaProvider>)
        }
    }
};
//
// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in the Expo client or in a native build,
// // the environment is set up appropriately
registerRootComponent(Root);

const slides = [
    {
        key: 'one',
        title: 'Welcome to Pogoide!',
        text: 'All events in one place\nAlways up-to-date',
        image: require('./src/res/images/pokeball.png'),
        backgroundColor: '#EB804C',
    },
    {
        key: 'two',
        title: 'Event Details',
        text: 'Tap to get all the event details\nDates, features,\nspawns and more',
        image: require('./src/res/images/view-details.png'),
        backgroundColor: '#354698',
    },
    {
        key: 'three',
        title: 'Event Notifications',
        text: 'Tap the bell icon to\nget notifications both before\nand when an event starts',
        image: require('./src/res/images/bell.png'),
        backgroundColor: '#F2684A',
    },
    {
        key: 'four',
        title: 'Ready?',
        text: 'Get hunting!',
        image: require('./src/res/images/running-shoes.png'),
        backgroundColor: '#003a70',
    },
];

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: scale(260),
        height: scale(260),
        resizeMode: 'contain',
        marginVertical: 32,
    },
    text: {
        fontSize: scale(22),
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginTop: verticalScale(24),
    },
    title: {
        fontSize: scale(30),
        color: 'white',
        textAlign: 'center',
        marginBottom: verticalScale(24),
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});