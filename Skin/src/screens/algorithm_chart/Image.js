import React from 'react';
import {View, Text, Image} from 'react-native'
import {Button} from "react-native-elements";

export default class Image1 extends React.Component {

  constructor(props) {
    super(props);
    this.base64 = this.props.route.params.data
  }
  componentDidMount() {
    
  }

  render() {
    const uri = `data:image/png;base64,${this.base64}`
    return (
      < View>
        <Image
          style={{width: 200, height: 350, borderWidth: 1, borderColor: 'red'}}
          source={{uri: uri}}
          resizeMethod='resize'
          resizeMode='contain'
        />
        <Button
          title={'Click here'}
          onPress={() => {
            this.props.navigation.navigate('Chart')
          }}
        />
      </View>
    )

  }
}
