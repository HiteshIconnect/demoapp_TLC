import React from 'react';
import {  ImageBackground,Image } from 'react-native';

import {loginStyle} from '../styles/loginStyles'
const image = require('../assets/Background.png')
import SuccessModal from '../components/SuccessModal';

const successLoaderWrapper=WrappedComponent=>{
    return (props)=>{
     
        return (
            <ImageBackground source={image} style={loginStyle.backgroundImage} resizeMode='cover'>
                <SuccessModal />
                <WrappedComponent {...props} />
            </ImageBackground>
          );
    }
}

export default successLoaderWrapper