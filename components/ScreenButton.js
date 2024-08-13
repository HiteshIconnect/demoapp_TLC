import React, { useState, useEffect } from 'react'
import { dashboardStyle } from '../styles/dashboardStyles'
import { purchaseOrderStyle } from '../styles/purchaseOrder';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import roleHOC from '../HOC/roleHOC';


const PO = require("../assets/ic_inventory.png");
const IT = require("../assets/ic_rec.png");
const PM = require('../assets/ic_work_order.png');
const pikup = require('../assets/installationPickup.png');
const instdel = require('../assets/installationDeliver.png');
const WOdet = require('../assets/installationPickup.png');
const captureImg=require('../assets/installationPickup.png');


const ScreenButton = ({ navigation,title,text,id,screenToNavigate,disabled }) => {

    const imageMapper={
        PO:PO,
        IT:IT,
        PM:PM,
        pikup:pikup,
        instdel:instdel,
        security:pikup,
        WOdet:WOdet,
        captureImg:captureImg
    }

    return (
        <TouchableOpacity style={dashboardStyle.cardContainer}
        id='PO'
        onPress={() => {
            if(disabled) return
            navigation.navigate('PurchaseOrder', { type: screenToNavigate })
        }}>
        <View style={[dashboardStyle.buttonLayout,disabled ? dashboardStyle.disabled :{}]}>
            <Text style={dashboardStyle.buttonText}>{title}</Text>
            <Text style={dashboardStyle.supportingText}>{text}</Text>
        </View>
        <View style={[dashboardStyle.bubbleContainer,disabled ? dashboardStyle.disabled :{}]}>
            <View style={dashboardStyle.iconContainer}>
                <Image source={imageMapper[id]}
                    style={[{ width: 40, height: 40, },disabled ? { tintColor: 'gray' }:{}]} />
            </View>
        </View>
    </TouchableOpacity>
    )
}

export default roleHOC(ScreenButton)