import React, {PureComponent, Fragment} from 'react';
import {
    Text,
    FlatList,
    View,
    StyleSheet, Platform
} from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {ActivityIndicator, IconButton, Colors, TouchableRipple, FAB} from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/database';
import NetInfo from "@react-native-community/netinfo";
import {showMessage} from "react-native-flash-message";

import moment from "moment";
import 'moment/locale/tr';

import DetailsScreen from './DetailsScreen';
import EventItem, {PlaceholderEvent, EventItemC} from "./EventItem";
import {togglePushNotification} from "../../scripts/NotificationsHandler";
import * as Localization from "expo-localization";
import i18n from '../../scripts/LocalizationHandler'


export class CurrentScreen extends PureComponent {
    constructor(props) {
        super();
        // console.log(props.route.params.db);
        this.db = props.route.params.db;

        // const getData = async () => {
        //     try {
        //         const value = await AsyncStorage.getItem('@sort_option')
        //         this.reverse = value !== 'true';
        //     } catch(e) {
        //         // error reading value
        //     }
        // }
        // showMessage({
        //     description: this.reverse.toString(),
        //     duration: 6000,
        //     height: "60%"
        // })
        //this.events = list;
    }
    state = {
        eventsList: [],
        loading: true,
        refreshing: false,
        connection: true,
    }
    async componentDidMount() {
        // let data = [];
        // const current = this.db.ref('/currentEvents');
        // await current.once('value').then((snapshot) => {
        //     data = snapshot.val();
        // })
        // const eventsData = Object.keys(data).map(key => ({
        //     key,
        //     ...data[key]
        // }));
        // this.setState({eventsList: eventsData, loading:false});
        await AsyncStorage.getItem('@sort_option')
            .then((result) => this.reverse = result)
            .catch(err => console.log("Could not get sorting option in current screen"));
        // await this.checkConnection();
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                this.getCurrent();
            }
            else {
                const getData = async () => {
                    try {
                        const jsonValue = await AsyncStorage.getItem('@current')
                        return jsonValue != null ? JSON.parse(jsonValue) : null;
                    } catch(e) {
                        // error reading value
                    }
                }
                const dataLoaded = getData();
                this.setState({eventsList: dataLoaded});
            }
        });
        //this.setState({eventsList: this.props.currentsList, loading:false});
        this.state.eventsList.map((event) => {
            AsyncStorage.removeItem("@" + event.codename);
            AsyncStorage.removeItem("@" + event.codename + "auto");
        });
    }
    renderItem(item) {
        //return <ListItem item={item}/>
        // return <Pressable
        //             style={styles.pressable}
        //             onPress={ () => this.props.navigation.push('Details', item)}>
        //             <View style={styles.container}>
        //                 <View style={styles.nameContainer}>
        //                     <Image source={{uri:item.thumbnail}} style={styles.personImage} />
        //                     <View>
        //                         <Text style={styles.personName}>{item.title}</Text>
        //                         <Text style={styles.placeName}>{item.time}</Text>
        //                     </View>
        //                 </View>
        //             </View>
        //         </Pressable>
        this.notifications = false;
        AsyncStorage.getItem("@"+item.codename)
            .then((result) => {
                if (result === null) result = 'false';
                this.notifications = (result === 'true');
            })
            .catch(err => this.notifications = "false");

        return <TouchableRipple onPress={() => this.props.navigation.push('Details', {event: item, eventType: "current"})}
                                rippleColor="rgba(198, 39, 39, .4)"
                                underlayColor="rgba(198, 39, 39, .4)"
        >
            {/*<EventItem*/}
            {/*    event={item}*/}
            {/*    buttonIcon={icon}*/}
            {/*/>*/}
            <EventItemC
                itemType={""}
                event={item}
                notifications={this.notifications}
            />
        </TouchableRipple>
    }
    onRefresh() {
        this.setState({refreshing: true},async () => {await this.getCurrent();});
    }
    async resort() {
        this.reverse = !this.reverse;
        await AsyncStorage.setItem('@sort_option', this.reverse.toString())
            .catch(err => console.log("Error while storing sort option in current screen."));
        await this.getCurrent();
        if(this.reverse) {
            showMessage({
                message: i18n.t('list.sort_oldest_first'),
                backgroundColor: "#c62727",
            });
        }
        else {
            showMessage({
                message: i18n.t('list.sort_newest_first'),
                backgroundColor: "#c62727",
            });
        }
    }
    async checkConnection(){
        NetInfo.fetch().then(state => {
            if(state.isConnected){
               this.setState({connection: true})
            }
            else {
                this.setState({connection: false});
            }
        });
        const unsubscribe = NetInfo.addEventListener(state => {
            if(state.isConnected){
                this.setState({connection: true});
                this.getCurrent();
            }
            else{
                this.setState({connection: false});
            }
        });
    }
    async getCurrent(){
        let data = [];
        console.log("getting current");
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                this.setState({connection: true});
                console.log("connection true");
            }
            else {
                this.setState({connection: false});
                showMessage({
                    message: "connection false",
                    backgroundColor: "#ff4040",
                });
            }
        });
        if(this.state.connection) {
            const current = this.db.ref('/currentEvents');
            await current.once('value').then((snapshot) => {
                data = snapshot.val();
            })
            const eventsData = Object.keys(data).map(key => ({
                key,
                ...data[key]
            }));
            eventsData.map((event) => {
                if (event.ISO_time) {
                    if (Localization.locale.toString() === "tr-TR") {
                        moment.locale('tr');
                        event.start_tr = moment(event.start).format("dddd, DD MMMM[,] HH:mm");
                        event.end_tr = moment(event.end).format("dddd, DD MMMM[,] HH:mm");
                        if (event.start_tr === "Invalid date") {
                            event.start_tr = i18n.t('list.unknown_date');
                        }
                        if (event.end_tr === "Invalid date") {
                            event.end_tr = i18n.t('list.unknown_date');
                        }
                    }
                    moment.locale('en');
                    event.start = moment(event.start).format("dddd, MMM DD[, at] HH:mm A");
                    event.end = moment(event.end).format("dddd, MMM DD[, at] HH:mm A");
                    if(event.start === "Invalid date") {
                        event.start = i18n.t('list.unknown_date');
                    }
                    if(event.end === "Invalid date") {
                        event.end = i18n.t('list.unknown_date');
                    }
                }
            });
            if (this.reverse) {
                this.setState({eventsList: eventsData.reverse(), loading: false, refreshing: false});
            } else {
                this.setState({eventsList: eventsData, loading: false, refreshing: false});
            }
            const storeData = async (eventsData) => {
                try {
                    const jsonValue = JSON.stringify(eventsData)
                    await AsyncStorage.setItem('@current', jsonValue)
                } catch (e) {
                    console.log("Something unexpected happened while saving to storage.");
                }
            }
            await storeData(eventsData);
        }
        else {
            this.setState({connection: false});
            showMessage({
                message: "connection false",
                backgroundColor: "#ff4040",
            });
            const getData = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem('@current')
                    return jsonValue != null ? JSON.parse(jsonValue) : null;
                } catch(e) {
                    // error reading value
                    showMessage({
                        message: "error reading value",
                        backgroundColor: "#ff4040",
                    });
                }
            };
            const dataLoaded = await getData();
            showMessage({
                message: "got Data?",
                backgroundColor: "#c62727",
            });
            if (this.reverse) {
                this.setState({eventsList: dataLoaded.reverse(), loading: false, refreshing: false});
            } else {
                this.setState({eventsList: dataLoaded, loading: false, refreshing: false});
            }
        }
    }

    render() {
        if(!this.state.loading){
            return (<Fragment>
                    <FAB
                        style={{
                            position: 'absolute',
                            margin: 16,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "#c62727",
                            zIndex: 1
                        }}
                        medium
                        icon="sort"
                        onPress={async () => await this.resort()}
                    />
                    <View style={{
                        marginBottom: 12}}>
                    {
                        this.state.connection !== true &&
                        (
                            <View
                                style={{
                                    backgroundColor: '#ff4040',
                                    height: 32,
                                    flexDirection: 'row',
                                    }}
                            >
                                <IconButton disabled={false} icon='exclamation' size={24} color={Colors.white} style={{margin: -6, marginTop: -2, marginLeft: 10}}/>
                                <Text style={{marginTop: 6, marginLeft: 10, color: Colors.white}}>Internet connection is not available.</Text>
                            </View>
                        )
                    }
            <FlatList
                ItemSeparatorComponent={
                    Platform.OS !== 'android' &&
                    (({ highlighted }) => (
                        <View
                            style={[
                                highlighted && { marginLeft: 0 }
                            ]}
                        />
                    ))
                }
                data={this.state.eventsList}
                renderItem={({item}) => this.renderItem(item)}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.refreshing}
                />
                </View>
                </Fragment>
        )} else {
        return <View><PlaceholderEvent /><PlaceholderEvent /><PlaceholderEvent /></View>
        }
    }
}

