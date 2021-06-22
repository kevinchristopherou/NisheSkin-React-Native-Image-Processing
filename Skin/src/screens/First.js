import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Button, Image, Overlay } from 'react-native-elements';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import AsyncStorage from '@react-native-community/async-storage';

import I18n from '../utils/languages/languageUtils';

import Logo from '../assets/images/ns.svg';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class First extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const signedIn = await AsyncStorage.getItem('signedIn');
    if (signedIn == 1) {
      this.props.navigation.navigate('Home')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="height">
        <View style={styles.container}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: perfectSize(28),
              marginTop: perfectSize(0),
              textAlign: "center"
            }}
          >
            {I18n.t('WELCOME')}
          </Text>

          <Text
            style={{
              fontSize: perfectSize(15),
              marginTop: perfectSize(30),
            }}
          >
            {I18n.t('FIRST_WELCOME_DOWN')}
          </Text>

          <View style={{ marginLeft: perfectSize(0), alignItems: 'center' }}>
            <Logo width={perfectSize(320)} height={perfectSize(200)} />
          </View>

          <Text
            style={{
              fontSize: perfectSize(18),
              marginTop: perfectSize(50),
            }}
          >
            {I18n.t('SOCIAL')}
          </Text>

          <View style={styles.social}>
            <View style={{ width: '50%' }}>
              <Button
                icon={
                  <Image
                    source={require('../assets/images/google.png')}
                    style={{ width: perfectSize(32), height: perfectSize(32) }}
                  />
                }
                type={'outline'}
                buttonStyle={{
                  width: '90%',
                  borderWidth: 1,
                  borderColor: '#bbb'
                }}
              />
            </View>
            <View style={{ width: '50%' }}>
              <Button
                icon={
                  <Image
                    source={require('../assets/images/facebook.png')}
                    style={{ width: perfectSize(32), height: perfectSize(32) }}
                  />
                }
                type={'solid'}
                buttonStyle={{
                  width: '90%',
                  marginLeft: perfectSize(20),
                  backgroundColor: '#475993',
                }}

              />
            </View>
          </View>

          <View style={{ width: '90%', marginTop: perfectSize(40) }}>
            <Button
              icon={
                <Text style={{ color: 'white', fontSize: perfectSize(20) }}>
                  {I18n.t('SIGNUP')}
                </Text>
              }
              buttonStyle={styles.btn}
              type={'clear'}
              onPress={() => {
                this.props.navigation.navigate('Signup')
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: perfectSize(50)
            }}
          >
            <Text
              style={{
                fontSize: perfectSize(17),
              }}
            >
              {I18n.t('ALREADY1')}
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Login')
              }}
            >
              <Text
                style={{
                  color: '#3C82FF',
                  fontSize: perfectSize(17),
                  marginLeft: perfectSize(20),
                }}
              >
                {I18n.t('LOGIN')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: perfectSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  social: {
    flexDirection: 'row',
    marginTop: perfectSize(30),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    backgroundColor: '#3C82FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: perfectSize(5)
  },
});
