import React from 'react';
import { View, TouchableOpacity, Image, Text,ImageBackground } from 'react-native';
import {dashboardHeaderStyle} from '../styles/dashboardHeaderStyles'
export const DashboardHeader = ({logout}) => {
    return (
        <>
    <View style={dashboardHeaderStyle.dashBoardContainer}>
        <Image source={require('../assets/ic_look.png')} style={dashboardHeaderStyle.logoStyle} /> 
    </View>
    <TouchableOpacity onPress={logout} style={dashboardHeaderStyle.loginContainer}>
            <Image source={require('../assets/logout-32.png')} />
        </TouchableOpacity> 
    </>)
}