import React from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Image, Button, Header, Overlay } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather'
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from "@react-native-community/async-storage";

import REQUEST from "../../services/Request";
import { ENDPOINT } from '../../config/endpoint';

const perfectSize = create(PREDEF_RES.iphoneX.dp);
const WIDTH = Dimensions.get('window').width;

export default class FaceRecognition extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            base64: '',
            loading: false
        }

        // this.handleClick = this.handleClick.bind(this);
    }

    handleBack() {
        return (
            <Button
                icon={<Feather name='arrow-left' size={perfectSize(25)} color='#333333' />}
                type='clear'
                onPress={() => {
                    this.props.navigation.goBack();
                }}
            />
        )
    }

    handleClick = () => {
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
                // const source = { uri: response.uri };
                // console.log('response', JSON.stringify(response));
                // this.setState({
                //   filePath: response,
                //   fileData: response.data,
                //   fileUri: response.uri
                // });
                this.setState({
                    base64: response.data,
                    loading: true
                }, async () => {
                    const token = await AsyncStorage.getItem('token');
                    console.log(token);
                    let image = this.state.base64
                    let payload = { token, image };
                    let response = await REQUEST.post_face_recognition(ENDPOINT.POST_FACE_RECOGNITION, payload);
                    this.setState({ loading: false })
                    console.log(response);
                    if (response == 'undefined') {
                        alert('Network Error');
                    } else {
                        if (response.code == 0) {
                            this.props.navigation.navigate('Saving', {
                                image: response.content
                            })
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
                    leftComponent={this.handleBack()}
                    centerComponent={{ text: 'QUICK SKIN SCAN', style: { fontSize: perfectSize(20) } }}
                    statusBarProps={{ translucent: true }}
                    containerStyle={{
                        backgroundColor: '#eee',
                        justifyContent: 'space-around',
                        borderBottomWidth: 1,
                        borderBottomColor: '#bbb',
                    }}
                />

                <View style={styles.subview}>
                    <Image
                        source={require('../../assets/images/quickacnescan.png')}
                        resizeMethod={'resize'}
                        resizeMode={'contain'}
                        style={{ width: WIDTH, height: WIDTH, textAlign: "center"}}
                    />
                    <View style={styles.subview}>
                        <Text> Stand against a plain background and</Text>
                        <Text> ensure bright light source in front of you.</Text>
                        <Text>  Then, take a selfie with </Text>
                        <Text>  NO shadows on your face.</Text>
                    </View>
                </View>

                <View style={{ width: '100%', padding: perfectSize(20), position: 'absolute', bottom: perfectSize(30),textAlign: "center" }}>
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    subview: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: perfectSize(20)
    },
    btn: {
        width: '100%',
        backgroundColor: '#5CAB72',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
})
