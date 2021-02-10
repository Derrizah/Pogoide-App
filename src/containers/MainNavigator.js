import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import createStackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import firebase from 'firebase/app';
import 'firebase/database';
import { Appbar } from 'react-native-paper';
import {showMessage} from "react-native-flash-message";
import * as Notifications from 'expo-notifications';
import * as Localization from 'expo-localization';
import * as Device from 'expo-device';


import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import UpcomingStackScreen from './main/UpcomingStackScreen'
import CurrentStackScreen from './main/CurrentStackScreen'
import SettingsScreen from './main/SettingsScreen'
import {SafeAreaContext, SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {registerForPushNotificationsAsync} from "../scripts/NotificationsHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";


const RootStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
class TabStack extends PureComponent {
    // state = {
    //     db: any,
    //     //currentsList: [],
    //     // upcomingsList: [],
    //     // loading: true
    // }
    constructor(props) {
        super();
        const firebaseConfig = {
            apiKey: "AIzaSyAI3afaLzK3s8JLkIw3rC9oR93O68zd7zg",
            authDomain: "blcd-notify.firebaseapp.com",
            databaseURL: "https://blcd-notify.firebaseio.com",
            projectId: "blcd-notify",
            storageBucket: "blcd-notify.appspot.com",
            messagingSenderId: "325992268887",
            appId: "1:325992268887:web:a49eb1e5795854c1a04f12"
        };
        // Initialize Firebase
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        this.db = firebase.database();
    }

    async componentDidMount() {
    // try{
    //     const firebaseConfig = {
    //         apiKey: "AIzaSyAI3afaLzK3s8JLkIw3rC9oR93O68zd7zg",
    //         authDomain: "blcd-notify.firebaseapp.com",
    //         databaseURL: "https://blcd-notify.firebaseio.com",
    //         projectId: "blcd-notify",
    //         storageBucket: "blcd-notify.appspot.com",
    //         messagingSenderId: "325992268887",
    //         appId: "1:325992268887:web:a49eb1e5795854c1a04f12"
    //     };
    //     // Initialize Firebase
    //     firebase.initializeApp(firebaseConfig);
    //     const db = firebase.database();
    //     this.setState({db: db});
    //     //const current = db.ref('/currentEvents').once('value');
    //     // const upcoming= db.ref('/').once('upcomingEvents');
    //     // console.log(current);
    //     //this.setState({currentsList: current, loading: false});
    // }   catch(err){
    //         console.log("Error fetching data---------", err);
    //     }
        let data = [];
        const current = this.db.ref('/alerts');
        await current.once('value').then((snapshot) => {
            data = snapshot.val();
        })
        const alertsData = Object.keys(data).map(key => ({
            key,
            ...data[key]
        }));
        showMessage({
            message: alertsData[0].title,
            description: alertsData[0].text,
            type: alertsData[0].type,
            position: alertsData[0].position,
            autoHide: alertsData[0].autoHide,
            icon: alertsData[0].icon,
            backgroundColor: alertsData[0].bgColor,
            style: {height: scale(80)},
            duration: 5000,
        });
        const token = await registerForPushNotificationsAsync();
        let shouldSend = false;
        await AsyncStorage.getItem("@sentToken")
            .then( (result) => {
                shouldSend = !(result === "true")
                console.log("sentToken result is " + result);
            });
        // if(shouldSend){
            let realToken = token;
            realToken = realToken.replace('ExponentPushToken[', '');
            realToken = realToken.replace(']', '');
            console.log("realtoken is " + realToken);
           const tokensDb = this.db.ref('/tokens/' + realToken).set({
               token: realToken,
               os: Device.osName,
               osVersion: Device.osVersion,
               locale: Localization.locale,
               deviceName: Device.deviceName,
               isRealDevice: Device.isDevice,
               deviceBrand: Device.brand,
           },(error) => {
               if(error){
                   console.log("error sending token");
               } else {
                   console.log("successfully sent token");
                   AsyncStorage.setItem("@sentToken", "true");
               }
           });
        // }
    }
    render() {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: 'white',
                    inactiveTintColor: 'gray',
                    indicatorStyle: {backgroundColor: "white"},
                    style:{
                        backgroundColor:"#003a70",
                        elevation: 0,
                    },
                }}>
                <Tab.Screen name="Current" component={CurrentStackScreen} initialParams={{
                    db: this.db
                }} />
                <Tab.Screen name="Upcoming" component={UpcomingStackScreen} initialParams={{
                    db: this.db
                }} />
            </Tab.Navigator>
        )
    }
}

// class HomeScreen extends PureComponent {
//     constructor() {
//         super();
//         // this.reverse = true;
//     }
//     render() {
//         return (
//             <RootStack.Navigator>
//                 <RootStack.Screen name="HeaderTitle" component={TabStack}
//                                   options={{
//                                       header: ({ scene, previous, navigation }) => {
//                                           const { options } = scene.descriptor;
//                                           const title =
//                                               options.headerTitle !== undefined
//                                                   ? options.headerTitle
//                                                   : options.title !== undefined
//                                                   ? options.title
//                                                   : scene.route.name;
//
//
//                                           return (
//                                               <Appbar.Header
//                                                   style={{backgroundColor:"#003a70"}}>
//                                                   <Appbar.Content title="Pogoide"/>
//                                                   <Appbar.Action icon="settings" onPress={() => navigation.push('Settings')}/>
//                                                   {/*<Appbar.Action icon="settings" onPress={() => navigation.navigate}/>*/}
//                                               </Appbar.Header>
//                                           );
//                                       },
//                                   }}/>
//                 <RootStack.Screen name="Settings" component={SettingsScreen}/>
//             </RootStack.Navigator>
//         );
//     }
// }

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Home" screenOptions={{
                header: ({ scene, previous, navigation }) => {
                    return (
                        <Appbar.Header
                            style={{
                                backgroundColor:"#003a70",
                                elevation: 0,
                            }}>
                            {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
                            <Appbar.Content title={scene.route.name}/>
                            {!previous ? <Appbar.Action icon="cog" onPress={() => navigation.navigate('Settings')}/> : null}
                            {/*<Appbar.Action icon="settings" onPress={() => navigation.navigate}/>*/}
                        </Appbar.Header>
                    );
                }
            }}>
                <RootStack.Screen name="Pogoide" component={TabStack}
                                  // options={{
                                  //     header: ({ scene, previous, navigation }) => {
                                  //         // const { options } = scene.descriptor;
                                  //         // const title =
                                  //         //     options.headerTitle !== undefined
                                  //         //         ? options.headerTitle
                                  //         //         : options.title !== undefined
                                  //         //         ? options.title
                                  //         //         : scene.route.name;
                                  //
                                  //
                                  //         return (
                                  //             <Appbar.Header
                                  //                 style={{
                                  //                     backgroundColor:"#003a70",
                                  //                     elevation: 0,
                                  //                 }}>
                                  //                 <Appbar.Content title="Pogoide"/>
                                  //                 <Appbar.Action icon="settings" onPress={() => navigation.push('Settings')}/>
                                  //                 {/*<Appbar.Action icon="settings" onPress={() => navigation.navigate}/>*/}
                                  //             </Appbar.Header>
                                  //         );
                                  //     },
                                  // }}
                    />
                <RootStack.Screen name="Settings" component={SettingsScreen}
                                  options={{
                                      headerStyle: {
                                          backgroundColor: '#003a70',
                                      },
                                      headerTintColor: "#FFFFFF",
                                  }}
                                      />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}