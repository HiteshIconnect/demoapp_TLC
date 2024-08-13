import React,{useState,useEffect} from 'react'
import {StackActions,NavigationActions} from 'react-navigation'
import { connect } from 'react-redux';
import { printLabelStyles } from "../styles/printLabelStyles";
import { Text, View, Image, TouchableOpacity,TextInput } from "react-native";
import Picker from "../components/Picker2";
import ChangeQtyInput from "../components/ChangeQtyInput";
import { pickerStyle } from '../styles/PickerStyles';
import { actuatedNormalize } from '../styles/dynamicFonts';
import { selectToken, sendUserDetails } from '../redux/user/selector';
import { createStructuredSelector } from 'reselect';
import { updateInventory } from '../redux/purchaseOrder/actions';
import { selectUpdatAPIStatus,selectInventoryItem } from '../redux/purchaseOrder/selector';
import { changeUpdatePOStatus,fetchInventoryDetails } from "../redux/purchaseOrder/actions";
import {setError,unsetError } from '../redux/errorModal/actions';

const UpdateCard=({navigation, children, data, locationDetails, total, binArrayFromAPI, lotArrayFromAPI, mode, setMode, userDetails, token, updateInventory, useBin, updateInvAPIStatus, itemName, changeUpdatePOStatus, fetchInventoryDetails,setError
})=>{
  let tempLocArray=[]
  let tempBinArray=[]
  let tempLotArray=[]
  const [locationArray,setLocArray]=useState(tempLocArray)
  const [binArray,setBinArray]=useState(tempBinArray)
  const [lotsArray,setLotsArray]=useState(tempBinArray)
  const [matchBins,setMatchingBins]=useState([])
  const [matchLots,setMatchingLots]=useState([])
  const [cards,setCards]=useState({
    from:{
      location:"",
      bin:"",
      lotNumber:"",
      qty:0
    },
    to:{
      location:"",
      bin:"",
      lotNumber:""
    }
  })

  useEffect(()=>{
    tempLocArray=locationDetails?.map((locationObj)=>{
      return {
        ...locationObj,
        title:locationObj.location,
        id:locationObj.location,
      }
    })
    tempBinArray=lotArrayFromAPI?.map((binObj)=>{
      return {
        ...binObj,
        title:binObj.Bin_Number,
        id:binObj.in_Number+(Math.random()*10000).toString(),
      }
    })
    tempLotArray=lotArrayFromAPI?.map((lotObj)=>{
      return {
        ...lotObj,
        title:lotObj.Lot_Number,
        id:lotObj.Lot_Number+(Math.random()*10000).toString(),
      }
    })
    setBinArray(tempBinArray)
    setLocArray(tempLocArray)
    setLotsArray(tempLotArray)
    
  },[locationDetails])
  
  useEffect(()=>{
     if(updateInvAPIStatus){
      fetchInventoryDetails(itemName,token);
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'InventoryDetailPage' })],
       });
        navigation.dispatch(resetAction)
      changeUpdatePOStatus(null)
     }
  },[updateInvAPIStatus])
  const {item,Uom,itemDescription,quantity,UsueBIN}=data
    const [location,selectLocation]=useState('Location')
    const [bin,selectBin]=useState('Bin')
    const [lotNumber,setLot]=useState("Select Lot Number")
    const [qty,setQty]=useState(0)
    const [firstTime,setTimer]=useState(0)
    const [qtyAvail,setQtyAvail]=useState(0)
 
  useEffect(()=>{
    setCards({
      ...cards,
      from :{
        location,
        bin,
        lotNumber,
        qty
      },
      to :{
        location,
        bin,
      }
    })

    if(mode==1 && firstTime>0){
      selectLocation(cards.from.location? cards.from.location:"Location")
      selectBin(cards.from.bin?cards.from.bin:'Bin')
      setQty(cards.from.qty?cards.from.qty:0)
     setLot(cards.from.lotNumber?cards.from.lotNumber:'Lot Number')
     //return
    }
    if(mode==2 && firstTime>0){
      selectLocation(cards.to.location ? cards.to.location : 'Location')
      selectBin(cards.to.bin ? cards.to.bin :"Bin")
      setLot(cards.to.lotNumber)
     return
    }
   setTimer(firstTime+1)
},[mode])


const selectLotandSetBin=async (value)=>{
  setMatchingBins([])
  selectBin('Bin')
  await setLot(value)
  const binsAllowed=binArray.filter((bin)=>{
    return bin.Location===location && bin.Lot_Number===value
 })
 setMatchingBins(binsAllowed)
}


const selectBinAndSetQty=async(val)=>{
  await selectBin(val)
  const [foundItem]=lotArrayFromAPI.filter((item)=>{
    return item.Location==location && item.Lot_Number==lotNumber
  })
  setQtyAvail(foundItem?.Qty_Available)
}

