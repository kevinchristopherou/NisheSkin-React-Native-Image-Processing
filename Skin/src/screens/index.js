import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';

import First from './First';
import Login from './Login';
import Signup from './Signup';
import ForgetPassword from './ForgetPassword';
import Gender from './Gender';
import Onboarding from './onboaring/Onboarding';
import DoneScreen from './onboaring/DoneScreen';

import Ques_first from './questionaire/Ques_first';
import TakePicture from './questionaire/TakePicture';
import Result from './questionaire/Result';

import Home from './home/Home';

import Algorithm_chart from './algorithm_chart/';
import Algorithm1 from './algorithm_chart/Algorithm1';
import Image from './algorithm_chart/Image';
import Chart from './algorithm_chart/Chart';

import LanguageSelect from './languageSelect/';

import FaceRecognition from './face_recognition/index';
import Saving from './face_recognition/Saving';

import Shopping from './shopping/index';

const Stack = createStackNavigator();


export default class MainApp extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator mode='card' headerMode='none'>
            <Stack.Screen name='Main' component={First}/>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Signup' component={Signup}/>
            <Stack.Screen name='ForgetPassword' component={ForgetPassword}/>
            <Stack.Screen name='Gender' component={Gender}/>
            <Stack.Screen name='Onboarding' component={Onboarding}/>
            <Stack.Screen name='DoneScreen' component={DoneScreen}/>
            <Stack.Screen name='Ques_first' component={Ques_first}/>
            <Stack.Screen name='TakePicture' component={TakePicture}/>
            <Stack.Screen name='Result' component={Result}/>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='LanguageSelect' component={LanguageSelect}/>
            <Stack.Screen name='Algorithm_chart' component={Algorithm_chart}/>
            <Stack.Screen name='Algorithm1' component={Algorithm1}/>
            <Stack.Screen name='Image' component={Image}/>
            <Stack.Screen name='Chart' component={Chart}/>
            <Stack.Screen name='FaceRecognition' component={FaceRecognition}/>
            <Stack.Screen name='Saving' component={Saving}/>
            <Stack.Screen name='Shopping' component={Shopping}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
