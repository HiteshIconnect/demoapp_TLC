import React,{ useState,useEffect } from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import {changeQtyInputStyle} from '../styles/ChangeQtyInputStyles'


const ChangeQtyInput=({value,handler,dimensions,itemNo,disableAdd,disableSubtract})=>{

    return (
        <View style={[changeQtyInputStyle.container, dimensions ? {width:dimensions.width,height:dimensions.height}:{}]}>
            <View style={changeQtyInputStyle.inputFlexWrapper}>
                {
                    !disableSubtract && <TouchableOpacity onPress={()=>handler(itemNo,value,'-')}>
                        <Image style={changeQtyInputStyle.imageWidth} source={require('../assets/decrease-icon.png')} />
                    </TouchableOpacity>
                }
                <TextInput 
                keyboardType="numeric"
                placeholderTextColor="#E11D38"
                onChangeText={(val)=>handler(itemNo,val)} placeholder="qty" value={value?.toString()} style={changeQtyInputStyle.inputStyle} />
                {
                    !disableAdd && <TouchableOpacity onPress={()=>handler(itemNo,value,'+')}>
                        <Image style={changeQtyInputStyle.imageWidth} source={require('../assets/increase-icon.png')} />
                    </TouchableOpacity>
                } 
            </View>
        </View>
    )
}


export default ChangeQtyInput