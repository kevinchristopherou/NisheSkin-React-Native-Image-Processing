import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Button, Image, Overlay, CheckBox } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { TextInput } from 'react-native-paper';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import I18n from '../utils/languages/languageUtils';
import { emailValidator, passwordValidator } from '../utils/Validator';
import REQUEST from "../services/Request";
import { ENDPOINT } from '../config/endpoint';
import AsyncStorage from '@react-native-community/async-storage';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      isLoading: false,
      checked: false,
      loading: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePswChange = this.handlePswChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      webClientId: '219373126593-1f1h5kq4obeh807vr9hnj8i4u8lqucip.apps.googleusercontent.com',
      androidClientId: '219373126593-ibcvt6jiogrocfaspvsncs5on2lmruaf.apps.googleusercontent.com',
      offlineAccess: false,
      hostedDomain: '',
      loginHint: '',
      forceCodeForRefreshToken: true,
      forceConsentPrompt: true,
      accountName: '',
      iosClientId: '219373126593-ht07r744bhrjmh45dt60qsoasuce6704.apps.googleusercontent.com',
    });
  }

  signup = async (signType) => {
    this.setState({ loading: true });
    const type = signType;
    const { name, email, password } = this.state;
    let payload = { type, name, email, password };
    this.setState({ loading: true });
    let response = await REQUEST.post_signup(ENDPOINT.AUTH.REGISTER, payload);
    this.setState({ loading: false });
    if (response.code == 0) {
      await AsyncStorage.setItem('token', response.content.token);
      await AsyncStorage.setItem('username', response.content.name);
      await AsyncStorage.setItem('signedIn', JSON.stringify(1));
      this.props.navigation.navigate('Gender');
      this.setState({
        name: '',
        email: '',
        password: ''
      })
    } else if (response.code == 1) {
      alert('Invalid Request');
      this.setState({
        name: '',
        email: '',
        password: ''
      })
    } else if (response.code == 2) {
      alert('User already exist');
      this.setState({
        name: '',
        email: '',
        password: ''
      })
    }
  }

  handleClick = async () => {
    if (this.state.name === '' || this.state.email === '' || this.state.password === '') {
      alert('Please type all field');
    } else if (this.state.emailError || this.state.passwordError) {
      alert('Please choose longer password.');
    } else if (!this.state.checked) {
      alert('Please apply our Privacy Policy')
    } else {
      await this.signup('0');
    }
  }

  googleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      GoogleSignin.signOut();
      GoogleSignin.signIn()
        .then((res) => {
          this.setState({
            name: res.user.name,
            email: res.user.email,
            password: res.user.id
          }, async () => {
            await this.signup('1')
          })
        }).catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log('&&&&&&&&&&&&&', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('sign in action canceled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  facebookSignup = async () => {
    LoginManager.logOut();
    try {
      await LoginManager.logOut();
      await LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        function (result) {
          console.log('result', result);
          if (result.isCancelled) {

            console.log("Login cancelled");
          } else {
            console.log(
              "Login success with permissions: " +
              result.grantedPermissions.toString()
            );
          }
        });

      const infoRequest = new GraphRequest(
        '/me?fields=name,email,picture',
        null,
        this._responseInfoCallback
      );
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    } catch (e) {
      console.log('catch error', e)
    }

  };

  _responseInfoCallback = async (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      this.setState({
        name: result.name,
        email: result.email,
        password: result.id
      }, async () => {
        await this.signup('2')
      });
    }
  }

  handleNameChange(text) {
    this.setState({
      name: text
    })
  }

  handleEmailChange(text) {
    this.setState({
      email: text,
    });

    if (emailValidator(text)) {
      this.setState({
        emailError: '',
      });
    } else {
      this.setState({
        emailError: 'Please enter correct email type.',
      });
    }
  }

  handlePswChange(text) {
    this.setState({
      password: text,
    });

    if (passwordValidator(text)) {
      this.setState({
        passwordError: '',
      });
    } else {
      this.setState({
        passwordError: 'password must be more than 8 letters!',
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='position'>
        <View style={styles.container}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: perfectSize(25),
              marginTop: perfectSize(10),
            }}
          >
            {I18n.t('SIGNUP')}
          </Text>

          <Text
            style={{
              fontSize: perfectSize(15),
              marginTop: perfectSize(10),
              color: '#8B959A'
            }}
          >
            {I18n.t('SIGNUP_WELCOME')}
          </Text>


          <Text
            style={{
              fontSize: perfectSize(17),
              marginTop: perfectSize(50),
              color: '#8B959A'
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
                  borderColor: '#bbb',
                }}
                onPress={() => { this.googleSignup() }}
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
                onPress={() => { this.facebookSignup() }}
              />
            </View>
          </View>

          <Text style={{ marginTop: perfectSize(30), fontSize: perfectSize(17), color: '#8B959A' }}>
            {I18n.t('SIGNUP_SIGN')}
          </Text>

          <View style={{ width: '100%', marginTop: perfectSize(20) }}>
            <TextInput
              // placeholder={'Email'}
              value={this.state.name}
              onChangeText={text => this.handleNameChange(text)}
              // error={this.state.emailError}
              mode='outlined'
              label={I18n.t('NAME')}
            />
          </View>

          <View style={{ width: '100%', marginTop: perfectSize(20) }}>
            <TextInput
              // placeholder={'Email'}
              value={this.state.email}
              onChangeText={text => this.handleEmailChange(text)}
              error={this.state.emailError}
              mode='outlined'
              label={I18n.t('EMAIL')}
            />
          </View>

          <View style={{ width: '100%', marginTop: perfectSize(20) }}>
            <TextInput
              // placeholder={'Password'}
              value={this.state.password}
              onChangeText={text => this.handlePswChange(text)}
              error={this.state.passwordError}
              mode='outlined'
              label={I18n.t('PASSWORD')}
              secureTextEntry
            />
          </View>

          <View style={{
            marginTop: perfectSize(15),
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}>
            <CheckBox
              title={I18n.t('PRIVACY')}
              checkedColor='#3C82FF'
              uncheckedColor={'#000'}
              iconType={'materialIcons'}
              checkedIcon={'radio-button-checked'}
              uncheckedIcon={'radio-button-unchecked'}
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked })}
              containerStyle={{ borderWidth: 0, marginLeft: perfectSize(-5) }}
            />
          </View>


          <View style={{ width: '100%', marginTop: perfectSize(0) }}>
            <Button
              icon={
                <Text style={{ color: 'white', fontSize: perfectSize(20) }}>
                  {I18n.t('SIGNUP')}
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
              marginTop: perfectSize(20),
            }}
          >
            <Text
              style={{
                fontSize: perfectSize(17),
              }}
            >
              {I18n.t('ALREADY2')}
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Login');
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

          <Overlay
            isVisible={this.state.loading}
            overlayStyle={{
              width: '80%',
              height: '15%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <View style={{ width: '70%', height: '15%', justifyContent: 'center', alignItems: 'center' }}>
              {/* <Text style={{ fontSize: perfectSize(16), color: '#666666', marginBottom : perfectSize(10) }}>Uploading... Please wait</Text> */}
              <ActivityIndicator color={'#de0046'} size='large' />
            </View>
          </Overlay>
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
