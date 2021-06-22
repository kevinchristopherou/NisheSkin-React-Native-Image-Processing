import React from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Image, Button, Header, Overlay } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather'
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import ImagePicker from 'react-native-image-picker';
import fetch_blob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
import AsyncStorage from "@react-native-community/async-storage";

import REQUEST from "../../services/Request";
import { ENDPOINT } from '../../config/endpoint';

const perfectSize = create(PREDEF_RES.iphoneX.dp);
const WIDTH = Dimensions.get('window').width;

export default class Saving extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: this.props.route.params.image,
            loading: false
        }

        this.handleBack = this.handleBack.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

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

    handleClick() {
        let options = {
            cameraType: 'front',
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
                    base64: response.data
                }, () => {
                    this.setState({
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
                                this.setState({
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
                });
            }
        });
    }

    handleSave = async() => {
        this.setState({ loading: true });
        await fetch_blob.config({
            fileCache: true
        })
            .fetch("GET", `https://nisheskin.com/download/${this.state.image}`)
            // the image is now dowloaded to device's storage
            .then(resp => {
                return resp.readFile("base64");
            })
            .then(base64Data => {
                // here's base64 encoded image
                console.log(base64Data);

                // remove the file from storage
                //   return fs.unlink(imagePath);
                const fs1 = fetch_blob.fs
                const base64 = fetch_blob.base64
                const dirs = fetch_blob.fs.dirs

                const filename = new Date().getTime();
                const file_path = dirs.DCIMDir + `/image/${filename}.png`
                fs1.writeFile(file_path, base64Data, 'base64')
                    .then((rep) => {
                        alert(`Your image saved to /internal storage/DCIM/image/${filename}.png`);
                    })
                    .catch((error) => {
                        alert(JSON.stringify(error));
                    });

            });
        this.setState({ loading: false });
    }

    render() {
        const imageURL = `https://nisheskin.com/download/${this.state.image}`;
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={this.handleBack()}
                    centerComponent={{ text: 'SKIN SCAN RESULTS', style: { fontSize: perfectSize(20) } }}
                    statusBarProps={{ translucent: true }}
                    containerStyle={{
                        backgroundColor: '#eee',
                        justifyContent: 'space-around',
                        borderBottomWidth: 1,
                        borderBottomColor: '#bbb',
                    }}
                />

                <Image
                    source={{ uri: imageURL }}
                    style={{ width: WIDTH, height: WIDTH + 100 }}
                    resizeMethod={'resize'}
                    resizeMode={'contain'}
                    PlaceholderContent={<ActivityIndicator />}
                />

                <View style={styles.bottomBtn}>
                    <View style={styles.subview}>
                        <Button
                            icon={
                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', }}>
                                    TAKE ANOTHER           SELFIE
                            </Text>
                            }
                            buttonStyle={styles.btn}
                            type={'clear'}
                            onPress={() => {
                                this.handleClick();
                            }}
                        />
                    </View>

                    <View style={styles.subview}>
                        <Button
                            icon={
                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', }}>
                                    SAVE THE IMAGE AND MOVE TO THE MAIN MENU
                            </Text>
                            }
                            buttonStyle={styles.btn}
                            type={'clear'}
                            onPress={() => {
                                this.handleSave();
                            }}
                        />
                    </View>
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
    subview: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: '80%',
        backgroundColor: '#5CAB72',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        height: 70
    },
    bottomBtn: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: perfectSize(20),
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})
