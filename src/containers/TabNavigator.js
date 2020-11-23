import React from 'react';
import colors from './../res/colors';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UpcomingStackScreen from './main/UpcomingStackScreen'
import CurrentStackScreen from './main/CurrentStackScreen'
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {StyleSheet, Text, View} from "react-native";
import palette from "../res/palette";
import createStackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";

const RootTab = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const TabStack = () => (
    <Tab.Navigator
        options={{
            ...palette.header,
            headerLeft: () => (
                <View style={headerLeftContainer}>
                    <Text style={styles.headerTitle}>Go Beyond?</Text>
                </View>
            ),
            headerRight: () => (
                <View style={styles.headerRightContainer}>
                    <Text style={styles.headerRightText}>right</Text>
                </View>
            ),
        }}
        tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }}
    >
        <Tab.Screen name="Current" component={CurrentStackScreen} />
        <Tab.Screen name="Upcoming" component={UpcomingStackScreen} />
    </Tab.Navigator>
)

export default function TabNavigator() {
    return (
        <NavigationContainer>
            <RootTab.Navigator>
                <RootTab.Screen name="HeaderTitle" component={TabStack} />
            </RootTab.Navigator>
        </NavigationContainer>
    );
}


// export default function TabNavigator() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//           options={{
//               ...palette.header,
//               headerLeft: () => (
//                   <View style={styles.headerLeftContainer}>
//                       <Text style={styles.headerTitle}>Go Beyond?</Text>
//                   </View>
//               ),
//               headerRight: () => (
//                   <View style={styles.headerRightContainer}>
//                       <Text style={styles.headerRightText}>right</Text>
//                   </View>
//               ),
//           }}
//         screenOptions={({ route }) => ({
//             ...palette.header,
//             headerLeft: () => (
//                 <View style={styles.headerLeftContainer}>
//                     <Text style={styles.headerTitle}>Go Beyond?</Text>
//                 </View>
//             ),
//             headerRight: () => (
//                 <View style={styles.headerRightContainer}>
//                     <Text style={styles.headerRightText}>right</Text>
//                 </View>
//             ),
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//
//             if (route.name === 'Home') {
//               iconName = focused
//                 ? 'ios-information-circle'
//                 : 'ios-information-circle-outline';
//             } else if (route.name === 'Settings') {
//               iconName = focused ? 'ios-list-box' : 'ios-list';
//             }
//
//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'tomato',
//           inactiveTintColor: 'gray',
//         }}
//       >
//         <Tab.Screen name="CurrentT" component={CurrentStackScreen} />
//         <Tab.Screen name="Upcoming" component={UpcomingStackScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
    headerLeftContainer: {...palette.header.headerLeftContainer},
    headerLogo: { marginLeft: 10, height: 30, width: 80, resizeMode: 'center' },
    headerRightText: { marginRight: 10, height: 30},
});


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