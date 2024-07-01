import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { GameHistoryNavigator } from './src/navigation/GameHistoryNavigator';
import { NewGameNavigator } from './src/navigation/NewGameNavigator';
import { ItemProvider } from './src/contexts/ItemContext';
import HomeScreen from './src/screens/HomeScreen';
import HelpScreen from './src/screens/HelpScreen';

// Below code required independent research, to create a nested navigator, i.e., a stack navigator for a screen indexed by the tab navigator
const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <ItemProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home' screenOptions={{tabBarLabelStyle: {fontSize:12}}}>
            <Tab.Screen name='Home' component={HomeScreen} options={{ title: 'Home', tabBarLabel: 'Home', tabBarIcon: () => (<MaterialIcons name='home' size={40} color='black' />) }} />
            <Tab.Screen name='GameHistory' component={GameHistoryNavigator} options={{ headerShown: false, title: 'Game History', tabBarLabel: 'Game History', tabBarIcon: () => (<AntDesign name='bars' size={40} color='black' />)}} />
            <Tab.Screen name='NewGame' component={NewGameNavigator} options={{ headerShown: false, title: 'New Game', tabBarLabel: 'New Game', tabBarIcon: () => (<AntDesign name='plus' size={40} color='black' />)}} />
            <Tab.Screen name='Help' component={HelpScreen} options={{ title: 'Help', tabBarLabel: 'Help', tabBarIcon: () => (<Entypo name='help' size={30} color='black' />)}} />
          </Tab.Navigator>
      </NavigationContainer>
    </ItemProvider>
  );
};

export default App;