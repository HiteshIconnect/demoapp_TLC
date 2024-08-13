import React from 'react'
import { useFonts } from 'expo-font';


const withFontWrapper=WrappedComponent=>{

  return (props)=>{

    const [loaded] = useFonts({
        Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
        PoppinsBold:require('../assets/fonts/Poppins-Bold.ttf'),
        PoppinsSemiBold:require('../assets/fonts/Poppins-SemiBold.ttf'),
        PoppinsMedium:require('../assets/fonts/Poppins-Medium.ttf')
      });
    
      if (!loaded) {
        return null;
      }

      return <WrappedComponent {...props}  />
  }
}

export default withFontWrapper