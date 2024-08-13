import React from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import {changeQtyInputStyle} from '../styles/ChangeQtyInputStyles'


const ChangeQtyInput=({value,handler,dimensions})=>{

    const updateVal = (val) => {
        const numVal = val.replace(/[^0-9]/g, '')
        handler(numVal,'quantityreceived')
    }
    const increment = () => {
        handler(parseInt(value)+1,'quantityreceived')
    }

    return (
        <View style={[changeQtyInputStyle.container, dimensions ? {width:dimensions.width,height:dimensions.height}:{}]}>
            <View style={changeQtyInputStyle.inputFlexWrapper}>
                {value>0&&<TouchableOpacity onPress={()=>handler(parseInt(value)-1,'quantityreceived')}>
                            <Image style={changeQtyInputStyle.imageWidth} source={require('../assets/decrease-icon.png')} />
                        </TouchableOpacity>}
                
                <TextInput 
                keyboardType="numeric"
                placeholderTextColor="#E11D38"
                onChangeText={(val)=>{
                    updateVal(val)
                } } 
                placeholder="qty" value={value.toString()} style={changeQtyInputStyle.inputStyle} />
                    
                {value<dimensions&&<TouchableOpacity 
                onPress={increment}
                disabled={value===""}
                >
                    <Image style={changeQtyInputStyle.imageWidth} source={require('../assets/increase-icon.png')} />
                </TouchableOpacity>}
            </View>
        </View>
    )
}


export default ChangeQtyInput