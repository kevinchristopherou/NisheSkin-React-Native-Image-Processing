import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import {Button, Header, Image} from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";
import {create, PREDEF_RES} from 'react-native-pixel-perfect';
import AsyncStorage from "@react-native-community/async-storage";

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class Algorithm_chart extends React.Component {
  constructor(props) {
    super(props);

    this.leftHeader = this.leftHeader.bind(this);
  }

  componentDidMount(): void {
    this.getInfo();
  }

  getInfo = async () => {
    const algorithm1_date = await AsyncStorage.getItem('algorithm1_date');
  };

  leftHeader() {
    return (
      <Button
        icon={<Feather name='arrow-left' size={perfectSize(25)} color='#333333'/>}
        type='clear'
        onPress={() => {
          this.props.navigation.goBack();
        }}
      />
    );
  }

  handleClick() {
    this.props.navigation.navigate('Chart');
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={this.leftHeader()}
          centerComponent={{text: 'SKIN TRACKING', style: {fontSize: perfectSize(20)}}}
          statusBarProps={{translucent: true}}
          containerStyle={{
            backgroundColor: '#eee',
            justifyContent: 'space-around',
            borderBottomWidth: 1,
            borderBottomColor: '#bbb',
          }}
        />

        <View style={styles.imageView}>
          <Image source={require('../../assets/images/selfie.png')}
                 style={{width: perfectSize(150), height: perfectSize(150)}}
                 resizeMethod='resize'
                 resizeMode='contain'
          />
          <View style={{marginTop: perfectSize(20)}}>
            <Image source={require('../../assets/images/Connector.png')}
                   style={{width: perfectSize(150), height: perfectSize(70)}}
                   resizeMethod='resize'
                   resizeMode='contain'
            />
          </View>
          <Image source={require('../../assets/images/chart.png')}
                 style={{width: perfectSize(150), height: perfectSize(150)}}
                 resizeMethod='resize'
                 resizeMode='contain'
          />

          <Text style={{fontSize : perfectSize(20)}}>
            INSTRUCTIONS
          </Text>

          <Text style={{fontSize : perfectSize(15), marginTop : perfectSize(20), textAlign: "center"}}>
            Choose the same time of the day, take a selfie
            and monitor your skin health. Come back
            24 hours later and take another selfie to see
            changes of your overall facial skin health. Values close to 1.0 represent healthy skin, while lower values
            represent damaged skin.

          </Text>

        </View>

        <View style={{width : '100%',padding : perfectSize(20), position : 'absolute', bottom : perfectSize(30)}}>
          <Button
            icon={
              <Text style={{color: 'white', fontSize: perfectSize(25), fontWeight : 'bold'}}>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F1F9FF'
  },
  imageView : {
    justifyContent: 'center',
    alignItems : 'center',
    marginTop: perfectSize(30)
  },
  btn: {
    width: '100%',
    backgroundColor: '#5CAB72',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
});
