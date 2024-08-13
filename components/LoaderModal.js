import Modal from 'react-native-modal';
import React,{useState} from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
// import {selectModalStatus,sendErrorMessage,sendHandler} from '../redux/errorModal/selector'
import {selectLoaderModalStatus,sendLoaderMessage} from '../redux/loaderModal/selector';
import { selectSuccessModalStatus } from '../redux/successModal/selector';
import {selectModalStatus} from '../redux/errorModal/selector';
// import {setModal,unsetError} from '../redux/errorModal/actions'
import { loaderModalStyles } from '../styles/loaderModalStyles';
import FastImage from 'react-native-fast-image'
import AddFontHOC from '../HOC/addFontHOC'
const loading=require('../assets/loading.gif')

const LoaderModal=({isOpen,message,handler,setModal,unsetError, isSuccessOpen,isErrorOpen})=>{
    console.log(`inside loader ${isOpen}|| isSuccessOpen ${isSuccessOpen} || isErrorOpen${isErrorOpen}`);
    if (isSuccessOpen || isErrorOpen) return null;
    return (
       <Modal
        isVisible={isOpen} 
        // onBackdropPress={} 
        style={loaderModalStyles.modalContainer}>
           <View style={loaderModalStyles.container}>
                    <View style={loaderModalStyles.barStyle}></View>
                    <View style={loaderModalStyles.contentContainer}>
                      
                        <View style={loaderModalStyles.textContainer}>
                             <Text style={loaderModalStyles.titleStyle}>{`Loading`}</Text>
                             {/* <Text style={loaderModalStyles.messageStyle}>{`Fetching data `}</Text> */}
                        </View>

                        <FastImage
                        style={{ width: 300, height: 200 }}
                        source={{
                            uri: 'https://i.pinimg.com/originals/ec/d6/bc/ecd6bc09da634e4e2efa16b571618a22.gif',
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                        
                        {/* <View
                         style={loaderModalStyles.buttonContainer}>
                            <Text style={loaderModalStyles.buttonText}>Loading....</Text>
                        </View> */}
                    </View>
           </View>
       </Modal>
    )
}

const mapStateToProps=createStructuredSelector({
  isOpen:selectLoaderModalStatus,
  message:sendLoaderMessage,
    //   handler:sendHandler
    isSuccessOpen: selectSuccessModalStatus,
    isErrorOpen: selectModalStatus
})

export default connect(mapStateToProps,{
})(LoaderModal)