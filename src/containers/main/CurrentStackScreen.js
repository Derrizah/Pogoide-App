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

export const CurrentScreen = ({navigation}) => {

  const events = {
      0: {
          type: 'GO Battle League',
          title: 'Season 5 - The Kanto Cup',
          thumbnail: 'https://res.cloudinary.com/dzd1gzn1w/image/upload/v1606077882/Volana/branch_new4_ju3kzm.jpg',
          time: 'Starts: Tuesday, November 17, at 12:00 AM GMT+3  Ends: Tuesday, November 24, at 12:00 AM GMT+3',
      },
      1: {
          type: 'GO Battle League',
          title: 'Season 5 - The Kanto Cup',
          thumbnail: 'https://res.cloudinary.com/dzd1gzn1w/image/upload/v1606077882/Volana/branch_new4_ju3kzm.jpg',
          time: 'Starts: Tuesday, November 17, at 12:00 AM GMT+3  Ends: Tuesday, November 24, at 12:00 AM GMT+3',
      }
  }
  const eventsData = Object.keys(events).map(key => ({
      key,
      ...events[key]
  }));
  console.log(eventsData)
  return (
    <FlatList
      data={eventsData}
      renderItem={({ item }) => <ListItem item={item}/>}/>

  );
};

const CurrentStack = createStackNavigator();
const CurrentStackScreen = () => (
    <CurrentStack.Navigator
        screenOptions={{
          headerShown: false
        }}>
      <CurrentStack.Screen name="CurrentA" component={CurrentScreen} />
    </CurrentStack.Navigator>
);
export default CurrentStackScreen;

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
