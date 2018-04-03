import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Picker, TextInput, Alert, Keyboard, ActivityIndicator } from 'react-native';

import moment from 'moment';

import DatePicker from 'react-native-datepicker'

export default class PassengerDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            pax_bod: '',
            keybodarOpen: false,
            result: {
                load: false
            },
            submit: false,
        }
    }
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params.title ? params.title : 'Flight Details',
        }
    };

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            this.setState({ keybodarOpen: true })
        });
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',  () => {
            this.setState({ keybodarOpen: false })
        });
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    render() {
        const { params } = this.props.navigation.state;
        if(!this.state.submit) {
            return (
                <View style={{ justifyContent: 'space-between', flex: 1, }}>
                    <View style={styles.container}>
                        <ScrollView>
                            <Text style={{ fontSize: 18, marginBottom: 30 }}>Passenger Details:</Text>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{borderBottomColor: '#ccc', borderBottomWidth: 1}}>
                                    <Picker
                                        mode="dropdown"
                                        selectedValue={this.state.title ? this.state.title : ''}
                                        onValueChange={(itemValue, itemIndex) => { this.setState({ title: itemValue }); this.firstNameInput.focus() }}>
                                        <Picker.Item label="Title" value="" />
                                        <Picker.Item label="Mr" value="Mr" />
                                        <Picker.Item label="Mrs" value="Mrs" />
                                        <Picker.Item label="Ms" value="Ms" />
                                        <Picker.Item label="Miss" value="Miss" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#e67e22"
                                    returnKeyType="next"
                                    selectionColor="#e67e22"
                                    placeholder="First Name"
                                    placeholderTextColor="gray"
                                    spellCheck={false}
                                    style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, color: '#333', fontSize: 24 }}
                                    onChangeText={(text) => this.setState({ firstName: text })}
                                    ref={(input) => this.firstNameInput = input}
                                    onSubmitEditing={() => this.lastNameInput.focus()}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#e67e22"
                                    returnKeyType="next"
                                    selectionColor="#e67e22"
                                    placeholder="Last Name"
                                    placeholderTextColor="gray"
                                    spellCheck={false}
                                    style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, color: '#333', fontSize: 24 }}
                                    onChangeText={(text) => this.setState({ lastName: text })}
                                    ref={(input) => this.lastNameInput = input}
                                // onSubmitEditing={() => this.toInput.focus()}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <DatePicker
                                    style={{width: "100%", borderBottomColor: '#ccc',paddingLeft: 5, paddingBottom:10, borderBottomWidth: 1, justifyContent: 'flex-start',}}
                                    date={this.state.pax_bod}
                                    mode="date"
                                    placeholder="Date of Birth"
                                    format="DD/MM/YYYY"
                                    maxDate={moment().subtract(12,'years').format('DD/MM/YYYY')}
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
                                        width: "100%",
                                        fontSize: 24,
                                        color:'#333',
                                        textAlign: 'left'
                                    },
                                    placeholderText: {
                                        width: "100%",
                                        fontSize:24,
                                        color:'gray',
                                    }
                                    }}
                                    onDateChange={(date) => {this.setState({pax_bod: date}); this.emailInput.focus()}}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#e67e22"
                                    returnKeyType="next"
                                    selectionColor="#e67e22"
                                    placeholder="Email Address"
                                    placeholderTextColor="gray"
                                    spellCheck={false}
                                    style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, color: '#333', fontSize: 24 }}
                                    onChangeText={(text) => this.setState({ email: text })}
                                    ref={(input) => this.emailInput = input}
                                    onSubmitEditing={() => this.mobileInput.focus()}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#e67e22"
                                    returnKeyType="next"
                                    selectionColor="#e67e22"
                                    placeholder="Mobile Number"
                                    placeholderTextColor="gray"
                                    spellCheck={false}
                                    style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, color: '#333', fontSize: 24 }}
                                    onChangeText={(text) => this.setState({ mobile: text })}
                                    ref={(input) => this.mobileInput = input}
                                // onSubmitEditing={() => this.toInput.focus()}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    {(()=>{
                        if(!this.state.keybodarOpen) {
                            return (
                                <TouchableOpacity onPress={() => {
                                    if(this.state.title == '' || this.state.firstName == '' || this.state.pax_bod == '' || this.state.email == "" || this.state.mobile == '' ) {
                                        Alert.alert('Fill all information to booking');
                                        return;
                                    }
                                    this.props.navigation.navigate('BookingPageScreen', {
                                        title: 'Wait a moment',
                                        data: this.state,
                                        itin: params.data,
                                    });
                                    return;
                                }}>
                                    <View style={styles.btn}>
                                        <Text style={{ fontSize: 24, color: '#fff', }} >PAY NOW</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                    })()}
                </View>
            )
        }
        else {
            return (
                <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                    
                    {( () => {
                        if(!this.state.result.hasOwnProperty('load')) {
                            if(this.state.result.Booking_Response == 'Success') {
                                return (
                                    <View>
                                        <Text style={{fontSize:24}}>Booking Success</Text>
                                        <Text>PNR NO: {this.state.result.pnr_no} </Text>
                                        <Text>BOOKING ID: {this.state.result.booking_id} </Text>
                                    </View>
                                    
                                )
                            }
                            else {
                                return (
                                    <View>
                                        <Text style={{fontSize:24}}>Booking Fail Sorry</Text>
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
                    } )()}
                </View>
            );
        }

        
    }
}

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
        backgroundColor: '#e67e22',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});