import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import images from './current/node_modules/res/images';
import colors from 'res/colors';
import palette from './current/node_modules/res/palette';
import ListScreen from './current/CurrentScreen';
import CurrentNavigator from './current/CurrentNavigator';

const routeConfig = {
  Current: CurrentNavigator,
  Upcoming: UpcomingNavigator,
};

const navigatorConfig = {
  initialRouteName: 'Current',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style: { backgroundColor: colors.tabBackground },
    },
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let icon;
      switch (routeName) {
        case 'Current': icon = focused ? images.current_selected : images.current; break;
        case 'Upcoming': icon = focused ? images.upcoming_selected : images.upcoming; break;
        default: icon = focused ? images.current_selected : images.current; break;
      }
      return <Image style={{ ...palette.header.image }} source={icon} />
    }
  })
}

export default TabNavigator = createBottomTabNavigator(routeConfig, navigatorConfig);