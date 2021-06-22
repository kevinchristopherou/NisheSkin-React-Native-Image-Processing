import React from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, BackHandler } from "react-native";
import { Button, Header, Image } from "react-native-elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeAlert from 'react-native-awesome-alerts';

import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import Logo from '../../assets/images/ns.svg';
import AsyncStorage from '@react-native-community/async-storage';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      isVisible: false,
      result1: '',
      color1: '',
      result2: '',
      color2: '',
      result3: '',
      color3: '',
      result4: '',
      color4: '',
    };

    this.right_header = this.right_header.bind(this);
    this.center_header = this.center_header.bind(this);
    this.alert = this.alert.bind(this);
    this.modalView = this.modalView.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const name = await AsyncStorage.getItem('username');
    this.setState({
      userName: name
    });
    const data1 = await AsyncStorage.getItem('result1');
    if (data1 !== null) {
      const jsonData = JSON.parse(data1);
      this.setState({
        result1: jsonData.result,
        color1: jsonData.color
      });
    }
    const data2 = await AsyncStorage.getItem('result2');
    if (data2 !== null) {
      const jsonData = JSON.parse(data2);
      this.setState({
        result2: jsonData.result,
        color2: jsonData.color
      });
    }
    const data3 = await AsyncStorage.getItem('result3');
    if (data3 !== null) {
      const jsonData = JSON.parse(data3);
      this.setState({
        result3: jsonData.result,
        color3: jsonData.color
      });
    }
    const data4 = await AsyncStorage.getItem('result4');
    if (data4 !== null) {
      const jsonData = JSON.parse(data4);
      this.setState({
        result4: jsonData.result,
        color4: jsonData.color
      });
    }
  }

  right_header() {
    return (
      <TouchableOpacity
        style={{ marginRight: perfectSize(10) }}
        onPress={() => {
          this.alert()
        }}
      >
        <MaterialCommunityIcons
          name='logout'
          size={perfectSize(40)}
          color='#fff'
        />
      </TouchableOpacity>
    )
  }

  center_header() {
    return (
      <View>
        <Logo width={perfectSize(120)} height={perfectSize(100)} />
      </View>
    )
  }

  alert() {
    this.setState({
      isVisible: true
    })
  }

  modalView()  {
    return (

      <AwesomeAlert
        show={this.state.isVisible}
        showProgress={false}
        title="Are you sure want to log out ?"
        // message="Are you sure want to log out ?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="      No       "
        confirmText="         Yes       "
        confirmButtonColor="#DD6B55"

        onCancelPressed={() => {
          this.setState({
            isVisible: false
          })
        }}
        onConfirmPressed={async () => {
          this.setState({
            isVisible: false
          });
          await AsyncStorage.setItem('signedIn', JSON.stringify(0))
          BackHandler.exitApp();
        }}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={this.center_header()}
          rightComponent={this.right_header()}
          statusBarProps={{ translucent: true }}
          containerStyle={{
            backgroundColor: '#D9EBFB',
            justifyContent: 'space-around',
            borderBottomWidth: 1,
            borderBottomColor: '#D9EBFB',
            height: perfectSize(120)
          }}
        />

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: perfectSize(10) }}>
          <Text style={{ opacity: 0.6, fontSize: perfectSize(23), fontWeight: 'bold' }}>
            Welcome
            </Text>
          <Text style={{ fontWeight: 'bold', fontSize: perfectSize(26) }}>
            {this.state.userName}
          </Text>
        </View>

        <View style={{ marginTop: perfectSize(30), paddingHorizontal: perfectSize(20) }}>
          <Text style={{ color: '#C5B358', fontWeight: 'bold', fontSize: perfectSize(22), textAlign: 'center' }}>
            Make your skin a priority.
            </Text>
          <View style={{ marginTop: perfectSize(20), flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.discover}
              onPress={() => {
                // this.props.navigation.navigate('Algorithm1');
                this.props.navigation.navigate('Algorithm_chart');
              }}
            >
              <Image
                source={require('../../assets/images/trackyourskin.png')}
                style={{ width: perfectSize(80), height: perfectSize(80) }}
                resizeMode={'contain'}
                resizeMethod={'resize'}
              />
              <Text style={{ color: '#8F87A5', fontSize: perfectSize(11) }}>
                Skin Tracking
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.discover}
              onPress={() => {
                this.props.navigation.navigate('Shopping')
              }}
            >
              <Image
                source={require('../../assets/images/recommendedproducts.png')}
                style={{ width: perfectSize(80), height: perfectSize(80) }}
                resizeMode={'contain'}
                resizeMethod={'resize'}
              />
              <Text style={{ color: '#8F87A5', fontSize: perfectSize(11) }}>
                Personalised
                Skincare
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.discover}
              onPress={() => {
                this.props.navigation.navigate('FaceRecognition');
              }}
            >
              <Image
                source={require('../../assets/images/Selfie-Illustration.png')}
                style={{ width: perfectSize(80), height: perfectSize(80) }}
                resizeMode={'contain'}
                resizeMethod={'resize'}
              />
              <Text style={{ color: '#8F87A5', fontSize: perfectSize(11) }}>
                Quick Scan
                </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: perfectSize(40) }}>
          <Text style={{ color: '#007FEB', fontSize: perfectSize(30), textAlign: 'center' }}>
            YOUR SKIN TYPE:
            </Text>

          <View style={styles.result}>
            <View style={styles.screen1}>
              <View style={{
                width: '40%', backgroundColor: `${this.state.color1}`, borderRadius: 5, padding: perfectSize(10),
                justifyContent: 'space-between', alignItems: 'center'
              }}>
                <Text>
                  {this.state.result1}
                </Text>
              </View>

              <Image
                source={require('../../assets/images/line1.png')}
                style={{ width: perfectSize(40), height: perfectSize(50), }}
                resizeMode={'contain'}
                resizeMethod={'resize'}
              />

              <View style={{
                width: '40%', backgroundColor: `${this.state.color2}`, borderRadius: 5, padding: perfectSize(10),
                justifyContent: 'center', alignItems: 'center'
              }}>
                <Text>
                  {this.state.result2}
                </Text>
              </View>
            </View>

            <View style={styles.screen1}>
              <View style={{
                width: '50%', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <Image
                  source={require('../../assets/images/line.png')}
                  style={{ width: perfectSize(100), height: perfectSize(100) }}
                  resizeMode={'contain'}
                  resizeMethod={'resize'}
                />
              </View>

              <View style={{
                width: '50%', justifyContent: 'center', alignItems: 'center'
              }}>
                <Image
                  source={require('../../assets/images/line.png')}
                  style={{ width: perfectSize(100), height: perfectSize(100) }}
                  resizeMode={'contain'}
                  resizeMethod={'resize'}
                />
              </View>
            </View>

            <View style={styles.screen1}>
              <View style={{
                width: '40%', backgroundColor: `${this.state.color3}`, borderRadius: 5, padding: perfectSize(10),
                justifyContent: 'space-between', alignItems: 'center'
              }}>
                <Text>
                  {this.state.result3}
                </Text>
              </View>

              <Image
                source={require('../../assets/images/line1.png')}
                style={{ width: perfectSize(40), height: perfectSize(50), }}
                resizeMode={'contain'}
                resizeMethod={'resize'}
              />

              <View style={{
                width: '40%', backgroundColor: `${this.state.color4}`, borderRadius: 5, padding: perfectSize(10),
                justifyContent: 'center', alignItems: 'center'
              }}>
                <Text>
                  {this.state.result4}
                </Text>
              </View>
            </View>

          </View>
        </View>
        {
          this.modalView()
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D9EBFB'
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: perfectSize(10)
  },
  bottom: {
    position: 'absolute',
    bottom: perfectSize(20),
    width: '100%',
    paddingHorizontal: perfectSize(20)
  },
  btn: {
    width: '100%',
    backgroundColor: '#2699FB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  result: {
    width: '100%',
    height: '50%',
    justifyContent: 'space-between',
    flex: 0
  },
  screen1: {
    flexDirection: 'row',
    marginTop: perfectSize(5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  discover: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: perfectSize(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_content: {
    width: perfectSize(200),
    height: perfectSize(200),
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
