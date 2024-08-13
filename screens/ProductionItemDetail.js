import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { Text, View, Image, TouchableOpacity, ScrollView,Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import isAuthHOC from "../HOC/isAuthHOC";
import BackGroundWrapper from '../HOC/addBackgroundHOC'

const ProductionItemDetail = ({ navigation }) => {
    const { itemDetails, prodStatus, moveTo,screen } = navigation.state.params;
    console.log("ItemDetails from quick view API: ",itemDetails);
    
    const openBrowser = url => {
        Linking.openURL(url);
    };

    return (
        <>
            <Header
                navigation={navigation}
                title={
                    "Item Details"
                }
            />
            <ScrollView contentContainerStyle={{ paddingBottom: '20%' }}>
                <View style={{ paddingHorizontal: "7%", flex: 1 }}>
                    <View style={{
                        flexDirection: 'column', backgroundColor: 'white', height: 'auto', marginTop: '9%', borderWidth: 1, borderRadius: 5, borderColor: 'white', elevation: 3, shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.5,
                        shadowRadius: 1,
                    }}>
                        <View style={{ paddingHorizontal: '4%', paddingVertical: '4%', height: 'auto' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1 }}>
                                    <Image
                                        style={{ width: "auto", height: 192 }}
                                        source={require("../assets/appstore.png")}
                                    />
                                </View>
                            </View>

                            <View style={{ top: 0, marginTop: "2%" }}>
                                
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#717171' }}>Item Description:
                                </Text>
                            
                                <Text style={{ fontFamily: 'Poppins-SemiBold',fontSize: 12 }}>
                                {itemDetails?.title || "NA"}-
                                                    
                                <Text style={{margin:10, fontSize: 12, fontFamily: 'Poppins-Medium',textAlign: "right"}}>{itemDetails?.body || "NA"}</Text>
                                </Text>                            
                            </View>

                            <View style={{ marginTop: '2%' }}>

                                {/* add field changes commented below*/}
                                <View style={{flexDirection:'row'  }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#717171' }}>Additional Remarks : 
                                    </Text>
                                
                                    <Text style={{ flex: 1, flexWrap: 'wrap',fontSize: 12, fontFamily: 'Poppins-Medium', color: '#717171', textAlign: "left"}}>
                                        {itemDetails?.additionalRemark || "NA"}
                                    </Text>
                                    
                                </View> 
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#717171' }}>Print File
                                    </Text>

                                    <TouchableOpacity  
                                        style={{flex:1,flexWrap:'nowrap',width:400,
                                                paddingLeft:75}}
                                        onPress={() => openBrowser(itemDetails?.printFile)}
                                    >
                                        <Text style={{ 
                                                fontSize: 12, 
                                                fontFamily: 'Poppins-SemiBold',
                                                color: '#E11D38',
                                                textAlign:'left'
                                            }}                                      
                                        >
                                            {itemDetails?.printFile||"NA"}
                                        </Text>
                                    </TouchableOpacity>
                                </View> 
                                
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#717171' }}>WO Number</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>{itemDetails?.workNo||"NA"}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#717171' }}>{screen==="Work Order Details"? "Total Quantity" :"Quantity"}
                                    </Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>{screen==="Work Order Details"? itemDetails?.totalQty||"NA": itemDetails?.currentStatQty||"NA"}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#717171' }}>
                                        Line Number
                                    </Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>{itemDetails.no||"NA"}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                
                    <View style={{
                        flexDirection: 'column', backgroundColor: 'white', height: 'auto', marginTop: '4%', borderWidth: 1, borderRadius: 5, borderColor: 'white', elevation: 3,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.5,
                        shadowRadius: 1,
                    }}>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: "5%", paddingVertical: "2%" }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#494949' }}>Location
                                </Text>
                                <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38',flex:1,flexWrap:"wrap",textAlign:"right"}}>{itemDetails?.location||"NA"}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#494949' }}>Area</Text>
                                <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>{itemDetails?.area||"NA"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#494949' }}>Zone</Text>
                                <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>{itemDetails?.zone||"NA"}</Text>
                            </View>
                        </View>
                    </View>

                        {screen==="Work Order Details"?<View style={{
                            flexDirection: 'column', backgroundColor: 'white', height: 'auto', marginTop: '4%', borderWidth: 1, borderRadius: 5, borderColor: 'white', elevation: 3,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.5,
                            shadowRadius: 1,
                        }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: "5%", paddingVertical: "2%" }}>
                                
                                {/* add field changes commented below*/}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#494949' }}>Item Code</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>{itemDetails?.itemCode||"NA"}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#494949' }}>Item Name</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>{itemDetails?.itemName||"NA"}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#494949' }}>Functional Area Item</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>{itemDetails?.function_area_item||"NA"
                                    }</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#494949' }}>Product / Signage Type</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>{itemDetails?.product_type||"NA"}</Text>
                                </View>
                            
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#494949' }}>Project</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>{itemDetails?.project||"NA"}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#494949' }}>SO Number</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>{itemDetails?.SONo||"NA"}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-evenly"}}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#494949' }}>Customer</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38',flex:1,flexWrap:"wrap-reverse",textAlign:"right"}}>{itemDetails?.customer||"NA"}</Text>
                                </View>
                            </View>
                            </View>:
                        <>
                        <View style={{ marginTop: '3%' }}>
                            <Text style={{ fontSize: 18, fontFamily: 'Poppins-Medium', textDecorationLine: 'underline' }}>Status</Text>
                        </View>

                        <View style={{
                            height: 84, backgroundColor: 'yellow', marginTop: '3%', borderWidth: 1, borderRadius: 5, borderColor: 'white', elevation: 3, width: '99%',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.5,
                            shadowRadius: 1,
                        }}>
                            <LinearGradient
                                colors={['#FFEDF0', '#FFFFFF']}
                                start={{ x: 0.1, y: 0.9 }}
                                end={{ x: 0.8, y: 0.8 }}
                            >
                                <View style={{ flexDirection: 'column', paddingHorizontal: '5%', paddingVertical: '4%' }}>
                                    <Text style={{ fontFamily: 14, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}><Text style={{ fontFamily: 14, fontFamily: 'Poppins-Medium', color: 'black' }}>Production Status</Text> : {prodStatus}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ fontFamily: 14, fontFamily: 'Poppins-Medium', color: '#717171' }} >Total Required</Text>
                                            <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>{itemDetails?.totalQty}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontFamily: 14, fontFamily: 'Poppins-Medium', color: '#717171' }} >Quantity</Text>
                                            <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>{itemDetails?.currentStatQty}</Text>
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                        </>
                        }                   
                
                </View>
            </ScrollView>
        </>
    )
}


export default connect(null)(
    isAuthHOC(
        BackGroundWrapper(ProductionItemDetail)
    )
)