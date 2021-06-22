import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class DoneScreen extends React.Component {
  constructor(props) {
    super(props);


    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.navigation.navigate('Ques_first');
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.subContainer}>
          <Text style={{ color: '#2699FB', fontSize: perfectSize(40), fontWeight: 'bold', textAlign: 'center', }}>
            Skin Type Questionnaire
          </Text>
          <Text style={{ color: '#2699FB', fontSize: perfectSize(16),textAlign: 'center' }}>
            Finish a short questionnaire to determine your skin type.
          </Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/vprasalnik.png')}
            style={{ width: perfectSize(280), height: perfectSize(200), marginTop: perfectSize(20) }}
          />
          <Text style={{ opacity: 0.42,textAlign: 'center' }}>
            Questionnaire is excerpted and modified from:
            "The Skin Type Solution" by Leslie Baumann, MD, 2010
          </Text>
        </View>

        <View style={styles.start}>
          <View style={{ width: '80%' }}>
            <Button
              icon={
                <Text style={{ color: 'white', fontSize: perfectSize(20) }}>
                  Let's Start
                </Text>
              }
              buttonStyle={styles.btn}
              type={'clear'}
              onPress={() => {
                this.handleClick();
              }}
            />
          </View>
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
  subContainer: {
    width: '100%',
    height: '40%',
    backgroundColor: '#F1F9FF',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 0,
  },
  btn: {
    width: '100%',
    backgroundColor: '#2699FB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: perfectSize(5),
  },
  start: {
    position: 'absolute',
    bottom: perfectSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
