import React from 'react'
import { printLabelStyles } from "../styles/printLabelStyles";
import { Text, View, Image, TouchableOpacity } from "react-native";

const BinCard=({binDetailsArr=[],useBin})=>{
    return (
        <>
        {useBin==="False"?(
        <View style={[printLabelStyles.itemDetailsContainer, printLabelStyles.marginTop16,printLabelStyles.boxShadowGenrate,{bottom:null,marginBottom:"3%",marginTop:"-3%",height:'auto'}]} elevation={3}>
            <View style={printLabelStyles.locationContainer}>

                {
                    binDetailsArr.length>0 && ( binDetailsArr?.map((bin)=>{
                        return (
                            <View key={Math.random()*10} style={printLabelStyles.qtyContainer}>
                                <Text style={printLabelStyles.locationText}>Location :{bin.location}</Text>
                                <View style={printLabelStyles.binContainer}>
                                    {/* <Text style={printLabelStyles.binText}>{bin.Bin_Number}</Text> */}
                                    <Text style={[printLabelStyles.binText, printLabelStyles.qtyColor]}>{bin.quantityonhand}</Text>
                                </View>
                        </View>

                        )
                    })
                    )

                }
                {/* <View style={printLabelStyles.qtyContainer}>
                    <Text style={printLabelStyles.locationText}>Location : Warehouse 1</Text>
                    <View style={printLabelStyles.binContainer}>
                        <Text style={printLabelStyles.binText}>BIN  : A-01-F2-01</Text>
                        <Text style={[printLabelStyles.binText, printLabelStyles.qtyColor]}>10</Text>
                    </View>
                    <View style={printLabelStyles.binContainer}>
                        <Text style={printLabelStyles.binText}>BIN  : A-01-F2-02</Text>
                        <Text style={[printLabelStyles.binText, printLabelStyles.qtyColor]}>15</Text>
                    </View>
                </View>
                <View style={[printLabelStyles.qtyContainer,printLabelStyles.qtyContainerNoBorder]}>
                    <Text style={printLabelStyles.locationText}>Location : Warehouse 2</Text>
                    <View style={printLabelStyles.binContainer}>
                        <Text style={printLabelStyles.binText}>BIN  : A-01-F2-01</Text>
                        <Text style={[printLabelStyles.binText, printLabelStyles.qtyColor]}>20</Text>
                    </View>
                    <View style={printLabelStyles.binContainer}>
                        <Text style={printLabelStyles.binText}>BIN  : A-01-F2-02</Text>
                        <Text style={[printLabelStyles.binText, printLabelStyles.qtyColor]}>05</Text>
                    </View>
                </View> */}
            </View>
        </View>):(
        <View style={[printLabelStyles.itemDetailsContainer, printLabelStyles.marginTop16,printLabelStyles.boxShadowGenrate,{bottom:null,marginBottom:"3%",marginTop:"-3%",height:'auto'}]} elevation={3}>
                        <View style={printLabelStyles.locationContainer}>

                            {
                                binDetailsArr.length>0 && ( binDetailsArr?.map((bin)=>{
                                    return (
                                        <View key={Math.random()*10} style={printLabelStyles.qtyContainer}>
                                            <Text style={printLabelStyles.locationText}>Location :{bin.Location}</Text>
                                            <View style={printLabelStyles.binContainer}>
                                                <Text style={printLabelStyles.binText}>{bin.Bin_Number}</Text>
                                                <Text style={[printLabelStyles.binText, printLabelStyles.qtyColor]}>{bin.Qty_Available}</Text>
                                            </View>
                                    </View>

                                    )
                                })
                                )

                            }
                            {/* <View style={printLabelStyles.qtyContainer}>
                                <Text style={printLabelStyles.locationText}>Location : Warehouse 1</Text>
                                <View style={printLabelStyles.binContainer}>
                                    <Text style={printLabelStyles.binText}>BIN  : A-01-F2-01</Text>
                                    <Text style={[printLabelStyles.binText, printLabelStyles.qtyColor]}>10</Text>
                                </View>
                                <View style={printLabelStyles.binContainer}>
                                    <Text style={printLabelStyles.binText}>BIN  : A-01-F2-02</Text>
                                    <Text style={[printLabelStyles.binText, printLabelStyles.qtyColor]}>15</Text>
                                </View>
                            </View>
                            <View style={[printLabelStyles.qtyContainer,printLabelStyles.qtyContainerNoBorder]}>
                                <Text style={printLabelStyles.locationText}>Location : Warehouse 2</Text>
                                <View style={printLabelStyles.binContainer}>
                                    <Text style={printLabelStyles.binText}>BIN  : A-01-F2-01</Text>
                                    <Text style={[printLabelStyles.binText, printLabelStyles.qtyColor]}>20</Text>
                                </View>
                                <View style={printLabelStyles.binContainer}>
                                    <Text style={printLabelStyles.binText}>BIN  : A-01-F2-02</Text>
                                    <Text style={[printLabelStyles.binText, printLabelStyles.qtyColor]}>05</Text>
                                </View>
                            </View> */}
                        </View>
        </View>)       
        }
        </>
    )
}


export default BinCard