import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  StatusBar
} from 'react-native';

import { StackNavigator } from 'react-navigation';
// import { Constants } from 'expo';

// or any pure javascript modules available in npm
// import { Card } from 'react-native-elements'; // Version can be specified in package.json

export default class HomeScreen extends Component {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
    backgroundColor: '#ecf0f1',
  },
  btn: {
      marginBottom: 15
  }
});
