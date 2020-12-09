import React, {PureComponent} from 'react';
import {
    Text,
    FlatList,
    View,
    StyleSheet,
    Image,
    TouchableOpacity, Pressable, AsyncStorage
} from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import images from './../../res/images';
import ListItem from './ListItem';
import DetailsScreen from './DetailsScreen';
import {render} from "react-native-web";
import {ActivityIndicator, IconButton, Colors, TouchableRipple} from "react-native-paper";
import firebase from 'firebase/app';
import 'firebase/database';
import {Platform} from "react-native-web";
import NetInfo from "@react-native-community/netinfo";
import EventItem, {PlaceholderEvent} from "./EventItem";

export class CurrentScreen extends PureComponent {
    constructor(props) {
        super();
        console.log(props.route.params.db);
        this.db = props.route.params.db;
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
        await this.checkConnection();
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
                this.setState({eventsList: dataLoaded})
            }
        });
        console.log(data);
        //this.setState({eventsList: this.props.currentsList, loading:false});
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
        return <TouchableRipple onPress={() => this.props.navigation.push('Details', {event: item})}
                                rippleColor="rgba(0, 22.75, 43.92, .6)"
                                underlayColor="rgba(0, 22.75, 43.92, .6)"
        >
            <EventItem
                event={item}
        />
        </TouchableRipple>
    }
    onRefresh() {
        this.setState({refreshing: true},() => {this.getCurrent();});
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
        const current = this.db.ref('/currentEvents');
        await current.once('value').then((snapshot) => {
            data = snapshot.val();
        })
        const eventsData = Object.keys(data).map(key => ({
            key,
            ...data[key]
        }));
        this.setState({eventsList: eventsData, loading: false, refreshing: false});
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
    render() {
        if(!this.state.loading){
            return (<View>
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
        )} else {
        return <View><PlaceholderEvent /><PlaceholderEvent /><PlaceholderEvent /></View>
        }
    }
};

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
