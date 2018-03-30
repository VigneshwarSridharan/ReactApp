import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './components/home-screen';
import FlightResult from './components/flight-result';
import ItinDetails from './components/itin-details';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Result: {
      screen: FlightResult,
    },
    ItinDetailsScreen: {
      screen: ItinDetails,
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#e67e22',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends Component {
  render() {
    return <RootStack />
  }
}