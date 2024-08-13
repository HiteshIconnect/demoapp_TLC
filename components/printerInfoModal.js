import Modal from 'react-native-modal';
import React,{useState} from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
import {printerStyles} from '../styles/printerInfoModalStyles'
import {selectPrinterIp} from '../redux/user/selector'
import { setPrinterIp } from '../redux/user/actions';
import {setError,unsetError } from '../redux/errorModal/actions'

const ErrorModal=({printerIp,isOpen,setModal,printFile,setPrinterIp,setError})=>{

    
const [editMode,setEditMode]=useState(false)
const [ip,setIp]=useState(printerIp)

const validateIp=()=>{
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {  
        return (true)  
    }
    return false  
}

const saveIp=()=>{
    const valid=validateIp(ip)
    if(valid){
        setPrinterIp(ip)
        setEditMode(false)
        return
    }
    setError('Oops','IP address is not of correct format','')
}

    return (
       <Modal isVisible={isOpen} onBackdropPress={()=>setModal(!isOpen)} style={printerStyles.modalContainer}>
           <View style={printerStyles.container}>
                <View style={printerStyles.barStyle}></View>
                <View style={printerStyles.contentContainer}>
                    <View style={printerStyles.textContainer}>
                    <Text style={printerStyles.titleStyle}>Printer IP </Text>
                        {   
                        !editMode ? (
                            <>
                            <Text style={printerStyles.titleStyle}> {printerIp}</Text>
                            <TouchableOpacity onPress={()=>setEditMode(true)}>
                            <View>
                                <Text>Edit</Text>
                            </View>
                        </TouchableOpacity>
                        </>
                        ):
                        (
                            <>
                            <TextInput 
                            style={[printerStyles.titleStyle,printerStyles.inputBox]}
                            value={ip} 
                            onChangeText={(val)=>{
                                setIp(val)
                            }}
                                />
                            <TouchableOpacity onPress={()=>{
                            saveIp()
                            }}>
                            <View>
                                <Text>Save</Text>
                            </View>
                            </TouchableOpacity>
                            </>
                        )
                        }    
                    </View>
                    
                    <TouchableOpacity
                    onPress={()=>printFile()}
                        style={printerStyles.buttonContainer}>
                        <Text style={printerStyles.buttonText}>Print</Text>
                    </TouchableOpacity>
                </View>
           </View>

       </Modal>
    )
}

const mapStateToProps=createStructuredSelector({
 printerIp:selectPrinterIp
})

export default connect(mapStateToProps,{
    setPrinterIp,
    setError
})(ErrorModal)