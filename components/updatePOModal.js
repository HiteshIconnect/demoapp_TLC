import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import ProgressCircle from 'react-native-progress-circle'
import { Text, View ,TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { updateModalStyle } from '../styles/poModalStyles'
import {updatePoDetails} from '../redux/purchaseOrder/actions'
import { createStructuredSelector } from 'reselect';
import {selectToken,sendUserDetails} from '../redux/user/selector'
import {selectPoNumber,selectPurchaseList,selectPurchaseOrderDetails,selectVendorName} from '../redux/purchaseOrder/selector'

const UpdatePOModal = ({show,changeModalStatus,navigation,updatePoDetails,token,poNumber,ItemsToUpdate,poDetails,poList,userDetails,qty,poQty,vendorName}) => {
  return (
    <Modal 
      isVisible={show}
      hasBackdrop
      onBackdropPress={()=>changeModalStatus()}
     
    >
      <View style={updateModalStyle.makeFLex1} >
        <View style={updateModalStyle.modalLayout}   >

          <View style={updateModalStyle.children} >
            <View style={updateModalStyle.boxStyle}  >
              <Text style={updateModalStyle.textStyle}>Purchase Order : <Text style={updateModalStyle.specialRedColor}>{poDetails.purchaseOrderNumber}</Text></Text>
              <Text style={updateModalStyle.textStyle}>Vendor : <Text style={updateModalStyle.specialRedColor}>{vendorName}</Text></Text>
            </View>
            <View style={updateModalStyle.progressContainer}>
              <Text style={[updateModalStyle.textStyle,updateModalStyle.alignProgressText]}>Progress</Text>
              <View style={updateModalStyle.centerProgressCircle}>
                <ProgressCircle
                  percent={qty.ordered}
                  radius={25}
                  borderWidth={3}
                  color="#E11D38"
                  shadowColor="#7E7E7E"
                  bgColor="#fff"
                >
                  <Text style={updateModalStyle.textStyle}>{qty.ordered}%</Text>
                </ProgressCircle>
              </View>
            </View>
          </View>

          <View style={[updateModalStyle.twoProgressContainer]}>
            <View style={updateModalStyle.centerProgressCircle}>
              <ProgressCircle
                percent={qty.ordered}
                radius={58}
                borderWidth={10}
                color="#E11D38"
                shadowColor="#FFFFFF"
                bgColor="#fff"
              >
                <Text style={updateModalStyle.textStyle}>{qty.ordered}%</Text>
                <Text style={[updateModalStyle.textStyle,{textAlign:'center'}]}>PO Fulfilled</Text>
              </ProgressCircle>
            </View>

            <View style={updateModalStyle.centerProgressCircle}>
              <ProgressCircle
                percent={qty.ordered}
                radius={58}
                borderWidth={10}
                color="#E11D38"
                shadowColor="#FFFFFF"
                bgColor="#fff"
              >
                <Text style={updateModalStyle.textStyle}>{qty.ordered}%</Text>
                <Text style={[updateModalStyle.textStyle,{textAlign:'center'}]}>Total Updating</Text>
              </ProgressCircle>
            </View>

          </View>

                        
          <View style={updateModalStyle.centerProgressCircle}>
            <ProgressCircle
              percent={qty.received}
              radius={58}
              borderWidth={10}
              color="#E11D38"
              shadowColor="#FFFFFF"
              bgColor="#fff"
            >
              <Text style={updateModalStyle.textStyle}>{qty.received}%</Text>
              <Text style={[updateModalStyle.textStyle,{textAlign:'center'}]}>Total Remaining</Text>
            </ProgressCircle>
          </View>


          <View style={updateModalStyle.poButtonContainer}>
            <TouchableOpacity 
              onPress={()=>updatePoDetails(token,poDetails.purchaseOrderNumber,poList,userDetails?.email,userDetails?.currentRole)} 
              style={updateModalStyle.poButtonStyle}>
                <Text style={updateModalStyle.poButtonText}>Update PO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )  
}

const mapStateToProps=createStructuredSelector({
  token:selectToken,
  poNumber:selectPoNumber,
  poList:selectPurchaseList,
  // ItemsToUpdate:selectPoArrayToSend,
  poDetails:selectPurchaseOrderDetails,
  userDetails:sendUserDetails,
  vendorName:selectVendorName
})


export default connect(mapStateToProps,{
  updatePoDetails
})(UpdatePOModal)
