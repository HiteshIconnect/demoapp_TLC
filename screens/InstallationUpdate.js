import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import withFontWrapper from "../HOC/addFontHOC";
import BackGroundWrapper from "../HOC/addBackgroundHOC";
import Header from "../components/Header";
import isAuthHOC from "../HOC/isAuthHOC";
import {actuatedNormalize} from '../styles/dynamicFonts'


const InstallationUpdate=({navigation})=>{
    const [option,changeOption]=useState('Print');
    const { details } = navigation.state.params;


    return (
        <>
        <Header
            navigation={navigation}
            title={
            `Pick Up`
            }
        />

        <View style={{ paddingHorizontal : "6%", flex: 1 ,alignItems:'center'}}>
            <View style={{flex:0.25,width:'100%',backgroundColor:'white',bottom:'5%',elevation:3,borderRadius:5,shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.5,
                                shadowRadius: 1,  }}>

                        <View style={{flex:1,paddingHorizontal:'4%',paddingVertical:'5%',flexDirection:'column',justifyContent:'space-between'}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly',minHeight: 50,}}>
                                <View style={{flexDirection:'column',flex:1}}>
                                    <Text style={{flex:1,fontSize:actuatedNormalize(14),fontFamily:'Poppins-SemiBold'}}><Text style={{color:'#494949'}}>Customer: </Text>  <Text style={{fontSize:actuatedNormalize(14),color:'#E11D38'}}>{`\n`}{details.title}</Text></Text>
                                </View>
                                <View style={{flexDirection:'column',flex:0.6}}>
                                    <Text style={{flex:1,fontSize:actuatedNormalize(14),fontFamily:'Poppins-SemiBold'}}><Text style={{color:'#494949'}}>Zone</Text>  <Text style={{fontSize:actuatedNormalize(14),color:'#E11D38'}}>{`\n`}{details.zone}</Text></Text>
                                </View>
                            </View>
                            <View style={{flex:1,flexDirection:'row',marginTop:'5%',justifyContent:'space-between'}}>
                                <View style={{flexDirection:'column',flex:1}}>
                                    <Text style={{flex:1,fontSize:actuatedNormalize(14),fontFamily:'Poppins-SemiBold'}}><Text style={{color:'#494949'}}>Location: </Text>  <Text style={{fontSize:actuatedNormalize(14),color:'#E11D38'}}>{`\n`}{details.location}</Text></Text>
                                </View>
                                <View style={{flexDirection:'column',flex:0.6}}>
                                    <Text style={{flex:1,fontSize:actuatedNormalize(14),fontFamily:'Poppins-SemiBold'}}><Text style={{color:'#494949'}}>Area</Text>  <Text style={{fontSize:actuatedNormalize(14),color:'#E11D38'}}>{`\n`}{details.area}</Text></Text>
                                </View>
                            </View>
                                    
                                    
                    </View>   
            </View>

            <View style={{flex:0.60,width:"100%"}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={()=>changeOption('Print')} style={{flex:1}}>
                        <Text style={[{fontSize:actuatedNormalize(18),fontFamily:'Poppins-SemiBold',},option==='Print' ? {color:'#E11D38'}:{color:'rgba(225, 29, 56, 0.25)'}]}>Print</Text>
                        <View style={[{borderTopLeftRadius:5,borderBottomLeftRadius:5},option==='Print' ? {backgroundColor:'#E11D38',height:6}:{backgroundColor:'rgba(225, 29, 56, 0.25)',height:4}]}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>changeOption('Hardware')} style={{flex:1}}>
                        <Text style={[{fontSize:actuatedNormalize(18),fontFamily:'Poppins-SemiBold'},option==='Hardware' ? {color:'#E11D38'}:{color:'rgba(225, 29, 56, 0.25)'}]}>Hardware</Text>
                        <View style={[{borderTopRightRadius:5,borderBottomRightRadius:5},option==='Hardware' ? {backgroundColor:'#E11D38',height:6}:{backgroundColor:'rgba(225, 29, 56, 0.25)',height:4}]}></View>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop:'16%'}}>
                    <View style={{paddingHorizontal:"5%",borderWidth:0.4,height:96,borderRadius:5}}>
                        <Text style={{fontSize:actuatedNormalize(18),fontFamily:'Poppins-SemiBold'}}>Picked Up</Text>
                        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                            <Text style={{fontSize:18,fontFamily:"Poppins-Bold",color:'#E11D38'}}>25 <Text style={{fontSize:14,fontFamily:'Poppins',fontWeight:'500',color:'#000000'}}>Completed</Text></Text>
                            <Text style={{fontSize:18,fontFamily:"Poppins-Bold",color:'#E11D38'}} >50</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{borderRadius:5,height:6,width:'40%',zIndex:66,left:5,backgroundColor:'#E11D38'}}></View>
                            <View style={{borderRadius:5,height:6,width:'60%',backgroundColor:'rgba(0, 0, 0, 0.25)'}}></View>
                        </View>
                    </View>


                    <View style={{paddingHorizontal:"5%",borderWidth:0.4,height:96,marginTop:"4%",borderRadius:5}}>
                        <Text style={{fontSize:actuatedNormalize(18),fontFamily:'Poppins-SemiBold'}}>Picked Up</Text>
                        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                            <Text style={{fontSize:18,fontFamily:"Poppins-Bold",color:'#E11D38'}}>25 <Text style={{fontSize:14,fontFamily:'Poppins',fontWeight:'500',color:'#000000'}}>Completed</Text></Text>
                            <Text style={{fontSize:18,fontFamily:"Poppins-Bold",color:'#E11D38'}} >50</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{borderRadius:5,height:6,width:'40%',zIndex:66,left:5,backgroundColor:'#E11D38'}}></View>
                            <View style={{borderRadius:5,height:6,width:'60%',backgroundColor:'rgba(0, 0, 0, 0.25)'}}></View>
                        </View>
                    </View>

                    <View style={{paddingHorizontal:"5%",borderWidth:0.4,height:96,marginTop:"4%",borderRadius:5}}>
                        <Text style={{fontSize:actuatedNormalize(18),fontFamily:'Poppins-SemiBold'}}>Picked Up</Text>
                        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                            <Text style={{fontSize:18,fontFamily:"Poppins-Bold",color:'#E11D38'}}>25 <Text style={{fontSize:14,fontFamily:'Poppins',fontWeight:'500',color:'#000000'}}>Completed</Text></Text>
                            <Text style={{fontSize:18,fontFamily:"Poppins-Bold",color:'#E11D38'}} >50</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{borderRadius:5,height:6,width:'40%',zIndex:66,left:5,backgroundColor:'#E11D38'}}></View>
                            <View style={{borderRadius:5,height:6,width:'60%',backgroundColor:'rgba(0, 0, 0, 0.25)'}}></View>
                        </View>
                    </View>


                </View>

            </View>                   
        </View>    

        <View style={{justifyContent:'center',alignItems:'center',width:'100%',height:42,marginBottom:'1%',height:42}}>
            <TouchableOpacity style={{flex:1,width:'55%',backgroundColor:'#E11D38',justifyContent:'center',alignItems:'center',borderRadius:5,borderWidth:1,borderColor:'white'}}>
                <Text style={{fontFamily:'Poppins-SemiBold',fontSize:18,color:'white'}}>Update</Text>
            </TouchableOpacity>
       </View>

        </>
    )
}


export default connect(null)(
    isAuthHOC(  
        BackGroundWrapper(
            InstallationUpdate
        )     
    )
)    
