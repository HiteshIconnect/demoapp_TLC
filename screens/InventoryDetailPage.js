import React,{useState,useEffect} from "react";
import {connect} from 'react-redux'
import { createStructuredSelector } from "reselect";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import withFontWrapper from "../HOC/addFontHOC";
import BackGroundWrapper from "../HOC/addBackgroundHOC";
import successLoaderWrapper from '../HOC/successLoaderHOC';
import Header from "../components/Header";
import { printLabelStyles } from "../styles/printLabelStyles";
import Slider from '../components/Slider'
import ItemDetailCard from '../components/ItemDetailCard'
import UpdateItemCart from '../components/UpdateItemCard'
import BinCard from '../components/WarehousebinCard'
import isAuthHOC from "../HOC/isAuthHOC";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import { selectInventoryDetails } from "../redux/purchaseOrder/selector";

const InventoryDetailPage = ({ navigation,inventoryDetails}) => {

  const useBin=inventoryDetails['UsueBIN']
  const {item,itemDescription,Uom,Total,inhandlocation,Bin,invDetail,UsueBIN}=inventoryDetails
  const [disableButton,setDisableButton] = useState(false);
  const [status,setStatus]=useState(true)
  const [mode,setMode]=useState(1)

  const changeMode=(val)=>{
    setStatus(!val)
    if(val){
      setMode(1)
    }else{
      setMode(2)
    }
  }

  return (
    <>
    <ErrorModal />
      <Header navigation={navigation} title="Inventory Transfer" />

      <View style={printLabelStyles.container}>
        <ItemDetailCard 
          mode='inv' 
          data={{quantity:Total,Itemdescription:itemDescription,Uom,item,UsueBIN}} 
        />

        <ScrollView 
          contentContainerStyle={printLabelStyles.scrollViewContentStyle} 
          style={printLabelStyles.marginBottom5}>
          
          <BinCard 
            binDetailsArr={useBin==="False"?inventoryDetails['inhandlocation']:inventoryDetails['invDetail']} 
            useBin={useBin}
          />
          
          <UpdateItemCart
              navigation={navigation}
              mode={mode}
              setMode={setMode}
              total={Total} 
              locationDetails={inhandlocation}
              binArrayFromAPI={Bin} 
              lotArrayFromAPI={invDetail}
              sliderStatus={status}
              pending={''} 
              pendingHandler={''} 
              data={{item,Uom,itemDescription,quantity:Total,UsueBIN}}
              useBin={useBin}
           >
              <View style={{justifyContent:"center",alignItems:"center",marginTop:"2%"}}>
                <Slider status={mode==1 ? true:false} setStatus={changeMode}/>
              </View>
          </UpdateItemCart>

          <TouchableOpacity style={disableButton ? printLabelStyles.printLabelButtonStyle : printLabelStyles.printLabelButtonDisableStyle} >
            <Text style={printLabelStyles.printLabelText}>Print Label</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const mapStateToProps=createStructuredSelector({
  inventoryDetails:selectInventoryDetails
})

export default connect(mapStateToProps)(
  isAuthHOC(successLoaderWrapper(BackGroundWrapper(InventoryDetailPage)))
)
