import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import {BottomTab} from './BottomNavigator';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={BottomTab} />
      <Stack.Screen
        options={({route}) => ({
          headerTitle: route.params.title,
          headerShown: true,
          headerTitleStyle: {fontSize: 15},
        })}
        name="DetailsScreen"
        component={DetailsScreen}
      />
    </Stack.Navigator>
  );
};
