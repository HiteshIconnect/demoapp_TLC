import React,{useState} from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity,StyleSheet } from 'react-native';

const Slider=({status,setStatus})=>{
    
    return (
        <TouchableOpacity onPress={()=>setStatus(!status)} style={{width:210,height:43,borderWidth:1,borderColor:'red',borderRadius:50,overflow:"hidden",backgroundColor:"white"}}>
            <View style={{flexDirection:'row',height:"100%"}}>
              <View style={[{width:"50%",justifyContent:"center",alignItems:"center",borderRadius:50},status ? {backgroundColor:"#E11D38"}:{backgroundColor:"white"}]}>
                  <Text style={[{fontSize:16},status ? {color:"white"}:{color:"black"}]}>From</Text>
              </View>
              <View style={[{width:"50%",justifyContent:"center",alignItems:"center",borderRadius:50,backgroundColor:"yellow"},status ? {backgroundColor:"white"}:{backgroundColor:"#E11D38"}]}>
                    <Text style={[{fontSize:16},status ? {color:"black"}:{color:"white"}]}>To</Text>
              </View>
            </View>
        </TouchableOpacity>
    )
}


export default Slider