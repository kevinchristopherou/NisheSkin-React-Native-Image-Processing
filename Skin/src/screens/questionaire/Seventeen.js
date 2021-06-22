import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Header, Button} from "react-native-elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

export default class Seventeen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionData: '',
      buttonInfo : ''
    };

    this.leftHeader = this.leftHeader.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handle = this.handle.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount(): void {
    this.loadData();
  }

  loadData() {
    // console.log(this.props.route.params);
    let button = [];
    this.setState({
      questionData : this.props.route.params.data,
      buttonInfo : this.props.route.params.buttonInfo
    }, () => {
      this.state.buttonInfo.map(value => {
        button.push(value);
      });
      this.setState({
        buttonInfo : button
      })
    });
  }

  leftHeader() {
    return (
      <Button
        icon={<Feather name='arrow-left' size={25} color='#333333'/>}
        type='clear'
        onPress={() => {
          this.props.navigation.goBack();
        }}
      />
    );
  }

  handle() {
    return (
      <View style={{justifyContent : 'center', alignItems : 'center', marginTop : 30, paddingHorizontal : 20}}>
        {
          this.state.questionData.status === 200 &&
          this.state.questionData.data.map((value, index) => {
            if (value.key === 17) {
              return (
                <Text
                  key = {index}
                  style={{fontSize : 17}}
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
    let button = [];
    this.state.buttonInfo.map(value => {
      button.push(value);
    });
    this.setState({
      buttonInfo : 'A'
    }, () => {
      button.push(this.state.buttonInfo);
      this.setState({
        buttonInfo : button
      }, () => {
        // console.log(this.state.buttonInfo);
        this.handleClick()
      });
    })
  }

  handleClick2() {
    let button = [];
    this.state.buttonInfo.map(value => {
      button.push(value);
    });
    this.setState({
      buttonInfo : 'B'
    }, () => {
      button.push(this.state.buttonInfo);
      this.setState({
        buttonInfo : button
      }, () => {
        // console.log(this.state.buttonInfo);
        this.handleClick()
      });
    })
  }

  handleClick3() {
    let button = [];
    this.state.buttonInfo.map(value => {
      button.push(value);
    });
    this.setState({
      buttonInfo : 'C'
    }, () => {
      button.push(this.state.buttonInfo);
      this.setState({
        buttonInfo : button
      }, () => {
        // console.log(this.state.buttonInfo);
        this.handleClick()
      });
    })
  }

  handleClick4() {
    let button = [];
    this.state.buttonInfo.map(value => {
      button.push(value);
    });
    this.setState({
      buttonInfo : 'D'
    }, () => {
      button.push(this.state.buttonInfo);
      this.setState({
        buttonInfo : button
      }, () => {
        // console.log(this.state.buttonInfo);
        this.handleClick()
      });
    })
  }

  handleClick() {
    this.props.navigation.navigate('Eighteen', {
      data : this.state.questionData,
      buttonInfo : this.state.buttonInfo
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={this.leftHeader()}
          centerComponent={{text: 'Question 17', style: {color: '#000', fontSize: 25}}}
          statusBarProps={{translucent: true}}
          containerStyle={{
            backgroundColor: '#eee',
            justifyContent: 'space-around',
            borderBottomWidth: 1,
            borderBottomColor: '#bbb',
          }}
        />

        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
          <Text style={{color: '#2699FB', fontSize: 20}}>
            Trditev vprasanja 17
          </Text>
        </View>

        {
          this.handle()
        }

        <View style={{width: '100%', marginTop: 40, padding : 20, position : 'absolute', bottom : 30}}>
          <Button
            icon={
              <Text style={{fontSize: 20}}>
                A
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
              <Text style={{fontSize: 20}}>
                B
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
              <Text style={{fontSize: 20}}>
                C
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
              <Text style={{fontSize: 20}}>
                D
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
    // backgroundColor: '#3C82FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius : 5,
    borderWidth : 1,
    borderColor : '#000',
    marginTop : 20
  },
});
