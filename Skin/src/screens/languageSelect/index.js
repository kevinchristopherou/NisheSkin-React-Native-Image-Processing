import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {create, PREDEF_RES} from 'react-native-pixel-perfect';
import {Button} from "react-native-elements";

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class LanguageSelect extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert('english selected');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.lan}>
          <Text style={{fontSize : perfectSize(20)}}>
            CHOOSE YOUR LANGUAGE
          </Text>
        </View>

        <View style={styles.btnGroup}>

          <TouchableOpacity style={styles.btn} onPress={() => {this.handleClick()}}>
            <Text style={{color: '#707070', fontSize: perfectSize(25)}}>
              English
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => {this.handleClick()}}>
            <Text style={{color: '#707070', fontSize: perfectSize(25)}}>
              SLOVENSKI
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => {this.handleClick()}}>
            <Text style={{color: '#707070', fontSize: perfectSize(25)}}>
              DEUTSCH
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => {this.handleClick()}}>
            <Text style={{color: '#707070', fontSize: perfectSize(25)}}>
              FRANCAIS
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding : perfectSize(40)
  },
  lan : {
    borderBottomWidth : 3,
    borderBottomColor : '#CCCCCC',
    padding : perfectSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : perfectSize(30)
  },
  btn: {
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGroup : {
    flexGrow : 1,
    justifyContent : 'space-around',
  }
});
