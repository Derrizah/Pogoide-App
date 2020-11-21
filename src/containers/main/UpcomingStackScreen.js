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
import images from 'res/images';
import palette from 'res/palette';
import ListItem from './ListItem';
import DetailsScreen from './DetailsScreen';

const UpcomingScreen = () => {
  const events = {
    type: 'GO Battle League',
    title: 'Season 5 - The Kanto Cup',
    thumbnail: 'https://www.leekduck.com/assets/img/events/gobattleleague-season1.jpg',
    time: 'Starts: Tuesday, November 17, at 12:00 AM GMT+3  Ends: Tuesday, November 24, at 12:00 AM GMT+3',    
  }
  return (
    <FlatList
      data={events}
      renderItem={({ item }) => <ListItem event={item}/>}/>
  );
}

const UpcomingStack = createStackNavigator({
  Upcoming: {
    screen: UpcomingScreen,
    navigationOptions: ({ navigation }) => ({
      ...palette.header,
      headerTitle: '',
      headerLeft: () => (
        <View style={styles.headerLeftContainer}>
            <Text style={styles.headerTitle}>Go Beyond?</Text>        
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <Text style={styles.headerRightText}>right</Text>
        </View>
      ),
    })
  }
});

const styles = StyleSheet.create({
  headerLeftContainer: { ...palette.header.headerLeftContainer },
  headerLeftImage: {...palette.header.image},
  headerRightContainer: { ...palette.header.headerRightContainer },
  headerRightImage1: {...palette.header.image},
  headerRightImage2: {...palette.header.image, marginLeft: 20},
  headerLogo: { marginLeft: 10, height: 30, width: 80, resizeMode: 'center' },
});

export default function UpcomingStackScreen() {
  return (
    <UpcomingStack.Navigator>
      <UpcomingStack.Screen name="Main" component={UpcomingScreen} />
      <UpcomingStack.Screen name="Details" component={DetailsScreen} />
    </UpcomingStack.Navigator>
  )
}