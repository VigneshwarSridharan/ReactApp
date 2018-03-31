import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation'; // Version can be specified in package.json

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class FirstScreen extends React.Component {
  render() {
    const  params = this.props.screenProps;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>First! {params.air_itinerary_id} </Text>
      </View>
    );
  }
}


export default class itin extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params ? params.title : 'Flight Details',
    }
  };
  render() {
    const {params} = this.props.navigation.state;
    const RootStack =  TabNavigator({
      First: { 
        screen: FirstScreen,
        navigationOptions: {
          title: 'Flight Details'
        }
      },
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          title: 'Fare Details'
        } 
      }
    },{
      initialRouteName: 'Home',
        tabBarOptions: {
          activeTintColor: '#e67e22',
          inactiveTintColor: '#333333',
          labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
          style: {
            backgroundColor: '#ededed',
          },
          indicatorStyle: {
            backgroundColor: '#e67e22'
          }
        },
    });
    return <RootStack screenProps={params.data} />;
  }
}