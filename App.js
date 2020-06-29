import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TouchableOpacity } from 'react-native';
import Menu from './src/Menu';
import Screen from './src/Screen';
import Setting from './src/Setting';
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from './src/redux/store';
import Font from './src/Setting/Font';
import Color from './src/Setting/Color';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                        } else if (route.name === 'excuse_me') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        }

                        // You can return any component that you like here!
                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    }
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray'
                }}>
                <Tab.Screen name="Home" component={MainStackNavigator} />
                <Tab.Screen name="excuse_me" component={Screen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function MainStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={Menu}
            />
            <Stack.Screen
                options={{ headerShown: true }}
                name="Setting"
                component={Setting}
            />
            <Stack.Screen
                options={{ headerShown: true }}
                name="Font"
                component={Font}
            />
            <Stack.Screen
                options={{ headerShown: true }}
                name="Color"
                component={Color}
                // options={{
                //     headerRight: (props) => (
                //         <TouchableOpacity style={{ marginRight: 15 }}>
                //             <Button
                //                 {...props}
                //                 onPress={(props) => console.log(props)}
                //                 title="Done"
                //             />
                //         </TouchableOpacity>
                //     )
                // }}
            />
        </Stack.Navigator>
    );
}

export default RootApp = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};
