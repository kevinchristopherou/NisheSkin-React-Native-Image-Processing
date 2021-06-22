import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { captureScreen, ViewShot, captureRef, RNViewShot } from "react-native-view-shot";
import ImgToBase64 from 'react-native-image-base64';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import { Image, Overlay } from "react-native-elements";

import REQUEST from "../../services/Request";
import { ENDPOINT } from '../../config/endpoint';

import Face from '../../assets/images/face.svg';
import Face1 from '../../assets/images/face1.svg';
import AsyncStorage from "@react-native-community/async-storage";

const perfectSize = create(PREDEF_RES.iphoneX.dp);
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default class Algorithm1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUri1: '',
      imageUri2: '',
      imageUri3: '',
      imageUri4: '',
      imageUri5: '',
      isView: true,
      visible: true,
      loading: false,
      imageUri: '',
      touchBtn : false
    }

    this.imageArray = [];
  }

  componentDidMount(): void {

  }

  render() {
    let uri = `data:image/png;base64,${this.state.imageUri}`;

    return (
      <View style={styles.container}>
        {
          this.state.visible &&
          <RNCamera
            style={styles.preview}
            ref={cam => {
              this.camera = cam;
            }}
            type={RNCamera.Constants.Type.front}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          >
            {({ camera, status, recordAudioPermissionStatus }) => {
              return (
                <View>
                  <View style={styles.maskOutter}>
                    <View>
                      <Face width={perfectSize(800)} height={perfectSize(900)} />
                    </View>
                  </View>
                </View>
              );
            }}
          </RNCamera>
        }

        {
          !this.state.visible &&
          <Image
            source={{ uri: uri }}
            style={{ width: '100%', height: '100%' }}
          />
        }

        {
          !this.state.visible &&
          <View style={{
            position: 'absolute', width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: 'transparent'
          }}>
            <Face1 width={perfectSize(800)} height={perfectSize(900)} />
          </View>
        }

        {
          this.state.isView &&
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 0,
              left: perfectSize(0),
              alignItems: 'center',
              width: '100%'
            }}
          >
            <TouchableOpacity onPress={() => this.takePicture()} style={styles.capture} disabled = {this.state.touchBtn}>
              <Text style={{ fontSize: perfectSize(20), color: 'white' }}> Take Picture </Text>
            </TouchableOpacity>
          </View>
        }

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
    );
  }

  navigate = async () => {
    const token = await AsyncStorage.getItem('token');
    // let image = base64String.replace(/\n/g, '');
    let image = this.imageArray;

    let payload = { token, image };

    this.setState({
      loading: true
    });
    let response = await REQUEST.post_mask_image(ENDPOINT.POST_MASK_IMAGE, payload);
    console.log(response);
    this.setState({
      loading: false
    });
    if (response != 'undefined') {
      if (response.code == 0) {
        this.props.navigation.navigate('Chart');
        // alert('success')
      } else if (response.code == 1) {
        alert('Invalid Request')
      } else if (response.code == 5) {
        alert('Invalid Token')
      } else if (response.code == 6) {
        alert('Image Processing Error')
      } else if (response.code == 7) {
        alert('Image Processing Error - Matlab error')
      }
      this.setState({
        isView: true,
        visible: true
      })
    } else {
      this.setState({
        isView: true,
        visible: true
      })
    }

  };

  capture = async () => {
    await captureScreen({
      format: "jpg",
      quality: 1
    }).then(uri => {
      ImgToBase64.getBase64String(uri)
        // .then(base64String => { this.navigate(base64String) })
        .then(base64String => {
          this.imageArray.push(base64String.replace(/\n/g, ''));
          // this.navigate(base64String)
          // console.log(this.imageArray);
        })
        .catch(err => console.log(err));
    });

  };

  takePicture = async () => {
    this.setState({touchBtn : true, loading : true})
    let array = [];
    const options = { quality: 1, base64: true };
    const data1 = await this.camera.takePictureAsync(options);
    const data2 = await this.camera.takePictureAsync(options);
    const data3 = await this.camera.takePictureAsync(options);
    const data4 = await this.camera.takePictureAsync(options);
    const data5 = await this.camera.takePictureAsync(options);
    this.setState({loading : false})
    console.log(data1);
    console.log(data2);
    console.log(data3);
    console.log(data4);
    console.log(data5, '----------------------------------------');

    // this.setState({
    //   isView: false,
    //   visible: false,
    //   imageUri: data1.base64
    // }, () => {
    //   setTimeout(() => {
    //     this.capture();
    //   }, 1000)
    // })

    setTimeout(() => {
      this.setState({
        isView: false,
        visible: false,
        imageUri: data1.base64
      }, () => {
        setTimeout(() => {
          this.capture();
        }, 1000)
      })
    }, 1000)
    setTimeout(() => {
      this.setState({
        isView: false,
        visible: false,
        imageUri: data2.base64
      }, () => {
        setTimeout(() => {
          this.capture();
        }, 1000)
      })
    }, 3000)
    setTimeout(() => {
      this.setState({
        isView: false,
        visible: false,
        imageUri: data3.base64
      }, () => {
        setTimeout(() => {
          this.capture();
        }, 1000)
      })
    }, 5000)
    setTimeout(() => {
      this.setState({
        isView: false,
        visible: false,
        imageUri: data4.base64
      }, () => {
        setTimeout(() => {
          this.capture();
        }, 1000)
      })
    }, 7000)
    setTimeout(() => {
      this.setState({
        isView: false,
        visible: false,
        imageUri: data5.base64
      }, () => {
        setTimeout(() => {
          this.capture();
        }, 1000)

      })
    }, 9000)
    setTimeout(() => { this.navigate() }, 11000)
  };
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  capture: {
    flex: 0,
    backgroundColor: 'red',
    borderRadius: 5,
    padding: perfectSize(15),
    paddingHorizontal: perfectSize(20),
    alignSelf: 'center',
    margin: perfectSize(20),
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent'
  },

});
