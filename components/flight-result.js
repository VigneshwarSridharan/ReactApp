import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity
} from 'react-native';

// import { StackNavigator } from 'react-navigation';

import Moment from 'react-moment';
// import { Constants } from 'expo';

// or any pure javascript modules available in npm
// import { Card } from 'react-native-elements'; // Version can be specified in package.json

export default class FlightResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airline: {
        load: false,
      },
      airports: {
        load: false,
      },
      result: [],
      message: 'Wait a moment'
    };
    this.searchId = '';
    this._loadReult();
  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params.title ? params.title : 'Flight Result',
    };
  };
  _loadReult() {
    const { params } = this.props.navigation.state;
    
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    const json = params.json ? params.json : 'http://otpdev.wintlt.com/dev/team/vignesh/search-layout-a5/assets/maa-yyz.json';
    
    fetch(
      'http://otpdev.wintlt.com/dev/team/vignesh/search-layout-a5/assets/airlines.json',{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    ).then(res => {
        this.setState({
          airline: res,
        });
      });
    fetch(
      'http://otpdev.wintlt.com/dev/team/vignesh/search-layout-a5/assets/airportcitycode.json'
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          airports: res,
        });
      });
    // http://otpdev.wintlt.com/dev/team/vignesh/search-layout-a5/assets/maa-del-yyz-lon-sin.json multi cicy
    // http://otpdev.wintlt.com/dev/team/vignesh/search-layout-a5/assets/maa-yyz.json round trip
    // fetch('http://otpdev.wintlt.com/dev/team/vignesh/search-layout-a5/assets/maa-del.json').then(res => res.json())
    //   .then(res => {
    //     var result = res.itineraries;
    //     this.searchId = res.response_id;
    //     this.setState({
    //       result: result,
    //     });
    //   });


    var url = Object.keys(params).map(function(key) {
      return key + '=' + params[key];
    }).join('&');
    fetch('http://otpdev.wintlt.com/dev/team/vignesh/flight/public/api/flight?'+url).then(res => res.json()).then(res => {
      if(res.error_messages) {
        this.setState({message: res.error_messages.messages})
        return;
      }
      if(res[0].error_messages.gds_response == 'error') {
        this.setState({message: 'Invalid airport code, Go back'});
        return;
      }
      var result = res[0].itineraries ? res[0].itineraries: [];
      this.props.navigation.setParams({ title: this.state.airports[res[0].seg0_origin].split('|')[2] + ' - ' + this.state.airports[res[0].seg0_dest].split('|')[2] });
      this.searchId = res[0].response_id;
      // Alert.alert(res[0].response_id)
        this.setState({
          result: result,
        });
    });
  }
  render() {
    if ( this.state.result.length && !this.state.airports.hasOwnProperty('load') && !this.state.airline.hasOwnProperty('load') ) {
      return (
        <View style={styles.container}>
          <StatusBar
              backgroundColor="#e67e22"
          />
          <View style={{ padding: 15 }}>
              <View style={{ height:50, alignItems: 'center', flexDirection: 'row', padding: 10, backgroundColor: '#e67e22' }}>
                <Text style={{ flex: 1, color: '#ffffff' }}>Depart</Text>
                <Text style={{ flex: 1, color: '#ffffff' }}>Arrive</Text>
                <Text style={{ flex: 1, color: '#ffffff' }}>Duration</Text>
              </View>
            <ScrollView>
            {this.state.result.map(itin => {
              var air_code = itin.validating_carrier;
              var fare = itin.avg_fare;
              return (
                <TouchableOpacity
                          key={itin.air_itinerary_id}  
                          onPress={() => {
                            itin.searchId = this.searchId;
                            itin.airportCode = this.state.airports;
                            itin.airlineCode = this.state.airline;
                            this.props.navigation.navigate('ItinDetailsScreen', {
                                title: 'Flight Details',
                                data: itin
                            });
                        }}
                      >
                  <View style={styles.card}>
                    {itin.itin_flights.map((trips, inx) => {
                      var dairport_code = trips.itin_segs[0].depart_airport;
                      var dairport = this.state.airports[dairport_code].split(
                        '|'
                      );
                      var ddate = new Date(trips.itin_segs[0].departure_datetime);
                      var stage = trips.itin_segs.length;
                      var aairport_code =
                        trips.itin_segs[stage - 1].arrival_airport;
                      var aairport = this.state.airports[aairport_code].split(
                        '|'
                      );
                      var adate = new Date(
                        trips.itin_segs[stage - 1].arrival_datetime
                      );
                      var stop = trips.total_stops ? trips.total_stops : 'Non';
                      var duration = 0;
                      trips.itin_segs.map( (seg, i) => {
                        duration = duration + Number(seg.travel_time);
                      } )
                      duration = duration.toFixed(2);
                      duration = {
                        day: duration/24,
                        hrs: Number((duration%24).toString().split('.')[0]),
                        min: Number(duration.toString().split('.')[1])
                      }
                      return (
                        <View key={inx}>
                          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                              <View style={{ flex: 1 }}>
                              <Text>
                                <Moment element={Text} format="h:mm A">{ ddate }</Moment>
                              </Text>
                              <Text>{dairport[2]}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text>
                                <Moment element={Text} format="h:mm A">{ adate }</Moment>
                              </Text>
                              <Text>{aairport[2]}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text>{stop}-Stop</Text>
                              <Text>{duration.day < 0 ? duration.day = 'D ' : ''}{duration.hrs}H {duration.min}M  </Text>
                            </View>
                          </View>
                          <View style={{ borderBottomWidth:1, borderColor: '#ededed' }}></View>
                        </View>
                      );
                    })}
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
                          <Text style={styles.btn}>C$ { fare }</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
          <Text>{this.state.message}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 24,
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
    padding:10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#e67e22',
    color: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    fontWeight: 'bold',
  },
});
