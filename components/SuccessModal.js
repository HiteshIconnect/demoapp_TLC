import Modal from 'react-native-modal';
import React,{useEffect, useState} from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
// import {selectModalStatus,sendErrorMessage,sendHandler} from '../redux/errorModal/selector'
import { selectSuccessModalStatus,sendSuccessHandler,sendSuccessMessage } from '../redux/successModal/selector'
// import {setModal,unsetError} from '../redux/errorModal/actions'
import {setSuccessModal,unsetSuccess} from '../redux/successModal/actions'
const closeIcon=require('../assets/closeIcon.png')
const successIcon=require('../assets/successIcon.png')

const SuccessModal=({isOpen,message,handler,setSuccessModal,unsetSuccess})=>{
  console.log('should modal open is ',isOpen)
    return (
        <Modal isVisible={isOpen} onBackdropPress={()=>setSuccessModal(!isOpen)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
           <View style={{height:'50%',width:'110%',backgroundColor:'white',borderRadius:10,flexDirection:'column',top:'3%',padding:'3%'}}>
                  <View style={{flex:2}}>
                     <TouchableOpacity onPress={()=>unsetSuccess()} style={{flexDirection:'row',justifyContent:'flex-end'}}>
                         <Image source={closeIcon}  />
                     </TouchableOpacity>
                  </View>
                  <View style={{flex:3}}>
                      <TouchableOpacity style={{flexDirection:'row',justifyContent:'center'}}>
                            <Image source={successIcon}  />
                     </TouchableOpacity>
                  </View>
                  <View style={{flex:2,flexDirection:'row',paddingHorizontal:"10%"}}>
                    <Text style={{fontSize:18,fontFamily:'Poppins-Medium',textAlign:'center'}}>{message.description}</Text>
                  </View>
           </View>
        </Modal>       
    )
}    

const mapStateToProps=createStructuredSelector({
    isOpen:selectSuccessModalStatus,
    message:sendSuccessMessage,
    handler:sendSuccessHandler
  })
  
  export default connect(mapStateToProps,{
    setSuccessModal,
    unsetSuccess
  })(SuccessModal)