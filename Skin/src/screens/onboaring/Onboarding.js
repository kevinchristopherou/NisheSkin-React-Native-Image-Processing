import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Button, Image } from 'react-native-elements';
import AppIntroSlider from 'react-native-app-intro-slider';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

const slides = [
  {
    key: '1',
    title: 'Determine your skin type ',
    text:
      ' Find out your skin type with\n' +
         '     a short questionnaire.',
    image: require('./../../assets/images/questionnaire.png'),
  },
  {
    key: '2',
    title: 'Track your skin health',
    text:
      '   Take daily photos of your face to\n' +
        'monitor your overall skin health and\n' +
        '            find skin imbalances.',
    image: require('./../../assets/images/graph.png'),

  },
  {
    key: '3',
    title: 'Personalise your skincare',
    text:
      'Access personalised skincare tailored\n' +
        '                 to your skin type.',
    image: require('./../../assets/images/recommendedproducts.png'),
  },
];

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);

  }

  onCompleteTour = () => {
    this.props.navigation.navigate('DoneScreen', {});
  };

  onSkipTour = () => {
    this.props.navigation.navigate('DoneScreen', {});
  };

  _renderItem = (props) => {
    return (
      <View>
        {
          !props.item.image1 &&
          <View style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: perfectSize(-40)
          }}>
            <Image source={props.item.image}
              style={{ width: perfectSize(300), height: perfectSize(300) }}
              resizeMethod='resize'
              resizeMode='contain'
            />
            <Text style={{
              fontWeight: 'bold',
              fontSize: perfectSize(25),
              marginTop: perfectSize(30)
            }}>{props.item.title}</Text>
            <Text
              style={{ color: '#707070', fontSize: perfectSize(17), marginTop: perfectSize(30) }}>{props.item.text}</Text>
          </View>
        }

        {
          props.item.image1 &&
          <View style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: perfectSize(-30)
          }}>
            <Image source={props.item.image}
              style={{ width: perfectSize(150), height: perfectSize(150) }}
              resizeMethod='resize'
              resizeMode='contain'
            />
            <View style={{ marginTop: perfectSize(20) }}>
              <Image source={props.item.image2}
                style={{ width: perfectSize(150), height: perfectSize(70) }}
                resizeMethod='resize'
                resizeMode='contain'
              />
            </View>
            <Image source={props.item.image1}
              style={{ width: perfectSize(150), height: perfectSize(150) }}
              resizeMethod='resize'
              resizeMode='contain'
            />
            <Text style={{
              fontWeight: 'bold',
              fontSize: perfectSize(25),
              marginTop: perfectSize(30)
            }}>{props.item.title}</Text>
            <Text
              style={{ color: '#707070', fontSize: perfectSize(17), marginTop: perfectSize(30) }}>{props.item.text}</Text>
          </View>
        }
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={{ marginRight: perfectSize(15), marginTop: perfectSize(10) }}>
        <Text style={{ fontSize: perfectSize(17) }}>Next</Text>
      </View>
    );
  };

  _renderSkipButton = () => {
    return (
      <View style={{ marginLeft: perfectSize(15), marginTop: perfectSize(10) }}>
        <Text style={{ fontSize: perfectSize(17) }}>Skip</Text>
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={{ marginRight: perfectSize(15), marginTop: perfectSize(10) }}>
        <Text style={{ fontSize: perfectSize(17) }}>Next</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexGrow: 1 }}>
          <AppIntroSlider
            data={slides}
            renderItem={this._renderItem}
            // nextLabel="Next"
            // skipLabel={'Skip'}
            // doneLabel="Next"
            buttonStyle={styles.btnWrap}
            buttonTextStyle={styles.btnText}
            activeDotStyle={styles.activeDot}
            dotStyle={styles.dotStyle}
            onDone={this.onCompleteTour}
            onSkip={this.onSkipTour}
            showSkipButton='true'
            showNextButton='true'
            renderNextButton={this._renderNextButton}
            renderSkipButton={this._renderSkipButton}
            renderDoneButton={this._renderDoneButton}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  btnWrap: {
    backgroundColor: 'blue',
    borderRadius: perfectSize(5),
    marginBottom: perfectSize(10),
  },
  btnText: {
    textAlign: 'center',
    color: '#000',
    fontSize: perfectSize(18),
  },
  activeDot: {
    backgroundColor: '#FF3800',
    width: '5%',
  },
  dotStyle: {
    backgroundColor: '#d1d1d1',
  },
});
