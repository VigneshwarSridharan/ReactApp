import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Picker, TextInput, Alert, Keyboard, ActivityIndicator } from 'react-native';

import moment from 'moment';

import DatePicker from 'react-native-datepicker'

import Icon from 'react-native-vector-icons/Ionicons';

export default class BookingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: {
                load: false
            },
        }
    }
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params.title ? params.title : 'Flight Details',
        }
    };
    componentDidMount() {
        const { params } = this.props.navigation.state;
        var req = params.data;
        var dob = moment(req.pax_bod, 'DD/MM/YYYY');
        var today = moment();
        var age = Math.abs(dob.diff(today, 'year'));
        req.pax_bod = dob.format('YYYY-MM-DD');
        if (req.title == "Mr" || req.title == 'Mrs') { req.gender = 'M' }
        else if (req.title == "Ms" || req.title == 'Miss') { req.gender = 'F' }
        req.age = age;
        req.itinId = params.itin.air_itinerary_id;
        req.searchId = params.itin.searchId;
        var url = Object.keys(req).map(function (key) {
            return key + '=' + req[key];
        }).join('&');
        fetch('http://otpdev.wintlt.com/dev/team/vignesh/flight/public/api/flightbooking?' + url).then(res => res.json()).then(res => {
            this.setState({ result: res });
            this.props.navigation.setParams({ title: 'Booking ' + res.Booking_Response });
        });
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                {(() => {
                    if (!this.state.result.hasOwnProperty('load')) {
                        if (this.state.result.Booking_Response == 'Success') {
                            return (
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon
                                        style={{marginBottom: 30}}
                                        name="ios-plane"
                                        size={100}
                                        color="#cccccc"
                                    />
                                    <Text style={{ fontSize: 32, color: '#2ecc71', marginBottom: 10 }}>Booking Success</Text>
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>PNR NO: {this.state.result.pnr_no} </Text>
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>BOOKING ID: {this.state.result.booking_id} </Text>
                                </View>

                            )
                        }
                        else {
                            return (
                                <View>
                                    <Text style={{ fontSize: 24 }}>Booking Fail Sorry</Text>
                                </View>

                            )
                        }

                    }
                    else {
                        return (
                            <View>
                                <ActivityIndicator size="large" />
                                <Text>Wait a moment</Text>
                            </View>
                        )
                    }
                })()}
            </View>
        )
    }
}