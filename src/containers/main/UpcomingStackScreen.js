import React from 'react';
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
import {NavigationContainer} from "@react-navigation/native";
import {CurrentScreen} from "./CurrentStackScreen";

export const UpcomingScreen = () => {
  const events = {
    type: 'GO Battle League',
    title: 'Season 5 - The Kanto Cup',
    thumbnail: 'https://www.leekduck.com/assets/img/events/gobattleleague-season1.jpg',
    time: 'Starts: Tuesday, November 17, at 12:00 AM GMT+3  Ends: Tuesday, November 24, at 12:00 AM GMT+3',    
  }
  return (
    // <FlatList
    //   data={events}
    //   renderItem={({ item }) => <ListItem event={item}/>}/>
      <Text>upcomngstackscreen</Text>
  );
}

const UpcomingStack = createStackNavigator();
const UpcomingStackScreen = () => (
    <UpcomingStack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <UpcomingStack.Screen name="UpcomingList" component={UpcomingScreen} />
    </UpcomingStack.Navigator>
);

export default UpcomingStackScreen;

const styles = StyleSheet.create({
  headerLogo: { marginLeft: 10, height: 30, width: 80, resizeMode: 'center' },
});
