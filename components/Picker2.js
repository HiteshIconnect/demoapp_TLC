import React,{useState,useEffect} from 'react'
import {connect } from 'react-redux'
import { Text, View, ImageBackground, Image, TextInput,StyleSheet, FlatList ,SafeAreaView, TouchableWithoutFeedback ,ScrollView} from 'react-native';
import {pickerStyle} from '../styles/PickerStyles'
import { LogBox } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'

const Picker2 =({value,list,handler,disable,containerStyle,opacityStyle})=>{
    
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    const [show,setPickerOpen]=useState(false)

    const pickerHander=()=>{
        if(disable) return
        setPickerOpen(!show)
    }

    return (
        <View style={[pickerStyle.container,containerStyle ? {...containerStyle}:{}]}>
            <TouchableOpacity 
                onPress={()=>{ if(disable) return;
                    pickerHander()}
                } 
                style={[pickerStyle.opacityWrapper,opacityStyle ? {...opacityStyle}:{}]}
            >
                    <Text style={[pickerStyle.textStyle,disable ? {color:'rgba(225, 29, 56, 0.5)',}:{}]}>{value}</Text>
                    <Image source={require('../assets/dropdown-icon-red.png')} />
            </TouchableOpacity>

            { show ?    
                //    <SafeAreaView style={{flex: 1}}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    nestedScrollEnabled = {true}
                    contentContainerStyle={pickerStyle.flatListContentStyle}
                    style={[pickerStyle.flatListStyle]}
                    data={list}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={()=>{
                                handler(item.title)
                                setPickerOpen(false)
                            }}
                            style={pickerStyle.itemStyle}>
                            {/* <Image source={require('../assets/list-icon.png')} /> */}
                            <Text style={pickerStyle.itemTextStyle}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    /> 
                //   </SafeAreaView>
                    :
                    null 
                }
        </View>
    )
}


export default Picker2