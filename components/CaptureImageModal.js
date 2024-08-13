import Modal from 'react-native-modal';
import React,{useState} from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
import {toggleCaptureModal,setCaptureModal,unsetCaptureModal} from '../redux/captureModal/actions'
import {sendCaptureModalStatus} from '../redux/captureModal/selector'
import { capModalStyles } from '../styles/CaptureImageModalStyles';

const CaptureImageModal=({isOpen,scan,message,selectedItem,changeTempList,setList,handler,setCaptureModal,unsetCaptureModal,toggleCaptureModal,navigation,extraProps,mode,searchMore})=>{

  const onPressModalButton=()=>{  
    if(handler){
      
       handler(extraProps)
       return toggleCaptureModal(false)
    }
    navigation.navigate('InstallationCamera',{
      selectedItem
    })
  }
 
  const onSearchMore = (more) => {
    searchMore(more)
    return toggleCaptureModal(false)
  }

  if(mode === 'multiple search'){
    return (
        <Modal isVisible={isOpen} onBackdropPress={()=>toggleCaptureModal(!isOpen)} style={capModalStyles.modalContainer}>
           <View style={capModalStyles.container}>
              <View style={capModalStyles.descContainer}>
                <Text style={capModalStyles.descContText}>Search More</Text>
              </View>
              <View  style={capModalStyles.secondaryContainer}>
                <Text style={capModalStyles.secondaryContText}>{`Do you want to search more Work Orders?`}</Text>
              </View>

              <View style={capModalStyles.buttonWrapper}>
                  <TouchableOpacity style={capModalStyles.buttonContainer} onPress={()=>onSearchMore(true)}>
                        <Text style={capModalStyles.buttonText} >Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={capModalStyles.buttonContainer} onPress={()=>onSearchMore(false)}>
                        <Text style={capModalStyles.buttonText} >No</Text>
                  </TouchableOpacity>
              </View>
           </View>
        </Modal>       
    )
  }else{
    return (
        <Modal isVisible={isOpen} onBackdropPress={()=>toggleCaptureModal(!isOpen)} style={capModalStyles.modalContainer}>
           <View style={capModalStyles.container}>
                 <View style={capModalStyles.descContainer}>
                    <Text style={capModalStyles.descContText}>{scan ? 'Scan More' : 'Capture Image'}</Text>
                 </View>
                 <View  style={capModalStyles.secondaryContainer}>
                     <Text style={capModalStyles.secondaryContText}>{scan ? 'Do you want to scan more Work Orders?' : `Capture Atleast one Image of each line item to update and complete the installation process`}</Text>
                 </View>
                 <TouchableOpacity style={capModalStyles.buttonWrapper}
                    onPress={()=>onPressModalButton()}>
                     <View style={capModalStyles.buttonContainer}>
                            <Text style={capModalStyles.buttonText}>{scan ? 'Yes' : 'I, Understand'}</Text>
                     </View>
                  </TouchableOpacity>
                     {
                       scan ?
                       <TouchableOpacity style={capModalStyles. buttonWrapper} onPress={()=>{
                         toggleCaptureModal(false)
                         }}>
                         <View style={capModalStyles.buttonContainer}>
                            <Text style={capModalStyles.buttonText} >No</Text>
                          </View>
                     </TouchableOpacity> : null
                     }
           </View>
        </Modal>       
    )
  }
}    

const mapStateToProps=createStructuredSelector({
    isOpen:sendCaptureModalStatus,
  })
  
  export default connect(mapStateToProps,{
    toggleCaptureModal,
    setCaptureModal,
    unsetCaptureModal
  })(CaptureImageModal)