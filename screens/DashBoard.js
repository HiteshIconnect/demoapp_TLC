import React, { useState,useEffect } from 'react'
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { dashboardStyle } from '../styles/dashboardStyles'
import { purchaseOrderStyle } from '../styles/purchaseOrder';
import { DashboardHeader } from '../components/DashboardHeader';
import isAuthHOC from "../HOC/isAuthHOC";
import withFontWrapper from "../HOC/addFontHOC";
import BackGroundWrapper from "../HOC/addBackgroundHOC";
import { selectPOUpdatedStatus } from '../redux/purchaseOrder/selector';
import { createStructuredSelector } from 'reselect';
import SuccessModal from '../components/SuccessModal';
import { setSuccess } from '../redux/successModal/actions';
import { sendUserDetails } from "../redux/user/selector";
import { clearRecentOrderList } from '../redux/purchaseOrder/actions';
import roleHOC from '../HOC/roleHOC';
import ScreenButton from '../components/ScreenButton';
import {
  setCurrentUser
} from "../redux/user/actions";

const DashBoard = ({ navigation,wasPoUpdated,userDetails,clearRecentOrderList,setCurrentUser }) => {

    useEffect(()=>{
        clearRecentOrderList()
    },[])

    const [userMode, changeUserMode] = useState('Installationd');
    const logout = () => { 
        setCurrentUser(false)
        navigation.navigate('Login')
    }
    return (
    <>
        <DashboardHeader logout={logout}/>
        <SuccessModal />
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={dashboardStyle.container}>
                <View style={[purchaseOrderStyle.userInfoContainer, {
                    alignItems: 'center',
                    marginBottom: 30
                }]}>
                    <Image
                        style={purchaseOrderStyle.userImage}
                        source={require("../assets/userProfile.png")}
                    />
                    <View style={purchaseOrderStyle.nameFlexCol}>
                        <Text style={[purchaseOrderStyle.fontPoppins, purchaseOrderStyle.userName]}>
                            {userDetails?.fullName}</Text>
                        <Text style={[
                            purchaseOrderStyle.fontPoppins,
                            purchaseOrderStyle.userDesgination,
                            dashboardStyle.pushDesignationUp
                        ]}>{userDetails?.currentRole}</Text>
                    </View>
                </View>

               
                <ScreenButton 
                    id='PO'
                    text={`How Many Items? \nWhat Item Comes In`}
                    title='Receivings'
                    screenToNavigate='Purchase Order'
                    navigation={navigation}
                />

                <ScreenButton 
                    
                    id='IT'
                    text={`From Where, To Where \nLocation, BIN and LOT`}
                    title='Inventory Transfer'
                    screenToNavigate='Inventory Transfer'
                    navigation={navigation}
                />


                <ScreenButton 
                    id='PM'
                    text={`Production, Warehouse \nand Installation status update`}
                    title='Work Order'
                    screenToNavigate='Production Management'
                    navigation={navigation}
                    //disabled
                />


                {/* <ScreenButton 
                    id='pikup'
                    text={`What to be Picked How many \nto be picked`}
                    title='Pick Up'
                    screenToNavigate='Pick Up'
                    navigation={navigation}
                    // disabled
                /> */}

                <ScreenButton 
                    id='instdel'
                    text={`From Where, To Where How \nmany to install`}
                    title='Deliver And Install'
                    screenToNavigate='InstallationDeliver'
                    navigation={navigation}
                    // disabled
                /> 

                <ScreenButton 
                    id='instdel'
                    text={`From Where, To Where How \nmany to install`}
                    title='Capture Images'
                    screenToNavigate='Capture Images'
                    navigation={navigation}
                    // disabled
                /> 

                <ScreenButton 
                    id='captureImg'
                    text={`From Where, To Where How \nmany to install`}
                    title='Capture Images'
                    screenToNavigate='Capture Images'
                    navigation={navigation}
                    // disabled
                /> 

                <ScreenButton 
                    id='security'
                    text={`Deliver to Client`}
                    title='Orders Ready for Pickup'
                    screenToNavigate='Delivered to Client'
                    navigation={navigation}
                    // disabled
                />    

                <ScreenButton 
                    id='WOdet'
                    text={`Search WO`}
                    title='Get WO Info'
                    screenToNavigate='Work Order Details'
                    navigation={navigation}
                    // disabled
                />     
                
            </View>
        </ScrollView>
    </>
    )
}

const mapToStateProps=createStructuredSelector({
    wasPoUpdated:selectPOUpdatedStatus,
    userDetails:sendUserDetails,
})

export default connect(mapToStateProps,{
    setSuccess,
    clearRecentOrderList,
    setCurrentUser
})(
    isAuthHOC(
    BackGroundWrapper(
            DashBoard
    )
)
)
