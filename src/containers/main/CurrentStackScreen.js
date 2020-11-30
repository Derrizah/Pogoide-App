import React, {PureComponent} from 'react';
import {
    Text,
    FlatList,
    View,
    StyleSheet,
    Image,
    TouchableOpacity, Pressable
} from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import images from './../../res/images';
import ListItem from './ListItem';
import DetailsScreen from './DetailsScreen';
import {render} from "react-native-web";
import {ActivityIndicator} from "react-native-paper";
import firebase from 'firebase/app';
import 'firebase/database';
import {Platform} from "react-native-web";
import {Card, theme} from 'galio-framework';
import CardItem from "./CardItem";
import PlaceholderCard from "./PlaceholderCard";
import PlaceholderItem from "./PlaceholderItem";

export class CurrentScreen extends PureComponent {
    constructor(props) {
        super();
        console.log(props.route.params.db);
        this.db = props.route.params.db;
        //this.events = list;
    }
    state = {
        eventsList: [],
        loading: true
    }
    async componentDidMount() {
        let data = [];
        const current = this.db.ref('/currentEvents');
        await current.once('value').then((snapshot) => {
            data = snapshot.val();
        })
        const eventsData = Object.keys(data).map(key => ({
            key,
            ...data[key]
        }));
        this.setState({eventsList: eventsData, loading:false});
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
        return <TouchableOpacity onPress={() => this.props.navigation.push('Details', {event: item})}>
            <CardItem
            flex
            borderless
            safe
            style={styles.card}
            title={item.title}
            caption={item.time}
            location={item.type}
            imageBlockStyle={{padding: theme.SIZES.BASE / 2}}
            image={item.thumbnail}
        />
        </TouchableOpacity>
    }
    render() {
        if(!this.state.loading){
            return (
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
                />
        )} else {
        return <PlaceholderItem />
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
  headerLogo: { marginLeft: 10, height: 30, width: 80, resizeMode: 'center' },
  headerRightText: { marginRight: 10, height: 30},
});
