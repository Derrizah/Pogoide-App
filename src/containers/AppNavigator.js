import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from "./main/list-screen";

const MainNavigator = createStackNavigator({ 
  Current: ListScreen, 
  Upcoming: ListScreen 
});

export default AppNavigator;