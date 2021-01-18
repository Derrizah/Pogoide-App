import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import {Platform} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";

export async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
    });
}

export async function togglePushNotification(title, codename, date){
    let subscriptionStatus;

    // Prepping identifiers
    let soonNotifId = codename + "1";
    let startNotifId = codename + "2";

    await AsyncStorage.getItem("@" + codename)
        .then((result) => subscriptionStatus = result);
    console.log("subscriptionStatus is " + subscriptionStatus);

    if(subscriptionStatus === "true") {
        console.log("cancelling...");
        await AsyncStorage.setItem("@" + codename, "false")
            .catch(err => {
                console.log("Subscription status saving error");
            });
        await Notifications.cancelScheduledNotificationAsync(soonNotifId);
        await Notifications.cancelScheduledNotificationAsync(startNotifId);
    }
    else {
        await AsyncStorage.setItem("@" + codename, "true")
            .catch(err => {
                console.log("Subscription status saving error");
            });
        // Notification Strings
        const soonTitle = "An event will start soon! 📅";
        const soonSubtitle = "Upcoming Event";
        const soonBodyPostfix = " is starting soon. Open the app for details.";

        const startTitle = "An event has started! 🕹️";
        const startSubtitle = "Active Event";
        const startBodyPostfix = " has started. Open the app for details.";

        // Date and Time Parameters
        const dateObject = moment(date, "dddd, MMM DD[, at] HH:mm A");
        const year = moment(dateObject).year();
        const month = moment(dateObject).month();
        const day = moment(dateObject).day();
        const hour = moment(dateObject).hour();
        const minute= moment(dateObject).minute();

        const startDate = moment(dateObject).toDate();

        await Notifications.scheduleNotificationAsync({
            identifier: startNotifId,
            content: {
                title: startTitle,
                subtitle: startSubtitle,
                body: title + startBodyPostfix,
            },
            trigger: {
                channelId: "start-channel",
                date: startDate},
        });

        let soonDate;
        await AsyncStorage.getItem("@soonDays")
            .then((result) => {
                soonDate = moment(dateObject).subtract(parseInt(result), 'days').toDate();
                console.log(soonDate);
            })
            .catch(err => {
                console.log("Could not get soonDays from async storage.");
               soonDate =  moment(dateObject).subtract(5, 'days').toDate();
            });
        if(soonDate > Date.now()) {
            console.log("soon notif is a go");
            await Notifications.scheduleNotificationAsync({
                identifier: soonNotifId,
                content: {
                    title: soonTitle,
                    subtitle: soonSubtitle,
                    body: title + soonBodyPostfix,
                },
                trigger: {
                    channelId: "soon-channel",
                    date: soonDate,
                }
            });
        }
    }
        console.log("Notification should be set.");


        // if(Platform.OS === "ios") {
        //     await Notifications.scheduleNotificationAsync({
        //         identifier: soonNotifId,
        //         content: {
        //             title: startTitle,
        //             subtitle: startSubtitle,
        //             body: title + startBodyPostfix,
        //         },
        //         trigger: {
        //             type:'calendar',
        //             repeats: false,
        //             dateComponents: {
        //                 year: year,
        //                 month: month,
        //                 day: day,
        //                 hour: hour,
        //                 minute: minute,
        //             },
        //         }
        //     });
        // }
        // else if(Platform.OS === "android") {
        //
        //     await Notifications.scheduleNotificationAsync({
        //         identifier: soonNotifId,
        //         content: {
        //             title: startTitle,
        //             subtitle: startSubtitle,
        //             body: title + startBodyPostfix,
        //         },
        //         trigger: {
        //
        //         },
        //     });
        // }
    // }
}

export async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        console.log('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#003a70',
        });
    }
    return token;
}
