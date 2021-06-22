import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Button, Image, Overlay, CheckBox, Header, Input } from 'react-native-elements';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';

import I18n from '../utils/languages/languageUtils';

import Logo from '../assets/images/ns.svg';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailError: false,
      passwordError: '',
      isLoading: false,
      checked: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert('asdfadsf');
    this.setState({
      emailError: !this.state.emailError
    })
  }


  render() {
    return (
      <KeyboardAvoidingView behavior='height'>
        <View style={styles.container}>
          <View style={{
            backgroundColor: '#F1F1F1',
            width: '100%',
            height: perfectSize(70),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: perfectSize(22), fontWeight: 'bold', color: '#4F4F4F' }}>
              {I18n.t('RESET')}
            </Text>
          </View>

          <View style={{ marginLeft: perfectSize(30) }}>
            <Logo width={perfectSize(280)} height={perfectSize(200)} />
          </View>

          <View style={{ width: '100%', padding: perfectSize(20) }}>
            {
              this.state.emailError &&
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  color: '#6CD4CA'
                }}>
                  {I18n.t('INVALID')}
                </Text>
              </View>
            }
            <Input
              // placeholder="Comment"
              // leftIcon={{ type: 'font-awesome', name: 'comment' }}
              // style={styles}
              onChangeText={text => this.setState({ email: text })}
            />
            <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', marginTop: perfectSize(-20) }}>
              <Text style={{ color: '#ccc' }}>
                {I18n.t('YOUR_EMAIL')}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: perfectSize(70) }}>
            <Button
              icon={
                <Text style={{ color: 'white', fontSize: perfectSize(20) }}>
                  {I18n.t('RESET_BTN')}
                </Text>
              }
              buttonStyle={styles.btn}
              type={'clear'}
              onPress={() => {
                this.handleClick();
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: perfectSize(30),
            }}
          >
            <Text
              style={{
                fontSize: perfectSize(17),
              }}
            >
              {I18n.t('ALREADY3')}
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Signup');
              }}
            >
              <Text
                style={{
                  color: '#3C82FF',
                  fontSize: perfectSize(17),
                  marginLeft: perfectSize(20),
                }}
              >
                {I18n.t('SIGNUP')}
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
    borderRadius: perfectSize(20),
  },
});
