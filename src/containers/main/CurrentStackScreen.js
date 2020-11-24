import React, {PureComponent} from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import images from './../../res/images';
import ListItem from './ListItem';
import DetailsScreen from './DetailsScreen';
import {render} from "react-native-web";
import {ActivityIndicator} from "react-native-paper";

export class CurrentScreen extends PureComponent {
    state = {
        eventsList: [],
        loading: true
    }
    async componentDidMount() {
        this.setState({eventsList: this.props.currentsList, loading:false});
    }
    renderItem(data) {
        return <ListItem item={item}/>
    }
    render() {
        if(!this.state.loading){
            return (
            <FlatList
                data={this.state.eventsList}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.title}/>
        )} else {
        return <ActivityIndicator />
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
    state = {
        eventsList: [],
    }
    async componentDidMount() {
        this.setState({eventsList: this.props.currentsList});
    }
    render() {
        return (
        <CurrentStack.Navigator
            screenOptions={{
            headerShown: false
        }}>
        <CurrentStack.Screen name="CurrentA" component={CurrentScreen} options={this.state.currentsList}/>
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
