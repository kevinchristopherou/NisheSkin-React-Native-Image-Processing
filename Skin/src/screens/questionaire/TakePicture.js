import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Header, Image, Overlay } from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";
import ImagePicker from 'react-native-image-picker';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import AsyncStorage from '@react-native-community/async-storage';

import REQUEST from "../../services/Request";
import { ENDPOINT } from '../../config/endpoint';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class TakePicture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filePath: '',
      fileData: '',
      fileUri: '',
      uri: '',
      base: '',
      loading: false
    };

    this.color1 = this.props.route.params.color1
    this.color2 = this.props.route.params.color2
    this.color3 = this.props.route.params.color3
    this.color4 = this.props.route.params.color4
    this.text1 = this.props.route.params.text1
    this.text2 = this.props.route.params.text2
    this.text3 = this.props.route.params.text3
    this.text4 = this.props.route.params.text4

    this.leftHeader = this.leftHeader.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  leftHeader() {
    return (
      <Button
        icon={<Feather name='arrow-left' size={perfectSize(25)} color='#333333' />}
        type='clear'
        onPress={() => {
          this.props.navigation.goBack();
        }}
      />
    );
  }

  handleClick = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        // console.log('response', JSON.stringify(response));
        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri
        // });
        this.setState({
          uri: response.uri,
          base: response.data,
          loading: true
        }, async () => {
          const token = await AsyncStorage.getItem('token');
          console.log(token);
          let image = this.state.base
          let payload = { token, image };
          let response = await REQUEST.post_face_recognition(ENDPOINT.POST_FACE_RECOGNITION, payload);
          this.setState({ loading: false })
          console.log(response);
          if (response == 'undefined') {
            alert('Network Error');
          } else {
            if (response.code == 0) {
              this.props.navigation.navigate('Result', {
                image: response.content,
                color1: this.color1,
                color2: this.color2,
                color3: this.color3,
                color4: this.color4,
                text1: this.text1,
                text2: this.text2,
                text3: this.text3,
                text4: this.text4,
              });
            } else if (response.code == 1) {
              alert('Invalid Request');
            } else if (response.code == 5) {
              alert('Invalid Token');
            } else if (response.code == 6) {
              alert('Image Processing Error');
            }
          }
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={this.leftHeader()}
          centerComponent={{ text: 'Final step', style: { color: '#000', fontSize: perfectSize(25) } }}
          statusBarProps={{ translucent: true }}
          containerStyle={{
            backgroundColor: '#eee',
            justifyContent: 'space-around',
            borderBottomWidth: 1,
            borderBottomColor: '#bbb',
          }}
        />

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: perfectSize(30) }}>
          <Text style={{ fontSize: perfectSize(20) }}>
            YOU ARE ALMOST THERE.
          </Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: perfectSize(60), }}>
          <Image
            source={require('../../assets/images/selfie.png')}
            style={{ width: perfectSize(300), height: perfectSize(280) }}
            resizeMode={'contain'}
            resizeMethod={'resize'}
          />
          <Text style={{ fontSize: perfectSize(17), marginTop: perfectSize(20), textAlign: "center"}}>
            Stand against a plain background and ensure bright light source in front of you. Then, take a selfie with NO shadows on your face. Damaged skin (acne, eczema etc.) is shown as red area on the captured selfie while healthy skin is green.
          </Text>
        </View>

        <View style={{ width: '100%', padding: perfectSize(20), position: 'absolute', bottom: perfectSize(30) }}>
          <Button
            icon={
              <Text style={{ color: 'white', fontSize: perfectSize(25), fontWeight: 'bold' }}>
                TAKE A SELFIE
              </Text>
            }
            buttonStyle={styles.btn}
            type={'clear'}
            onPress={() => {
              this.handleClick();
            }}
          />
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  btn: {
    width: '100%',
    backgroundColor: '#5CAB72',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
});
