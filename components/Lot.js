import React, { useState, useEffect } from 'react'
import { lotCardStyles } from "../styles/lotcardStyles";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import { lotStyles } from '../styles/lotStyles';

const Lot = ({ lotNumber, qty, updateLot, item,addLot,deleteLot,lotData }) => {

    return (
        <>
        <TouchableOpacity
        onPress={() => updateLot(item)} 
        style={lotStyles.container}>

            <View style={lotStyles.lotNumQtyText}>
            <Text style={lotStyles.lotNumberText}>{lotNumber}</Text>

            <Text style={lotStyles.lotQtyText}>{qty}</Text>
            </View>
            <View style={lotStyles.alignDeleteBtn}>
                {!lotData.isNew && item.id===lotData.id?
                // <TouchableOpacity onPress={()=>deleteLot(lotData)}>
                    <Text style={lotStyles.deleteBtnText} onPress={()=>deleteLot(lotData)}>Delete Lot</Text>
                // </TouchableOpacity>
                :
                null
                }
            </View>
        </TouchableOpacity>
        </>
    )
}

export default Lot