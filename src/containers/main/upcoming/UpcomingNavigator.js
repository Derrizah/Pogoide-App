import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import images from 'res/images';
import palette from 'res/palette';
import UpcomingScreen from './UpcomingScreen';


const UpcomingNavigator = createStackNavigator({
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

export default UpcomingNavigator;