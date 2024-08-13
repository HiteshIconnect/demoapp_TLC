import React,{useState,useEffect} from 'react'
import { lotCardStyles } from "../styles/lotcardStyles";
import { Text, View, Image, TouchableOpacity,TextInput } from "react-native";
import Picker from "../components/Picker2";
import CheckBox from "../components/Checkbox";
import ChangeQtyInput from "../components/ChangeQtyInput";
const calendarIcon = require("../assets/cal.png");

const LotCard=({handleLotDataChange,lotData,deleteLot,binArray,handleBinData,setShowCalendar,showCal,noExpiryMode,setNoExpiryMode,addLot,limit})=>{
    const [binsData,setBinsData]=useState([])
    
    useEffect(()=>{
       let tempData=binArray.map((bin)=>{
         return {
           id:bin+(Math.random()*100).toString(),
           title:bin
         }
       })

       setBinsData(tempData)
    },[])

    return (
         <>
         <Text style={lotCardStyles.headerText}>LOT</Text>
         <View style={lotCardStyles.container}>
                <View style={lotCardStyles.lotMargin}>
                        
                        <View style={lotCardStyles.makeTopMargin}>
                        {/* <View style={lotCardStyles.alignDeleteBtn}>
                            {!lotData.isNew ?
                            <TouchableOpacity onPress={()=>deleteLot(lotData)}>
                                <Text style={lotCardStyles.deleteBtnText}>Delete Lot</Text>
                            </TouchableOpacity>
                            :
                            null
                            }
                        </View> */}
                          {!noExpiryMode ? (
                            <View style={{flexDirection:'row'}}>
                                  <TextInput 
                                    placeholderTextColor="rgba(225, 29, 56, 0.5)" 
                                    placeholder="Expiry Date" 
                                    style={[lotCardStyles.expiryInputStyle,{width:'80%'}]} 
                                    //  onChangeText={(e)=>handleLotDataChange(e,'Expiry_date')}
                                    value={lotData.Expiry_date}
                                    //  maxLength={10}
                                    editable={false}
                                  />
                                  <TouchableOpacity onPress={()=>setShowCalendar(!showCal)}>
                                      <Image source={calendarIcon} style={{width:40,height:40,marginLeft:10}} />
                                  </TouchableOpacity>
                            </View>
                          ):null
                          }
                           <View style={lotCardStyles.expCheckContainer}>
                                     <CheckBox selected={noExpiryMode} handler={setNoExpiryMode} />
                                    <Text style={{fontFamily:'Poppins-Regular',marginLeft:10}}>Expiry NA</Text>
                            </View>  
                                <View 
                                style={lotCardStyles.qtyContainerStyle}>
                                    {/* <TextInput   
                                    placeholderTextColor="rgba(225, 29, 56, 0.5)" 
                                    placeholder="Expiry Date" 
                                    style={{borderBottomWidth:1,fontSize:16,fontFamily:'Poppins',width:'50%',color:'rgba(225, 29, 56, 0.5)'}} 
                                    // onChangeText={(e)=>dateFilter(e)}
                                    onChangeText={(e)=>handleLotDataChange(e,'expiry')}
                                    value={lotData.expiry}
                                    maxLength={10}
                                    /> */}
                                    <Text style={{color:"#494949"}}>Quantity :</Text>
                                    <ChangeQtyInput value={lotData.quantityreceived} handler={handleLotDataChange} dimensions={limit}/>
                                </View>
                                <View style={{paddingHorizontal:'1%'}}>
                                    <Picker
                                            value={lotData.Bin ? lotData.Bin :"Please Select Bin" }
                                            list={binsData}
                                            handler={handleBinData} 
                                            containerStyle={{width:'100%',marginLeft:0}}
                                            //opacityStyle={{marginLeft:20}}
                                        />
                                 </View>
                                 <View style={{marginTop:"9%",paddingHorizontal:'1%',width:'100%',flexDirection:'row',justifyContent:"flex-end"}}>
                                    <TouchableOpacity onPress={()=>addLot()}>
                                                    <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'#E11D38',textDecorationLine: 'underline'}}>Add current lot + </Text>
                                    </TouchableOpacity>
                                </View>
                               
                        </View>
                    </View>     
                </View>
        </> 
    )
}

export default LotCard