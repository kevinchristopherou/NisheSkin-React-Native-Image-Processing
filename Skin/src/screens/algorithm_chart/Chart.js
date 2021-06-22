import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Button, Tooltip, CheckBox, Header, Overlay } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import Feather from 'react-native-vector-icons/Feather'
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import FusionCharts from "react-native-fusioncharts";

import REQUEST from "../../services/Request";
import { ENDPOINT } from '../../config/endpoint';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      chartData: '',
      captureAvailable: false,
      showTooltip: false,
      weekStatus: true,
      monthStatus: false,
      yearStatus: false,
      type: 'timeseries',
      dataFormat: 'json',
      dataSource: {
        yAxis: [
          {
            plot: {
              value: 'Invest Value',
              type: 'line'
            },
          }
        ],
        xaxis: {
          initialinterval: {
            from: "2020-06-18",
            to: "2020-06-24"
          }
        },
        // renderAt: 'container',
        chart: {
          animation: true,
          palettecolors: '#2179fc',
          style: {
            background: {
              fill: "#fff"
            },
            canvas: {
              fill: "#fff"
            },
          },
          theme: "fusion",
          showLegend: 0,
          showLabels: 0,
        },
        extensions: {
          customRangeSelector: {
            enabled: 0
          },
          standardRangeSelector: {
            enabled: 1
          }
        },
        tooltip: {
          enabled: "1",
          style: {
            container: {
              "border-color": "#fff",
              "background-color": "red",
              "padding": "10px",
              "borderRadius": 10
            },
            text: {
              "color": "#fff"
            },
            header: {
              "color": "#fff",
            },
            body: {
              "color": "#fff"
            }
          }
        },
        navigator: {
          enabled: 0,
        },
      },
      schemaJson: [
        {
          "name": "Time",
          "type": "date",
          "format": "%Y-%m-%d"
        },
        {
          "name": " ",
          "type": "number"
        }
      ],
      dataJson: null
    };

    this.captureFace = this.captureFace.bind(this);

    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      ios: require('../../../assets/fusioncharts.html'),
      android: { uri: 'file:///android_asset/fusioncharts.html' },
    });
  }


  componentDidMount(): void {
    this.getData();

    this.delete = this.props.navigation.addListener('focus', () => {
      this.getData();
    });

  }

  componentWillUnmount() {
    this.delete();
  }

  getData = async () => {
    this.setState({ loading: true });
    const token = await AsyncStorage.getItem('token');
    console.log(token)
    // const token = '6b2646f42fce9c18a5de712fe5ea3b9a'
    let period = '0';
    let payload = { token, period };
    let response = await REQUEST.post_chart_log(ENDPOINT.POST_CHART_LOG, payload);
    this.setState({ loading: false })
    console.log(response);
    // if (response )
    if (response.code == 0) {
      if (response.content != '') {
        let array = []
        response.content.map((value, index) => {
          let temp = [];
          temp[0] = value.date;
          temp[1] = value.result;
          array.push(temp);
        })
        console.log(array);
        this.setState({
          chartData: array
        })

        //Compare the time before you captured  :  with date, month, and year
        const length = response.content.length;
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        if (month > 0 && month < 10) {
          month = '0' + month;
        }
        let year = new Date().getFullYear();
        let compare = year + '-' + month + '-' + date;
        console.log(month)
        console.log(new Date())
        console.log(compare);
        console.log(response.content[length - 1].date);
        if (compare == response.content[length - 1].date) {
          this.setState({
            captureAvailable: false
          })
        } else {
          this.setState({
            captureAvailable: true
          })
        }
      } else {
        this.setState({
          captureAvailable: true
        })
      }

    } else if (response.code == 1) {
      alert('Invalid Request');
    } else if (response.code == 8) {
      alert('Invalid Period');
    }
  };

  captureFace() {
    if (this.state.captureAvailable) {
      this.props.navigation.navigate('Algorithm1')
    } else {
      this.setState({
        showTooltip: true
      })
    }
  }

  weekChart() {
    this.setState({
      weekStatus: true,
      monthStatus: false,
      yearStatus: false
    });
    this.getData()
  }

  monthChart() {
    this.setState({
      weekStatus: false,
      monthStatus: true,
      yearStatus: false
    });
    // this.getchartData('1');
    this.getData()
  }

  yearChart() {
    this.setState({
      weekStatus: false,
      monthStatus: false,
      yearStatus: true
    });
    // this.getchartData('2');
    this.getData()
  }

  handleBack() {
    return (
      <Button
        icon={<Feather name='arrow-left' size={perfectSize(25)} color='#333333' />}
        type='clear'
        onPress={() => {
          this.props.navigation.navigate('Home');
        }}
      />
    )
  }

  render() {
    const color = this.state.captureAvailable ? 'blue' : 'red';

    return (
      <View style={styles.container}>

        <Header
          leftComponent={this.handleBack()}
          statusBarProps={{ translucent: true }}
          containerStyle={{
            backgroundColor: '#eee',
            justifyContent: 'space-around',
            borderBottomWidth: 1,
            borderBottomColor: '#bbb',
          }}
        />

        <View style={{ width: '100%', marginTop: perfectSize(50), marginLeft: perfectSize(-20), justifyContent : 'center', alignItems : 'center'}}>
          {/* <View style={{ width: '100%', height: perfectSize(500)}}> */}
            <FusionCharts
              dataJson={this.state.chartData}
              schemaJson={this.state.schemaJson}
              type={this.state.type}
              width={'108%'}
              height={400}
              dataFormat={this.state.dataFormat}
              dataSource={this.state.dataSource}
              libraryPath={this.libraryPath} // set the libraryPath property
            />
            {/* <View style={{
              position: 'absolute', top: perfectSize(332), width: perfectSize(105), height: perfectSize(20), backgroundColor: '#fff'
            }} /> */}
          {/* </View> */}




          {/* <View style={styles.checkbok}>
            <CheckBox
              title={'WEEKLY'}
              checkedColor='#2699FB'
              uncheckedColor={'#2699FB'}
              iconType={'materialIcons'}
              checkedIcon={'check-box'}
              uncheckedIcon={'check-box-outline-blank'}
              checked={this.state.weekStatus}
              onPress={() => { this.weekChart() }}
              containerStyle={{ borderWidth: 0 }}
              textStyle={{ fontSize: perfectSize(22), color: '#2699FB' }}
            />

            <CheckBox
              title={'MONTHLY'}
              checkedColor='#2699FB'
              uncheckedColor={'#2699FB'}
              iconType={'materialIcons'}
              checkedIcon={'check-box'}
              uncheckedIcon={'check-box-outline-blank'}
              checked={this.state.monthStatus}
              onPress={() => { this.monthChart() }}
              containerStyle={{ borderWidth: 0 }}
              textStyle={{ fontSize: perfectSize(22), color: '#2699FB' }}
            />

            <CheckBox
              title={'YEARLY'}
              checkedColor='#2699FB'
              uncheckedColor={'#2699FB'}
              iconType={'materialIcons'}
              checkedIcon={'check-box'}
              uncheckedIcon={'check-box-outline-blank'}
              checked={this.state.yearStatus}
              onPress={() => { this.yearChart() }}
              containerStyle={{ borderWidth: 0 }}
              textStyle={{ fontSize: perfectSize(22), color: '#2699FB' }}
            />
          </View> */}
        </View>

        <View style={styles.tooltip}>
          {
            this.state.captureAvailable &&
            <View style={{ width: '100%', paddingHorizontal: 20 }}>
              <Button
                title={'CHECK YOUR SKIN'}
                buttonStyle={{ backgroundColor: color, marginBottom: 0, borderRadius: 10, padding: 20, width: '100%', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => { this.captureFace() }}
                titleStyle={{ color: '#fff', fontSize: 20 }}
              />
            </View>
          }

          {
            !this.state.captureAvailable &&
            <View style={{ width: '100%', paddingHorizontal: 20 }}>
              <Tooltip
                ref={'tooltip'}
                popover={
                  <Text>
                    You can check again in 24 hours.
                </Text>
                }
                backgroundColor={'#2699FB'}
                containerStyle={{ justifyContent: 'center', alignItems: 'center', width: 280 }}
                width={perfectSize(300)}
              >
                <View
                  style={{
                    backgroundColor: color, padding: perfectSize(20), justifyContent: 'center', alignItems: 'center',
                    borderRadius: 10, width: '100%'
                  }}
                >
                  <Text style={{ fontSize: perfectSize(20), color: 'white' }}>CHECK YOUR SKIN</Text>
                </View>
              </Tooltip>
            </View>
          }
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
    backgroundColor: '#fff',
  },
  tooltip: {
    position: 'absolute',
    bottom: perfectSize(30),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbok: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: perfectSize(10),
    marginLeft: perfectSize(100)
  }
});
