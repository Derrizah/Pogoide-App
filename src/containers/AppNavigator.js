import { createStackNavigator } from '@react-navigation/stack';
import CurrentScreen from "./main/CurrentStackScreen";
import UpcomingScreen from "./main/UpcomingStackScreen";

const MainNavigator = createStackNavigator({ 
  Current: CurrentScreen, 
  Upcoming: UpcomingScreen 
});

export default AppNavigator;