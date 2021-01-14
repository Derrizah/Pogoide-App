import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import {Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export async function togglePushNotification(title, codename){
    let subscriptionStatus;
    let soonNotifId = codename + "1";
    let startNotifId = codename + "2";
    await AsyncStorage.getItem("@" + codename)
        .then((result)=> result = subscriptionStatus);
    if(result === "true") {
        await AsyncStorage.setItem("@" + codename, "false");
        await Notifications.cancelScheduledNotificationAsync(soonNotifId);
        await Notifications.cancelScheduledNotificationAsync(startNotifId);
    }
    else {
        const startTitle = "An event will start soon!";
        const startSubtitle = "Upcoming Event";
        const startBodyPostfix = " is starting soon. Open the app to see the details.";
        if(Platform.OS === "ios") {
            await Notifications.scheduleNotificationAsync({
                identifier: soonNotifId,
                content: {
                    title: startTitle,
                    subtitle: startSubtitle,
                    body: title + startBodyPostfix,
                }

            });
        }
        else if(Platform.OS === "android") {

        }
    }
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
}
