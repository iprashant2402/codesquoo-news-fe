import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//SCREENS IMPORT
import HomeScreen from '../views/app/HomeScreen';
import NewsScreen from '../views/app/NewsScreen';
import NewsDetailScreen from '../views/app/NewsDetailScreen';

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
      </Stack.Navigator>
    );
}