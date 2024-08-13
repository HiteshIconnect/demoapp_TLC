import React, { useEffect } from 'react';
import { Animated, Text, View, ImageBackground, Image, Easing } from 'react-native';

const image = require('../assets/Background.png')
const logo = require('../assets/lookCompanyLogo.png')
import { loginStyle } from '../styles/loginStyles'
import {splashStyles}  from '../styles/splashStyles'

const SplashScreen = ({ navigation }) => {

  const startValue = new Animated.Value(0);
  const endValue = -170;
  const duration = 1000;

  useEffect(() => {

    Animated.timing(startValue, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      navigation.replace('Login')
    }, 2000)
  }, [startValue, endValue, duration])

  return (
    <ImageBackground source={image} style={loginStyle.backgroundImage} resizeMode='cover'>
      <View style={loginStyle.container}>
        <Animated.View style={[splashStyles.animatedWidth, { transform: [{ translateY: startValue }] }]}>
          <Image source={logo} style={splashStyles.anLogostyle} resizeMode='contain' />
        </Animated.View>
      </View>
    </ImageBackground>
  )
}

export default SplashScreen