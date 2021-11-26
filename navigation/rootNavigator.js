import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import BoardingStack from './boardingStack';




function RootNavigator() {
  return (
    <NavigationContainer>
        
    <BoardingStack />

    </NavigationContainer>
  );
}

export default RootNavigator