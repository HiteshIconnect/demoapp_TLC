import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Header from "../components/Header";
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity,ScrollView,FlatList } from 'react-native';
import { purchaseOrdListStyles} from '../styles/purchaseOrderListStyles'



const SearchField=({handler})=>{
    return (
        <View style={[purchaseOrdListStyles.searchItemContainer,{width:'65%'}]}>
                <View style={purchaseOrdListStyles.spaceAroundCenter} >
                    <TouchableOpacity>
                            <Image source={require('../assets/search-icon-red.png')} />
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={(e)=>handler(e)}
                        style={purchaseOrdListStyles.textInputWidth} placeholder="Search Item Number" />
                </View>
        </View>
    )
}

export default SearchField