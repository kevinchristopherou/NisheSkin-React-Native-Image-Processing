import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Header, Button } from "react-native-elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import AsyncStorage from '@react-native-community/async-storage';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class Ques_first extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionData: '',
      buttonInfo: '',
      index: 0,
      score: '',
      color: ''
    };

    this.array = [];

    this.colors = [
      '#D3D3D3',
      '#D8AD88',
      '#CC7722',
      '#8DDCC4',
      '#99CCF8',
      '#9696E5',
      '#E8EEF3',
      '#C18C8C',
      '#FB5858',
      '#D8CF92'
    ];

    this.sum1 = 0;
    this.sum2 = 0;
    this.sum3 = 0;
    this.sum4 = 0;
    this.color1 = '';
    this.color2 = '';
    this.color3 = '';
    this.color4 = '';
    this.text1 = '';
    this.text2 = '';
    this.text3 = '';
    this.text4 = '';

    this.leftHeader = this.leftHeader.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handle = this.handle.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClick4 = this.handleClick4.bind(this);

  }

  componentDidMount() {

    this.loadData();

    this.delete = () => {
      this.props.navigation.addListener('focus', () => {
        this.loadData();
      });
    }
  }

  componentWillUnmount() {
    this.delete();
  }

  loadData() {
    this.setState({
      index: 0,
      questionData: {
        status: 200,
        data: [
          {
            key: 1,
            text: 'In photos, your face appears shiny: '
          },
          {
            key: 2,
            text: 'Your face is oily in the T-zone \n ' +
                '     (forehead and nose): '
          },
          {
            key: 3,
            text: 'How often is your facial skin tight?'
          },
          {
            key: 4,
            text:'    You have clogged pores \n' +
                '(blackheads or whiteheads):'
          },
          {
            key: 5,
            text: '   Skin care products (including \n' +
                '    cleanser, moisturizer, toners, \n' +
                '                 and makeup)  \n' +
                '   cause your face to break out, \n' +
                '        get a rash, itch, or sting:'
          },
          {
            key: 6,
            text: 'How often do you get acne?'
          },
          {
            key: 7,
            text: 'Sunscreens make your skin itch, burn,\n' +
            '             break out, or turn red:'
          },
          {
            key: 8,
            text: 'Regular soap for your face and body \n' +
                '           causes skin problems:'
          },
          {
            key: 9,
            text: 'Dark spot on your upper lip or cheeks \n'  +
                '                    are noticeable:'
          },
          {
            key: 10,
            text: ' Do the dark spots on your face get \n' +
                '   worse when you go into the sun?'
          },
          {
            key: 11,
            text: '   After you have a pimple or ingrown hair, \n'+
                '         it is followed by a dark brownish \n' +
                '                            black spot?'
          },
          {
            key: 12,
            text: '   When you go into the sun for the \n' +
                'first time in several months, do you \n' +
                '               develop freckles?'
          },
          {
            key: 13,
            text: 'Does your skin gets darker without burning \n' +
                '   sensation when you go into the sun for \n' +
                '       the first time in several months? '
          },
          {
            key: 14,
            text: 'Your wrinkles are noticeable when you are NOT smiling or frowning:'
          },
          {
            key: 15,
            text: 'During the last five years, how often have you allowed your skin to tan intentionally or unintentionally through outdoor sports or other activities?'
          },
          {
            key: 16,
            text: 'At any time in your life have you ever engaged in seasonal tanning of two weeks per year or less? (Including summer vacation)?'
          },
          {
            key: 17,
            text: 'How often, if ever have you been to a tanning bed?'
          },
          {
            key: 18,
            text: 'How often do you smoke?'
          },
          {
            key: 19,
            text: 'A food-grade wheat polar lipids complex (WPLC) was extracted and purified according to a proprietary manufacturing process. Two grades were produced: an oil form (WPLC-O) and a concentrated powder form (WPLC-P). Briefly, for WPLC-O, this process consisted of successive water/ethanol extractions.'
          },
          {
            key: 20,
            text: 'After solid/liquid separation, the oil extract was concentrated under vacuum. WPLC-P was obtained by successive water/ethanol extractions, solid/liquid separation, and purification with acetone, followed by high-vacuum drying. Both forms of WPLC were extracted from selected wheat (Triticum aestivum, also named vulgare or sativum) endosperm flour.'
          }
        ]
      }
    });
  }

  leftHeader() {
    return (
      <Button
        icon={<Feather name='arrow-left' size={perfectSize(25)} color='#333333' />}
        type='clear'
        onPress={() => {
          this.handleBack();
        }}
      />
    );
  }

  handleBack() {
    this.array.pop();
    this.setState({
      index: this.state.index - 1
    }, () => {
      if (this.state.index < 0) {
        this.props.navigation.goBack();
      }
    });
  }
  handle() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: perfectSize(30), paddingHorizontal: perfectSize(20) }}>
        {
          this.state.questionData.status === 200 &&
          this.state.questionData.data.map((value, index) => {
            if (value.key === this.state.index + 1) {
              return (
                <Text
                  key={index}
                  style={{ fontSize: perfectSize(17) }}
                >
                  {value.text}
                </Text>
              );
            }
          })
        }

      </View>
    );
  }

  handleClick1() {
    this.setState({
      buttonInfo: 'A',
      score: 1
    }, () => { this.handleClick() })
  }

  handleClick2() {
    this.setState({
      buttonInfo: 'B',
      score: 2
    }, () => { this.handleClick() })
  }

  handleClick3() {
    this.setState({
      buttonInfo: 'C',
      score: 3
    }, () => { this.handleClick() })
  }

  handleClick4() {
    this.setState({
      buttonInfo: 'D',
      score: 4
    }, () => { this.handleClick() })
  }

  handleClick = async () => {

    this.array.push(this.state.buttonInfo);
    this.setState({
      index: this.state.index + 1
    }, () => {
      if (this.state.index > 0 && this.state.index < 5) {
        this.sum1 += this.state.score;
        if (this.sum1 > 3 && this.sum1 < 9) {
          this.color1 = this.colors[0];
          this.text1 = 'DRY';
        } else if (this.sum1 > 8 && this.sum1 < 13) {
          this.color1 = this.colors[1];
          this.text1 = 'COMBINATION';
        } else if (this.sum1 > 12 && this.sum1 < 17) {
          this.color1 = this.colors[2];
          this.text1 = 'OILY';
        }
      } else if (this.state.index > 4 && this.state.index < 9) {
        this.sum2 += this.state.score;
        if (this.sum2 > 3 && this.sum2 < 9) {
          this.color2 = this.colors[3];
          this.text2 = 'RESISTANT'
        } else if (this.sum2 > 8 && this.sum2 < 13) {
          this.color2 = this.colors[4];
          this.text2 = 'SLIGHTLY SENSITIVE'
        } else if (this.sum2 > 12 && this.sum2 < 17) {
          this.color2 = this.colors[5];
          this.text2 = 'SENSITIVE'
        }
      } else if (this.state.index > 8 && this.state.index < 14) {
        this.sum3 += this.state.score;
        if (this.sum3 > 4 && this.sum3 < 11) {
          this.color3 = this.colors[6];
          this.text3 = 'NON-PIGMENTED'
        } else if (this.sum3 > 10 && this.sum3 < 21) {
          this.color3 = this.colors[7];
          this.text3 = 'PIGMENTED'
        }
      } else if (this.state.index > 13) {
        this.sum4 += this.state.score;
        if (this.sum4 > 4 && this.sum4 < 11) {
          this.color4 = this.colors[8];
          this.text4 = 'TIGHT'
        } else if (this.sum4 > 10 && this.sum4 < 21) {
          this.color4 = this.colors[9];
          this.text4 = 'WRINKLED'
        }
      }

      if (this.state.index === 18) {
        this.setState({
          index: 0
        }, async () => {
          const jsonValue1 = JSON.stringify({
            result: this.text1,
            color: this.color1
          });
          const jsonValue2 = JSON.stringify({
            result: this.text2,
            color: this.color2
          });
          const jsonValue3 = JSON.stringify({
            result: this.text3,
            color: this.color3
          });
          const jsonValue4 = JSON.stringify({
            result: this.text4,
            color: this.color4
          });
          await AsyncStorage.setItem('result1', jsonValue1);
          await AsyncStorage.setItem('result2', jsonValue2);
          await AsyncStorage.setItem('result3', jsonValue3);
          await AsyncStorage.setItem('result4', jsonValue4);
          this.props.navigation.navigate('TakePicture', {
            color1: this.color1,
            color2: this.color2,
            color3: this.color3,
            color4: this.color4,
            text1: this.text1,
            text2: this.text2,
            text3: this.text3,
            text4: this.text4,
          });
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={this.leftHeader()}
          centerComponent={{ text: `Question ${this.state.index + 1}`, style: { color: '#000', fontSize: perfectSize(25) } }}
          statusBarProps={{ translucent: true }}
          containerStyle={{
            backgroundColor: '#eee',
            justifyContent: 'space-around',
            borderBottomWidth: 1,
            borderBottomColor: '#bbb',
          }}
        />

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: perfectSize(20) }}>
          <Text style={{ color: '#2699FB', fontSize: perfectSize(20) }}>

          </Text>
        </View>

        {
          this.handle()
        }

        <View style={{ width: '100%', marginTop: perfectSize(40), padding: perfectSize(20), position: 'absolute', bottom: perfectSize(30) }}>
          <Button
            icon={
              <Text style={{ fontSize: perfectSize(20) }}>
                Never
              </Text>
            }
            buttonStyle={styles.btn}
            type={'outline'}
            onPress={() => {
              this.handleClick1();
            }}
          />
          <Button
            icon={
              <Text style={{ fontSize: perfectSize(20) }}>
                Sometimes
              </Text>
            }
            buttonStyle={styles.btn}
            type={'outline'}
            onPress={() => {
              this.handleClick2();
            }}
          />
          <Button
            icon={
              <Text style={{ fontSize: perfectSize(20) }}>
                Frequently
              </Text>
            }
            buttonStyle={styles.btn}
            type={'outline'}
            onPress={() => {
              this.handleClick3();
            }}
          />
          <Button
            icon={
              <Text style={{ fontSize: perfectSize(20) }}>
                Always
              </Text>
            }
            buttonStyle={styles.btn}
            type={'outline'}
            onPress={() => {
              this.handleClick4();
            }}
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
  btn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: perfectSize(20)
  },
});
