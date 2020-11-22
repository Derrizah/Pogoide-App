import React from 'react';
import images from './current/node_modules/res/images';
import colors from 'res/colors';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UpcomingStackScreen from './main/UpcomingStackScreen'
import CurrentStackScreen from './main/CurrentStackScreen'

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Current" component={CurrentStackScreen} />
        <Tab.Screen name="Upcoming" component={UpcomingStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


// const routeConfig = {
//   Current: CurrentNavigator,
//   Upcoming: UpcomingNavigator,
// };

// const navigatorConfig = {
//   initialRouteName: 'Current',
//   defaultNavigationOptions: ({ navigation }) => ({
//     tabBarOptions: {
//       showLabel: false,
//       showIcon: true,
//       style: { backgroundColor: colors.tabBackground },
//     },
//     tabBarIcon: ({ focused }) => {
//       const { routeName } = navigation.state;
//       let icon;
//       switch (routeName) {
//         case 'Current': icon = focused ? images.current_selected : images.current; break;
//         case 'Upcoming': icon = focused ? images.upcoming_selected : images.upcoming; break;
//         default: icon = focused ? images.current_selected : images.current; break;
//       }
//       return <Image style={{ ...palette.header.image }} source={icon} />
//     }
//   })
// }

// export default TabNavigator = createBottomTabNavigator(routeConfig, navigatorConfig);