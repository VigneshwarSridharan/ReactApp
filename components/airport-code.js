import React, { Component } from 'react';

import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class AirportCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: []
        }
    }
    static navigationOptions = {
        headerLeft: (
            <TouchableOpacity activeOpacity={0.9}>
                <Icon name="md-menu" color="#ffffff" style={{ marginLeft: 15 }} size={32} />
            </TouchableOpacity>
        ),
        headerTitle: (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/images/trip_zumi_logo_full.png')} style={{ width: 37, height: 32, marginRight: 10 }} />
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ffffff' }}>TripZumi</Text>
            </View>
        ),
        headerRight: (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                <Image source={require('../assets/images/ca.png')} style={{ height: 32, width: 32, marginRight: 10 }} />
                <Text style={{ fontSize: 20, color: '#ffffff' }}>CAD</Text>
            </View>

        ),
    };
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity activeOpacity={1} onPress={() => { this.search.focus() }}>
                        <View style={styles.searchBtn}>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#ccc"
                                    selectionColor="#e67e22"
                                    placeholder="Search Here"
                                    style={{ color: '#333', fontSize: 18 }}
                                    ref={(input) => this.search = input}
                                    autoFocus={true}
                                    onChangeText={(text) => {
                                        if (text.length >= 3) {
                                            fetch('http://otpdev.wintlt.com/dev/team/vignesh/flight/public/api/getairports?q[term]=' + text).then(res => res.json()).then(res => {
                                                this.setState({
                                                    searchResult: res,
                                                })
                                            });
                                        }

                                    }}
                                />
                            </View>
                            <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name="md-search" color="#808080" size={30} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <ScrollView>
                        {this.state.searchResult.map((air, inx) => {
                            return (
                                <TouchableOpacity activeOpacity={1} key={inx} style={styles.airItems} onPress={()=>{
                                    air.select = params.select;
                                    this.props.navigation.goBack();
                                    params.selectAirport(air);
                                }}>
                                        <View style={{flex: 1}}>
                                            <Text style={{fontSize: 16 ,color: "#333"}}>{air.value}</Text>
                                            <Text>{air.airport_name}</Text>
                                        </View>
                                        <View style={{width:40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                                            <Image
                                                source={{
                                                    uri: 'http://www.countryflags.io/' + air.country_code + '/flat/32.png',
                                                }}
                                                style={{ width: 32, height: 32 }}
                                            />
                                        </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 24,
        backgroundColor: '#ededed',
    },
    searchBtn: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    airItems: {
        borderTopColor: '#eee',
        borderTopWidth: 1,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
});