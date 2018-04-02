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
  Alert,
  ScrollView,
  Keyboard
} from 'react-native';

import DatePicker from 'react-native-datepicker'

import Icon from 'react-native-vector-icons/Ionicons';

import { StackNavigator } from 'react-navigation';

import moment from 'moment';

import DatepickerRange from 'react-native-range-datepicker';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            tripType: 'return',
            from: '',
            to: '',
            depDate: moment().add(1,'day').format('DD/MM/YYYY'),
            returnDate: moment().add(2,'day').format('DD/MM/YYYY'),
            keybodarOpen: false
        }
    }
    static navigationOptions = {
        title: 'TripZumi',
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
        return (
            // <ImageBackground source={ require('../assets/images/bg.jpg') } >
                <View style={{justifyContent: 'space-between', flex: 1,}}>
                    <StatusBar
                        backgroundColor="#e67e22"
                    />
                    <View style={styles.container}>
                        <ScrollView>
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
                                        returnKeyType="next"
                                        selectionColor= "#e67e22"
                                        spellCheck= {false}
                                        style={{  borderBottomColor: '#ccc', borderBottomWidth: 1,color: '#333', fontSize: 24 }}
                                        onChangeText={(text) => this.setState({from: text})}
                                        onSubmitEditing={() => this.toInput.focus()}
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
                                        returnKeyType="next"
                                        selectionColor= "#e67e22"
                                        spellCheck= {false}
                                        style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, color: '#333', fontSize: 24 }}
                                        onChangeText={(text) => this.setState({to: text})}
                                        ref={(input) => this.toInput = input}
                                    />
                                </View>
                            </View>
                            <View style={{ marginBottom: 30 }}>
                                <Text style={{ color: '#e67e22', fontSize: 18 }}>Departure:</Text>
                                <View style={{ flexDirection: 'row',alignItems: 'center', borderBottomWidth:1, borderBottomColor: '#cccccc' }}>
                                    <View style={{ flex:1 }}>
                                    <DatePicker
                                        style={{width: "100%", justifyContent: 'flex-start',}}
                                        date={this.state.depDate}
                                        mode="date"
                                        placeholder="select date"
                                        format="DD/MM/YYYY"
                                        minDate={moment().add(1,'day').format('DD/MM/YYYY')}
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
                                            width:'100%',
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
                                                    style={{width: "100%", justifyContent: 'flex-start',}}
                                                    date={this.state.returnDate}
                                                    mode="date"
                                                    placeholder="select date"
                                                    format="DD/MM/YYYY"
                                                    minDate={moment().add(2,'day').format('DD/MM/YYYY')}
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
                            <View style={{marginBottom:5, flexDirection: 'row'}}>
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
                        </ScrollView>
                    </View>

                    {(()=>{
                        if(!this.state.keybodarOpen) {
                            return (
                                <TouchableOpacity activeOpacity={0.9} onPress={() => {
                                    var from = moment(this.state.depDate, 'DD/MM/YYYY');
                                    var to = moment(this.state.returnDate, 'DD/MM/YYYY');
                                    if(this.state.from.length == 3 && this.state.to.length == 3 )
                                    {
                                        if(this.state.tripType == 'return') {
                                            if(from.diff(to, 'days') > 0) {
                                                Alert.alert('Invalid return date');
                                                return;
                                            }
                                            if(from.format('YYYY-MM-DD') == 'Invalid date' || to.format('YYYY-MM-DD') == 'Invalid date' ) {
                                                Alert.alert('Select return date again.');
                                                return;
                                            }
                                            
                                        }
                                        
                                    }
                                    else {
                                        Alert.alert('Invalid airport code');
                                        return;
                                    }
                                    var temp = this.state;
                                    if(from.format('YYYY-MM-DD') == 'Invalid date') {
                                        Alert.alert('Select date again.');
                                        return;
                                    }
                                    temp.from = temp.from.toUpperCase();
                                    temp.to = temp.to.toUpperCase();
                                    temp.depDate = from.format('YYYY-MM-DD');
                                    temp.returnDate = to.format('YYYY-MM-DD');
                                    this.props.navigation.navigate('Result', temp);
                                    
                                }}>
                                    <View style={styles.btn}>
                                        <Text style={{fontSize:24, color: '#fff', }} >SEARCH FLIGHTS</Text>
                                        <Icon
                                            style={{marginLeft: 15}}
                                            name="ios-plane"
                                            size={30}
                                            color="#ffffff"
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                    })()}
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
        flexDirection: 'row'
    }
});
