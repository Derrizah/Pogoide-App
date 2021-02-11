import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import {Platform} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
import {not} from "react-native-reanimated";
import i18n from './LocalizationHandler'

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

        // Date and Time Parameters
        const dateObject = moment(date, "dddd, MMM DD[, at] HH:mm A");
        const year = moment(dateObject).year();
        const month = moment(dateObject).month();
        const day = moment(dateObject).day();
        const hour = moment(dateObject).hour();
        const minute= moment(dateObject).minute();

        const startDate = moment(dateObject).toDate();

        let isStartDisabled;
        await AsyncStorage.getItem("@startDisabled")
            .then((result) => isStartDisabled = result);
        if(isStartDisabled === "false") {
            // Start Notification Strings
            const startTitle = title + " 🕹️";
            const startSubtitle = i18n.t('notifications.start_subtitle');
            const startBody = title + i18n.t('notifications.start_body');

            await Notifications.scheduleNotificationAsync({
                identifier: startNotifId,
                content: {
                    title: startTitle,
                    subtitle: startSubtitle,
                    body: startBody,
                },
                trigger: {
                    channelId: "start-channel",
                    date: startDate
                },
            });
        }
        let isSoonDisabled;
        await AsyncStorage.getItem("@soonDisabled")
            .then((result) => isSoonDisabled = result);
        if(isSoonDisabled === "false") {
            // Soon Notification Strings
            const soonTitle =  title + i18n.t('notifications.soon_title');
            const soonSubtitle = i18n.t('notifications.soon_subtitle');
            const soonBody = title + i18n.t('notifications.soon_body');

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
                        body: soonBody,
                    },
                    trigger: {
                        channelId: "soon-channel",
                        date: soonDate,
                    }
                });
            }
        }
    }
}

export async function cancelAllNotificationsAsync() {
    await Notifications.getAllScheduledNotificationsAsync()
        .then( (notifications) => {
            for (const item of notifications){
                AsyncStorage.setItem("@" + item.identifier.slice(0, -1), "false")
                    .catch(err => {
                        console.log("all notifications cancelling error");
                    });
                console.log(item.identifier.slice(0, -1));
                AsyncStorage.setItem("@" + item.identifier.slice(0, -1) + "auto", "false");
            }
        });
    await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function cancelStartNotificationsAsync() {
    await Notifications.getAllScheduledNotificationsAsync()
        .then( (notifications) => {
            for (const item of notifications){
                if(item.identifier.endsWith("2")){
                    Notifications.cancelScheduledNotificationAsync(item.identifier);
                }
            }
        });
}

export async function cancelSoonNotificationsAsync() {
    await Notifications.getAllScheduledNotificationsAsync()
        .then( (notifications) => {
            for (const item of notifications){
                if(item.identifier.endsWith("1")){
                    Notifications.cancelScheduledNotificationAsync(item.identifier);
                }
            }
        });
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
