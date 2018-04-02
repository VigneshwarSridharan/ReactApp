import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { TabNavigator } from 'react-navigation'; // Version can be specified in package.json

import Moment from 'react-moment';
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Fare Details!</Text>
      </View>
    );
  }
}

class FirstScreen extends React.Component {
  constructor(props) {
    super(props)
    const params = this.props.screenProps;
    this.state = {
      airline: params.airlineCode,
      airports: params.airportCode,
    }
  }
  render() {
    const params = this.props.screenProps;
    return (
      <View style={{ justifyContent: 'space-between', flex: 1, }}>
        <View style={styles.container}>
          <View style={{ padding: 15 }}>
            <View style={{ height: 50, alignItems: 'center', flexDirection: 'row', padding: 10, backgroundColor: '#e67e22' }}>
              <Text style={{ flex: 1, color: '#ffffff' }}>Depart</Text>
              <Text style={{ flex: 1, color: '#ffffff' }}>Arrive</Text>
              <Text style={{ flex: 1, color: '#ffffff' }}>Duration</Text>
            </View>
            <ScrollView>
              {params.itin_flights.map((trips, inx) => {
                var tdairport_code = trips.itin_segs[0].depart_airport;
                var tdairport = this.state.airports[tdairport_code].split('|');
                var stage = trips.itin_segs.length;
                var taairport_code = trips.itin_segs[stage - 1].arrival_airport;
                var taairport = this.state.airports[taairport_code].split('|');
                return (
                  <View key={inx}>
                    <Text style={{fontSize:18, marginBottom: 15}}>{tdairport[2]} - {taairport[2]}</Text>
                    {trips.itin_segs.map((seg, i) => {
                      var dairport_code = seg.depart_airport;
                      var dairport = this.state.airports[dairport_code].split('|');
                      var ddate = new Date(seg.departure_datetime);
                      var stage = trips.itin_segs.length;
                      var aairport_code = seg.arrival_airport;
                      var aairport = this.state.airports[aairport_code].split('|');
                      var adate = new Date(seg.arrival_datetime);
                      var air_code = seg.marketing_airline;
                      var duration = Number(seg.travel_time);
                      duration = duration.toFixed(2);
                      duration = {
                        day: duration/24,
                        hrs: Number((duration%24).toString().split('.')[0]),
                        min: Number(duration.toString().split('.')[1])
                      }
                      return (
                        <View key={i + "1"} style={styles.card}>
                          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                            <View style={{ flex: 1 }}>
                              <Text>
                                <Moment element={Text} format="h:mm A">{ddate}</Moment>
                              </Text>
                              <Text>{dairport[1]}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text>
                                <Moment element={Text} format="h:mm A">{adate}</Moment>
                              </Text>
                              <Text>{aairport[1]}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text>{duration.day < 0 ? duration.day = 'D ' : ''}{duration.hrs}H {duration.min}M  </Text>
                            </View>
                          </View>
                          <View style={{ borderBottomWidth: 1, borderColor: '#ededed' }}></View>
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                              <Image
                                source={{
                                  uri: 'http://pics.avs.io/100/50/' +
                                    air_code +
                                    '.png',
                                }}
                                style={{ width: 100, height: 50 }}
                              />
                            </View>
                            <View>
                              <Text>Flight Number: {seg.operating_airline}-{seg.operating_flight}</Text>
                            </View>
                          </View>
                        </View>
                      );
                    })
                    }
                  </View>

                )
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}


export default class itin extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params.title ? params.title : 'Flight Details',
    }
  };
  render() {
    const { params } = this.props.navigation.state;
    const RootStack = TabNavigator({
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
    }, {
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
    return (
      <View style={styles.container}>
        <RootStack screenProps={params.data} />
        <TouchableOpacity 
          onPress={() => {
            this.props.navigation.navigate('PassengerDetailsScreen', {
                title: 'Passenger Details',
                data: params.data
            });
          }}
        >
          <View style={styles.fixedBtn}>
            <Text style={{ fontSize: 24, color: '#fff', }} >BOOK NOW</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',

  },
  card: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
    // borderColor: '#cccccc',
    // borderWidth: 1
  },
  btn: {
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#e67e22',
    color: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  fixedBtn: {
    backgroundColor: '#e67e22',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});