const selectBinAndLocation=(pickerLocation)=>{
    setLot('Select Lot Number')
    selectBin('Bin')
    setMatchingBins([])
    setMatchingLots([])
    const lotsAllowed=lotsArray.filter((lot)=>{
      return lot.Location===pickerLocation
    })
     const binsAllowed=binArray.filter((bin)=>{
        return bin.Location===pickerLocation
     })
     const [foundItem]=locationDetails.filter((item)=>{
      return item.location==pickerLocation
      })
      
    setQtyAvail(foundItem?.quantityonhand)
    selectLocation(pickerLocation)
    setMatchingLots(lotsAllowed)
    setMatchingBins(binsAllowed)
  }
  const validateMode1=()=>{
    let errorArray=[]
    if(location==""||location=="Location"){
      errorArray.push('please select location')
    }
    // if(bin==""||bin=="Bin") {
    //   errorArray.push('please select bin')
    // }
    
    if(mode==1){
      console.log('qtys validation ',qty,qtyAvail)
      // if(lotNumber=="" || lotNumber=="Select Lot Number"){
      //   errorArray.push('please select lot')
      // }
      if(parseInt(qty)>parseInt(qtyAvail)){
        errorArray.push('qty should be less than '+qtyAvail)
      }
      if(qty==0) {
        errorArray.push('qty cannot be zero')
      }
    }
  
    let errorString=errorArray.join('\n')
    console.log(errorArray)
    if(errorArray.length>0){
      setError("OOPs",errorString,"")
      return true
    }else{
       return false
    }
  }


  const submitHandler=async ()=>{
    console.log('running aad now')

      if(mode===1){
        const cardsCpy={...cards}
        let isError=validateMode1()
        if(isError) return
           setCards({
             ...cardsCpy,
             from :{
               location,
               bin,
               lotNumber,
               qty
             }
           })
           setMode(2)
      }
     
      if(mode===2){
        const cardsCpy={...cards}
          
          let isError=validateMode1()
          if(isError) return
           await setCards({
             ...cardsCpy,
             to :{
               location,
               bin,
              
             }
           })
           let payload={
            email:userDetails.email,
            From_Location:cards.from.location,
            To_Location:location,
            UsueBIN:useBin,
            Items:[
              {
                Item_Number:itemDescription,
                // Item_Description:itemDescription,
                Uom:Uom,
                Item_qty:qty,
                Transfers:[
                  {
                    From_Bin:useBin==="True"?cards.from.bin:'',
                    To_Bin:useBin==="True"?bin:'',
                    Qty:cards.from.qty,
                    Lot_Number:useBin==="True"?cards.from.lotNumber:''
                  }
                ]
              }
            ]
           }
           updateInventory(payload,token)
          //  setMode(2)
           setLot("")
           selectLocation("Location")
           selectBin("Select Bin")
      }
  
  }
    return (
        <View style={[printLabelStyles.updateContainer,printLabelStyles.boxShadowGenrate]} elevation={2}>
             {children ? children : null}
        <View style={printLabelStyles.receivedContainer}>
           
          <Text style={printLabelStyles.receivedText}>{mode===1 ? 'Received':'Transfer'}</Text>
        { mode==1 ?
          <View style={printLabelStyles.changeQtyWrapper}>
            
            <ChangeQtyInput value={qty} handler={setQty} dimensions={data.quantity}/>
            <Text style={printLabelStyles.receivedValue}>
              Received {" "}
              <Text style={printLabelStyles.receivedValueRed}>{qty}</Text>{" "}
            </Text>
          </View>
          :
          <Text style={{fontSize:14,fontFamily:'Poppins',color:'#717171'}}>{cards.from.qty}</Text>
       }
        </View>
        {mode==2 && useBin==="True" ? (
            <View style={printLabelStyles.receivedContainer}>
           
            <Text style={printLabelStyles.receivedText}>Lot No.</Text>
            <Text>{cards.from.lotNumber}</Text>
            </View>
        ):(null)}

        <View style={printLabelStyles.pickerWrapper}>
          <View style={printLabelStyles.pickerWrapperFlexPadding}>

            <View style={printLabelStyles.pickerFirstMargin}>
              <Picker 
                value={location} 
                type='location'
                list={locationArray}
                handler={selectBinAndLocation}
                />
            </View>
            {mode==1 && useBin==="True" ? 
              <View style={printLabelStyles.pickerMargin}>
              <Picker
                value={lotNumber}
                list={matchLots}
                handler={selectLotandSetBin} 
                disable={location==='Location'? true:false}
               />
              </View>
              :
                null
              
              }   

            {useBin==="True"?
            <View style={printLabelStyles.pickerMargin}>
            <Picker
              value={bin}
              list={matchBins}
              handler={selectBinAndSetQty} 
              disable={location==='Location'? true:false}
             />
            </View>:
            null
            }   
            
              
          </View>
        </View>

        <View style={printLabelStyles.updateButtonContainer}>
          <View style={printLabelStyles.updateButtonWidth}>
            <TouchableOpacity style={printLabelStyles.updateButtonStyle} onPress={submitHandler}>
              <Text style={printLabelStyles.updateButtonText}>{mode==1 ? 'Next':'Update'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    )
}

const mapStateToProps=createStructuredSelector({
  userDetails:sendUserDetails,
  token:selectToken,
  updateInvAPIStatus:selectUpdatAPIStatus,
  itemName:selectInventoryItem
})


export default connect(mapStateToProps,{
  updateInventory,
  changeUpdatePOStatus,
  fetchInventoryDetails,
  setError
})(UpdateCard)