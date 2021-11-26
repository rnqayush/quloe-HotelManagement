/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from "react-redux";
import store from "./container/redux/store";

import {

  StyleSheet,
 
} from 'react-native';


import RootNavigator from './navigation/rootNavigator';


const App= () => {
  
  return (
    <Provider store={store}>
    
    <RootNavigator  />
    </Provider>
  );
};



export default App;
