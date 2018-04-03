import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import HomeScreen from './components/home-screen';
import FlightResult from './components/flight-result';
import ItinDetails from './components/itin-details';
import PassengerDetails from './components/passenger-details';
import BookingPage from './components/booking-page';

const StackScreens = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Result: {
      screen: FlightResult,
    },
    ItinDetailsScreen: {
      screen: ItinDetails,
    },
    PassengerDetailsScreen: {
      screen: PassengerDetails,
    },
    BookingPageScreen: {
      screen: BookingPage,
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerRight: (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
          <Image source={require('./assets/images/ca.png')} style={{ height: 32, width: 32, marginRight: 10 }} />
          <Text style={{ color: '#ffffff', fontSize: 20 }}>CAD</Text>
        </View>

      ),
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

const RootStack = DrawerNavigator({
  Flights: {
    screen: StackScreens,
    navigationOptions: {
      title: 'Flights'
    }
  }
}, {
  contentOptions: {
    activeTintColor : '#e67e22',
    labelStyle : {
      fontSize: 18
    }
  }
});

export default class App extends Component {
  render() {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
      </View>
    );
  
    return <RootStack />
  }
}