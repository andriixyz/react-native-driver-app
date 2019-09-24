import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import { Alert } from "react-native";
import ChatScreen from "./src/Screens/ChatScreen/ChatScreen";
import OrderScreen from "./src/Screens/OrderScreen/OrderScreen";
import MenuScreen from "./src/Screens/MenuScreen/MenuScreen";
import ProfileScreen from "./src/Screens/ProfileScreen/ProfileScreen";
import LoginScreen from "./src/Screens/LoginScreen/LoginScreen";
import ChatMessagesScreen from "./src/Screens/ChatMessagesScreen/ChatMessagesScreen";

const MainNavigator = createDrawerNavigator({
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
  Chat: { screen: ChatScreen },
  Order: { screen: OrderScreen },
  Menu: { screen: MenuScreen },
  ChatMessages: { screen: ChatMessagesScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