//   const events = {
//       0: {
//           type: 'GO Battle League',
//           title: 'Season 5 - The Kanto Cup',
//           thumbnail: 'https://res.cloudinary.com/dzd1gzn1w/image/upload/v1606077882/Volana/branch_new4_ju3kzm.jpg',
//           time: 'Starts: Tuesday, November 17, at 12:00 AM GMT+3  Ends: Tuesday, November 24, at 12:00 AM GMT+3',
//       },
//       1: {
//           type: 'GO Battle League',
//           title: 'Season 5 - The Kanto Cup',
//           thumbnail: 'https://res.cloudinary.com/dzd1gzn1w/image/upload/v1606077882/Volana/branch_new4_ju3kzm.jpg',
//           time: 'Starts: Tuesday, November 17, at 12:00 AM GMT+3  Ends: Tuesday, November 24, at 12:00 AM GMT+3',
//       }
//   }
//   const eventsData = Object.keys(events).map(key => ({
//       key,
//       ...events[key]
//   }));
//   console.log(eventsData)
//   return (
//     <FlatList
//       data={eventsData}
//       renderItem={({ item }) => <ListItem item={item}/>}/>
//
//   );
// };

const CurrentStack = createStackNavigator();
export default class CurrentStackScreen extends PureComponent {
    constructor(props) {
        super();
        //this.db = this.context;
        //this.dbApp = props.navigation.initialParams[0];
        this.db = props.route.params.db;

    }
    state = {
        eventsList: [],
    }
    async componentDidMount() {
        //console.log(this.context);

    }
    render() {
        return (
        <CurrentStack.Navigator
            mode="modal"
            screenOptions={({ route, navigation }) => ({
                ...TransitionPresets.ModalPresentationIOS,
                cardOverlayEnabled: true,
                headerShown: false,
                gestureEnabled: true,})}>
        <CurrentStack.Screen name="CurrentA" component={CurrentScreen} initialParams={{ db: this.db}}/>
        <CurrentStack.Screen name="Details" component={DetailsScreen}/>
        </CurrentStack.Navigator>
)}};


// export default () => (
//     <NavigationContainer>
//       <CurrentStack.Navigator>
//         <CurrentStack.Screen name="CurrentList" component={CurrentScreen} options={{
//           ...palette.header,
//           headerLeft: () => (
//           <View style={styles.headerLeftContainer}>
//           <Text style={styles.headerTitle}>Go Beyond?</Text>
//           </View>
//           ),
//           headerRight: () => (
//           <View style={styles.headerRightContainer}>
//           <Text style={styles.headerRightText}>right</Text>
//           </View>
//           ),
//         }}/>
//         <CurrentStack.Screen name="Details" component={DetailsScreen} />
//       </CurrentStack.Navigator>
//     </NavigationContainer>
// )

const styles = StyleSheet.create({
    card: {marginTop: 4, marginBottom: 8, marginRight: 6, marginLeft: 6},
    headerLogo: { marginLeft: 10, height: 30, width: 80, resizeMode: 'center' },
    headerRightText: { marginRight: 10, height: 30},
});
