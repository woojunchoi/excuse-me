import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Menu from './src/Menu'
import Screen from './src/Screen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from './src/redux/store';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'ios-list-box' : 'ios-list';

            } else if (route.name === '날봐요') {
              iconName = focused ? 'ios-information-circle'
                : 'ios-information-circle-outline';
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
        <Tab.Screen name="Home" component={Menu} />
        <Tab.Screen name="날봐요" component={Screen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default RootApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}