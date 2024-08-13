import Modal from 'react-native-modal';
import React,{useState} from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
import {selectModalStatus,sendErrorMessage,sendHandler} from '../redux/errorModal/selector'
import {setModal,unsetError} from '../redux/errorModal/actions'
import { errorMStyles } from '../styles/errorModalStyles';

const ErrorModal=({isOpen,message,handler,setModal,unsetError})=>{

// const [isModalVisible, setModalVisible] = useState(true);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

    return (
       <Modal isVisible={isOpen} onBackdropPress={()=>setModal(!isOpen)} style={errorMStyles.modalContainer}>
           <View style={errorMStyles.container}>
                    <View style={errorMStyles.barStyle}></View>
                    <View style={errorMStyles.contentContainer}>
                        <Image style={{}} source={require('../assets/errorModal.png')} />

                        <View style={errorMStyles.textContainer}>
                             <Text style={errorMStyles.titleStyle}>{message.title}</Text>
                             <Text style={errorMStyles.messageStyle}>{message.description}</Text>
                        </View>
                        
                        <TouchableOpacity
                        onPress={()=>setModal(!isOpen)}
                         style={errorMStyles.buttonContainer}>
                            <Text style={errorMStyles.buttonText}>Try Again</Text>
                        </TouchableOpacity>
                    </View>
           </View>

       </Modal>
    )
}

const mapStateToProps=createStructuredSelector({
  isOpen:selectModalStatus,
  message:sendErrorMessage,
  handler:sendHandler
})

export default connect(mapStateToProps,{
    setModal,
    unsetError
})(ErrorModal)