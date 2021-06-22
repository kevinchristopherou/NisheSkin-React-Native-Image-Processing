import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Header, Image } from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import AsyncStorage from '@react-native-community/async-storage';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class Result extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uri: this.props.route.params.base64,
      result1: this.props.route.params.text1,
      result2: this.props.route.params.text2,
      result3: this.props.route.params.text3,
      result4: this.props.route.params.text4,
      image : this.props.route.params.image
    };

    this.leftHeader = this.leftHeader.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.color1 = this.props.route.params.color1
    this.color2 = this.props.route.params.color2
    this.color3 = this.props.route.params.color3
    this.color4 = this.props.route.params.color4
  }

  componentDidMount(): void {

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
    // const jsonValue1 = JSON.stringify({
    //   result: this.state.result1,
    //   color: this.color1
    // });
    // const jsonValue2 = JSON.stringify({
    //   result: this.state.result2,
    //   color: this.color2
    // });
    // const jsonValue3 = JSON.stringify({
    //   result: this.state.result3,
    //   color: this.color3
    // });
    // const jsonValue4 = JSON.stringify({
    //   result: this.state.result4,
    //   color: this.color4
    // });
    // await AsyncStorage.setItem('result1', jsonValue1);
    // await AsyncStorage.setItem('result2', jsonValue2);
    // await AsyncStorage.setItem('result3', jsonValue3);
    // await AsyncStorage.setItem('result4', jsonValue4);
    this.props.navigation.navigate('Home');
  }

  render() {
    const imageURL = `https://nisheskin.com/download/${this.state.image}`;
    return (
      <View style={styles.container}>
        <Header
          leftComponent={this.leftHeader()}
          centerComponent={{ text: 'Result', style: { color: '#000', fontSize: perfectSize(25) } }}
          statusBarProps={{ translucent: true }}
          containerStyle={{
            backgroundColor: '#eee',
            justifyContent: 'space-around',
            borderBottomWidth: 1,
            borderBottomColor: '#bbb',
          }}
        />
        <View style={styles.image}>
          <Image
            source={{ uri: imageURL }}
            style={{ width: perfectSize(300), height: perfectSize(300) }}
            resizeMode={'contain'}
            resizeMethod={'resize'}
            PlaceholderContent={<ActivityIndicator size={"large"} />}
          />

          <View style={{ marginTop: perfectSize(30) }}>
            <Text style={{ color: '#007FEB', fontSize: perfectSize(30), textAlign: 'center' }}>
              SKIN TYPE RESULTS
            </Text>

            <View style={styles.result}>
              <View style={styles.screen1}>
                <View style={{
                  width: '40%', backgroundColor: `${this.color1}`, borderRadius: perfectSize(5), padding: perfectSize(10),
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
                  width: '40%', backgroundColor: `${this.color2}`, borderRadius: 5, padding: perfectSize(10),
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
                  width: '40%', backgroundColor: `${this.color3}`, borderRadius: 5, padding: perfectSize(10),
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
                  width: '40%', backgroundColor: `${this.color4}`, borderRadius: 5, padding: perfectSize(10),
                  justifyContent: 'center', alignItems: 'center'
                }}>
                  <Text>
                    {this.state.result4}
                  </Text>
                </View>
              </View>

            </View>
          </View>
        </View>

        <View style={styles.bottom}>
          <Button
            icon={<Feather name='arrow-right' size={perfectSize(35)} color='#fff' />}
            buttonStyle={styles.btn}
            type={'clear'}
            onPress={() => {
              this.handleClick();
            }}
          />
        </View>
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
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flex: 0
  },
  screen1: {
    flexDirection: 'row',
    marginTop: perfectSize(5),
    justifyContent: 'center',
    alignItems: 'center'
  }
});
