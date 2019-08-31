import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Home from "./src/screens/Home";
import PhotoScreen from "./src/screens/PhotoScreen";

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  PhotoScreen: {
    screen: PhotoScreen
  }
},
  {
    defaultNavigationOptions: {
      headerTintColor: "#FFF",
      headerStyle: {
        backgroundColor: "#ba3227"
      },
      headerTitleStyle : {
        color: "#FFF"
      }
    }
  }
);

const App = createAppContainer(AppNavigator);
export default App;

