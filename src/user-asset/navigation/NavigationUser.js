
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screen/Login';
import Register from '../screen/Register';
import SayHello from '../screen/SayHello';

const Stack = createStackNavigator();


const NavigationUser = () => {
    return (
        <Stack.Navigator initialRouteName='hello' screenOptions={{headerShown: false}}>
            <Stack.Screen name='hello' component={SayHello}/>
            <Stack.Screen name='login' component={Login}/>
            <Stack.Screen name='register' component={Register}/>
        </Stack.Navigator>
    )
}

export default NavigationUser