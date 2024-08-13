import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Header from "../components/Header";
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity,ScrollView,FlatList } from 'react-native';
import SearchField from '../components/SearchField'
import FilterDropdown from "../components/FilterDropdown";
//import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
import isAuthHOC from "../HOC/isAuthHOC";
import withFontWrapper from '../HOC/addFontHOC'
import BackGroundWrapper from '../HOC/addBackgroundHOC'
import Picker from '../components/Picker2'
import { actuatedNormalize } from "../styles/dynamicFonts";

const SecurityItemDetails=({navigation})=>{
    return (
        <>
         <Header
            navigation={navigation}
            title={
            "Item Detail"
            } 
        />
        <View style={{ paddingHorizontal : "7%", flex: 1 }}>
           
            <View style={{flexDirection:'column',backgroundColor:'white',height:'auto',bottom:'5%',borderWidth:1,borderRadius:5,borderColor:'white',elevation:3}}>
                 <View style={{paddingHorizontal:'4%',paddingVertical:'4%',height:'auto'}}>
                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                       <View style={{flexDirection:'column'}}>
                           <View style={{flexDirection:'column',marginBottom:'2%'}}>
                               <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#717171'}}>WO Number</Text>
                               <Text style={{fontSize:14,fontFamily:'Poppins-SemiBold',color:'#E11D38'}}>W21060001</Text>
                           </View>
                           <View style={{flexDirection:'column',marginBottom:'2%'}}>
                               <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#717171'}}>Line Number</Text>
                               <Text style={{fontSize:14,fontFamily:'Poppins-SemiBold',color:'#E11D38'}}>2</Text>
                           </View>
                           <View style={{flexDirection:'column'}}>
                               <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#717171'}}>Quantity</Text>
                               <Text style={{fontSize:14,fontFamily:'Poppins-SemiBold',color:'#E11D38'}}>50</Text>
                           </View>

                       </View>
                       <View style={{flex:0.8}}>
                            <Image
                            style={{ width: "auto", height: 192 }}
                            source={require("../assets/screw.png")}
                            />
                       </View>
                   </View>


                   <View style={{flexDirection:'column',top:0}}>
                         <View>
                             <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#717171'}}>Item Description:</Text>
                             <Text
                             style={{fontSize:12,fontFamily:"Poppins"}}
                             ><Text style={{fontFamily:'Poppins-SemiBold'}}>Indoor Free Standing Backdrop</Text> - TS MOD Covered with Poly Woven B1 Fabric and Liner with Counterweights, with Liner,  W=7.6m x H=3.5m, Production Ready Artworks by the Client</Text>
                         </View>
                         <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'4%'}}>
                                <View >
                                    <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#494949'}}>Location</Text>
                                    <Text style={{fontSize:14,fontFamily:'Poppins-SemiBold',color:'#E11D38'}}>Khalifa Stadium</Text>
                                </View>
                                <View style={{right:'30%'}}>
                                    <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#494949'}}>Zone </Text>
                                    <Text style={{fontSize:14,fontFamily:'Poppins-SemiBold',color:'#E11D38'}}>Field Of Play</Text>
                                </View>
                            </View>
                            <View>
                                    <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#494949'}}>Area </Text>
                                    <Text style={{fontSize:14,fontFamily:'Poppins-SemiBold',color:'#E11D38'}}>Field Of</Text>
                            </View>

                   </View>
                   </View>
              </View>

                <ScrollView contentContainerStyle={{paddingBottom:'20%'}}>

                <View>
                      <Text style={{fontSize:18,fontFamily:'Poppins-Medium',textDecorationLine:'underline'}}>Update Status</Text>
                  </View>


                  <View style={{height:84,backgroundColor:'yellow',marginTop:'3%',borderWidth:1,borderRadius:5,borderColor:'white',elevation:3,width:'99%'}}>
                    <LinearGradient
                                        colors={['#FFEDF0', '#FFFFFF']}
                                        // start={{x:2.1,y:12.38}}
                                        // locations={[0.1, 0.8]}
                                    > 
                            <View style={{flexDirection:'column',paddingHorizontal:'5%',paddingVertical:'4%'}}>
                                <Text style={{fontFamily:14,fontFamily:'Poppins-SemiBold',color:'#E11D38'}}><Text style={{fontFamily:14,fontFamily:'Poppins-Medium',color:'black'}}>Production Status</Text> : For Printing</Text>
                               <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                   <View>
                                        <Text style={{fontFamily:14,fontFamily:'Poppins-Medium',color:'#717171'}} >Total Required</Text>
                                        <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'#E11D38'}}>50</Text>
                                   </View>
                                   <View>
                                       <Text style={{fontFamily:14,fontFamily:'Poppins-Medium',color:'#717171'}} >Ready for Delivery</Text>
                                       <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'#E11D38'}}>0</Text>
                                   </View>
                               </View>
                            </View>
                    </LinearGradient>             
                  </View>


                  <View style={{marginTop:'2%',flex:1,justifyContent:'center',alignItems:'center'}}>
                      <Picker value={'Choose Production Status'} handler={''} containerStyle={{width:'100%',flex:1}}/>
                      <TextInput 
                      placeholder="   Enter Quantity"
                       placeholderTextColor='color: rgba(225, 29, 56, 0.5)'
                    //   onChangeText={(val) => onFieldChange(val, "email")}
                      style={{fontSize:actuatedNormalize(18),fontFamily:'Poppins',borderBottomWidth:0.5,width:"80%",marginTop:"5%",color:'color: rgba(225, 29, 56, 0.5)'}}
                      />
                      {/* <Picker value={'Enter Quantity'} handler={''} /> */}

                  </View>

                  <View style={{width: "100%", justifyContent: "center",alignItems:'center',marginTop:"10%",marginBottom:"4%"}}>
                    <TouchableOpacity style={{
                         justifyContent: "center",
                         alignItems: "center",
                         borderWidth: 1,
                         borderRadius: 50,
                         height: 44,
                         borderColor: "rgba(225, 29, 56, 0.5)",
                         marginTop: "5%",
                         backgroundColor:"white",
                         width:'80%'
                    }}>
                    <Text style={{fontSize: 14,
                        lineHeight: 21,
                        fontFamily: "Poppins",
                        color: "rgba(225, 29, 56, 0.5)",}}>Update</Text>
                    </TouchableOpacity>
                </View>

                </ScrollView>
            </View>
        </>
    )
}


export default connect(null)(
    isAuthHOC(
        BackGroundWrapper(SecurityItemDetails)
    )
)