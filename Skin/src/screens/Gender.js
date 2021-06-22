import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {create, PREDEF_RES} from 'react-native-pixel-perfect';

import I18n from '../utils/languages/languageUtils';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class Gender extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: '#fff', fontSize: perfectSize(20)}}>
          {I18n.t('GENDER')}
        </Text>

        <View style={{flexDirection: 'row', width : '100%', justifyContent : 'space-around', alignItems : 'center', marginTop : perfectSize(70)}}>
          <TouchableOpacity
            style={{justifyContent : 'center', alignItems : 'center'}}
            onPress={() => {this.props.navigation.navigate('Onboarding')}}
          >
            <Ionicons
              name='ios-woman'
              size={perfectSize(200)}
              color='white'
            />
            <Text  style={{color: '#fff', fontSize: perfectSize(20)}}>
              {I18n.t('FEMALE')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{justifyContent : 'center', alignItems : 'center'}}
            onPress={() => {this.props.navigation.navigate('Onboarding')}}
          >
            <Ionicons
              name='ios-man'
              size={perfectSize(200)}
              color='white'
            />
            <Text  style={{color: '#fff', fontSize: perfectSize(20)}}>
              {I18n.t('MALE')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#54D2D2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
