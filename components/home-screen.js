import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

import DatePicker from 'react-native-datepicker'

import Icon from 'react-native-vector-icons/Ionicons';

import { StackNavigator } from 'react-navigation';

import moment from 'moment';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            tripType: 'return',
            depDate: moment().format('DD/MM/YYYY'),
            returnDate: moment().format('DD/MM/YYYY')
        }
    }
    static navigationOptions = {
        title: 'TripZumi',
    }; 
    render() {
        return (
            // <ImageBackground source={ require('../assets/images/bg.jpg') } >
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor="#e67e22"
                    />
                    <View style={styles.switchWrapper}>
                        <TouchableOpacity activeOpacity={1} onPress={() => { this.setState({ tripType: 'oneway' }) }} style={(this.state.tripType == 'oneway') ? styles.switchActive : styles.switchItem }>
                            <Text style={(this.state.tripType == 'oneway') ? styles.switchActiveText : styles.switchText}>One Way</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => { this.setState({ tripType: 'return' }) }} style={(this.state.tripType == 'return') ? styles.switchActive : styles.switchItem }>
                            <Text style={(this.state.tripType == 'return') ? styles.switchActiveText : styles.switchText}>Return</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginBottom: 30 }}>
                        <View style={{ flex:1 }} >
                            <Text style={{ color: '#e67e22', fontSize: 18 }}>From:</Text>
                            <TextInput
                                underlineColorAndroid = "transparent"
                                placeholderTextColor = "#e67e22"
                                selectionColor= "#e67e22"
                                style={{  borderBottomColor: '#ccc', borderBottomWidth: 1,color: '#333', fontSize: 24 }}
                            />
                        </View>
                        <View style={{ padding:10 }}>
                            <Icon
                                name='ios-swap'
                                size={32}
                                color='#cccccc'
                            />
                        </View>
                        <View style={{ flex:1 }} >
                            <Text style={{ color: '#e67e22', fontSize: 18 }}>To:</Text>
                            <TextInput 
                                underlineColorAndroid = "transparent"
                                placeholderTextColor = "#e67e22"
                                selectionColor= "#e67e22"
                                style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, color: '#333', fontSize: 24 }}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={{ color: '#e67e22', fontSize: 18 }}>Departure:</Text>
                        <View style={{ flexDirection: 'row',alignItems: 'center', borderBottomWidth:1, borderBottomColor: '#cccccc' }}>
                            <View style={{ flex:1 }}>
                            <DatePicker
                                style={{width: 200, justifyContent: 'flex-start',}}
                                date={this.state.depDate}
                                mode="date"
                                placeholder="select date"
                                format="DD/MMM/YYYY"
                                minDate={moment().format('DD/MMM/YYYY')}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                customStyles={{
                                dateInput: {
                                    marginLeft:0,
                                    borderColor: 'transparent',
                                    paddingTop: 10,
                                },
                                dateText: {
                                    width: 200,
                                    fontSize: 24,
                                    color:'#333',
                                    textAlign: 'left'
                                }
                                }}
                                onDateChange={(date) => {this.setState({depDate: date})}}
                            />
                            </View>
                            <View>
                                <Icon
                                    name='ios-calendar-outline'
                                    size={32}
                                    color='#cccccc'
                                />
                            </View>
                        </View>
                    </View>
                    { ( () => {
                        if(this.state.tripType=='return') {
                            return (
                                <View style={{ marginBottom: 30 }}>
                                    <Text style={{ color: '#e67e22', fontSize: 18 }}>Departure:</Text>
                                    <View style={{ flexDirection: 'row',alignItems: 'center', borderBottomWidth:1, borderBottomColor: '#cccccc' }}>
                                        <View style={{ flex:1 }}>
                                        <DatePicker
                                            style={{width: 200, justifyContent: 'flex-start',}}
                                            date={this.state.returnDate}
                                            mode="date"
                                            placeholder="select date"
                                            format="DD/MMM/YYYY"
                                            minDate={this.setState.depDate}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            showIcon={false}
                                            customStyles={{
                                            dateInput: {
                                                marginLeft:0,
                                                borderColor: 'transparent',
                                                paddingTop: 10,
                                            },
                                            dateText: {
                                                width: 200,
                                                fontSize: 24,
                                                color:'#333',
                                                textAlign: 'left'
                                            }
                                            }}
                                            onDateChange={(date) => {this.setState({returnDate: date})}}
                                        />
                                        </View>
                                        <View>
                                            <Icon
                                                name='ios-calendar-outline'
                                                size={32}
                                                color='#cccccc'
                                            />
                                        </View>
                                    </View>
                                </View>
                            );
                        }
                    } )() }
                    <View style={{marginBottom:30, flexDirection: 'row'}}>
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', borderRightColor: '#cccccc', borderRightWidth:1}}>
                            <View style={{marginRight:15}}>
                                <Icon
                                    name='ios-man'
                                    size={48}
                                    color='#333333'
                                />
                            </View>
                            <View>
                                <Text style={{fontSize: 24, color: '#333333'}}>1</Text>
                                <Text style={{fontSize: 18}}>Passenger</Text>
                            </View>
                        </View>
                        <View style={{flex:1,  justifyContent: 'center', paddingLeft: 15}}>
                            <Text style={{fontSize: 24, color: '#333333'}}>Economy</Text>
                            <Text style={{fontSize: 18}}>Class</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.9}>
                        <View style={styles.btn}>
                            <Text style={{fontSize:24, color: '#fff', }} >SEARCH FLIGHTS</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            // </ImageBackground>
        )
    }
}
class HomeScreenOld extends Component {
    static navigationOptions = {
        title: 'TripZumi',
    };
  render() {
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#e67e22"
            />
            <View style={styles.btn}>
                <Button
                    title="One Way"
                    onPress={() => {
                        this.props.navigation.navigate('Result', {
                            title: 'Chennai to Toronto',
                            json: 'http://otpdev.wintlt.com/dev/team/vignesh/search-layout-a5/assets/maa-to-yyz.json',
                        });
                    }}
                />
                <Text>Chennai to Toronto</Text>
            </View>
            
            <View style={styles.btn}>
                <Button
                    title="Round Trip"
                    onPress={() => {
                        this.props.navigation.navigate('Result', {
                            title: 'Chennai Toronto Return',
                            json: 'http://otpdev.wintlt.com/dev/team/vignesh/search-layout-a5/assets/maa-yyz.json',
                        });
                    }}
                />
                <Text>Chennai Toronto Return</Text>
            </View>

            <View style={styles.btn}>
                <Button
                    title="Multi City - 3"
                    onPress={() => {
                        this.props.navigation.navigate('Result', {
                            title: 'MAA - DEL - YYZ - LHR',
                            json: 'http://otpdev.wintlt.com/dev/team/vignesh/search-layout-a5/assets/maa-del-yyz-lhr.json',
                        });
                    }}
                />
                <Text>MAA - DEL - YYZ - LHR</Text>
            </View>

            <View style={styles.btn}>
                <Button
                    title="Multi City - 4"
                    onPress={() => {
                        this.props.navigation.navigate('Result', {
                            title: 'MAA - DEL - YYZ - LON - SIN',
                            json: 'http://otpdev.wintlt.com/dev/team/vignesh/search-layout-a5/assets/maa-del-yyz-lon-sin.json',
                        });
                    }}
                />
                <Text>MAA - DEL - YYZ - LON - SIN</Text>
            </View>
        </View>
    )
  }
}

// brand color #e67e22

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 15,
        paddingTop: 24,
        backgroundColor: '#ffffff',
    },
    btn: {
        marginBottom: 15
    },
    switchWrapper: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 25,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#ededed'
    },
    switchItem: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    switchText: {
        fontSize: 18
    },
    switchActive: {
        backgroundColor: '#e67e22',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    switchActiveText: {
        fontSize: 18,
        color: '#fff'
    },
    btn: {
        backgroundColor: '#e67e22',
        height:60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:30,
    }
});
