import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';




const AppStack = createStackNavigator();

import Servicos from '../scr/pages/Servicos';
import Detail from '../scr/pages/Detail';
import Login from '../scr/pages/Login'

export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Servicos" component={Servicos} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}


