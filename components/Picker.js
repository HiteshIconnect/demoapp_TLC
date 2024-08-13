import React,{useState,useEffect} from 'react'
import {connect } from 'react-redux'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity,StyleSheet, FlatList ,SafeAreaView } from 'react-native';
import {pickerStyle} from '../styles/PickerStyles'
// import {setModalData,} from '../redux/picker/actions'
// import {selectModalStatus} from '../redux/picker/selector'
// import { createStructuredSelector } from "reselect";
// import {setModal} from '../redux/picker/actions'
import { LogBox } from 'react-native';

const Picker=({value,list,handler,disable,pickerWidth})=>{
    
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    const [show,setPickerOpen]=useState(false);

    const pickerHander=()=>{
        if(disable) return
        setPickerOpen(!show)
    }
    
    return (
        <>
            <TouchableOpacity onPress={()=>{pickerHander()}} style={pickerStyle.opacityWrapper}>
                <Text style={pickerStyle.textStyle}>{value}</Text>
                <Image source={require('../assets/dropdown-icon-red.png')} />
           </TouchableOpacity>

           { show ?
            //  <SafeAreaView style={{flex: 1}}>
                <FlatList
                nestedScrollEnabled = {true}
                // contentContainerStyle={{height:'100%', paddingBottom: 20 }}
                style={[{width:"80%",flexGrow: 0,height:200,borderWidth:1,borderRadius:5,zIndex:44,position:'absolute',top:0,backgroundColor:"red"}]}
                    data={list}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            
                            onPress={()=>{
                                handler(item.title)
                                setPickerOpen(false)
                            }}
                            style={{borderBottomWidth:0.4,padding:'2%',flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
                            <Image source={require('../assets/list-icon.png')} />
                            <Text style={{fontFamily:"Poppins",fontSize:16,lineHeight:24,marginLeft:"6%"}}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    /> 
                //   </SafeAreaView>
                    :
                    null 
             }
        </>   
    )
}

export default Picker