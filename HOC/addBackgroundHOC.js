import React from 'react';
import {  ImageBackground,Image } from 'react-native';

import {loginStyle} from '../styles/loginStyles'
const image = require('../assets/Background.png')
import LoaderModal from '../components/LoaderModal';
import SuccessModal from '../components/SuccessModal';
const withBackroundWrapper=WrappedComponent=>{
    
    return (props)=>{
     
        return (
            <ImageBackground source={image} style={loginStyle.backgroundImage} resizeMode='cover'>
                <LoaderModal />
                <WrappedComponent {...props} />
            </ImageBackground>
        );
    }
  }

export default withBackroundWrapper