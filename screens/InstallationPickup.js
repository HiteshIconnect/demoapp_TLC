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
import CheckBox from "../components/Checkbox";
import SearchField from '../components/SearchField'
import { purchaseOrdListStyles} from '../styles/purchaseOrderListStyles'
import Paginator from '../components/Paginator'
import {actuatedNormalize} from '../styles/dynamicFonts'
//import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
import ChangeQtyInput from "../components/ChangeQtyInputProd";
import { selectInstallList } from "../redux/installation/selector";
import { selectRecentPOList,salesOrderNoI } from "../redux/barcodeScanner/selector";
import StatusPicker from '../components/StatusPicker'
import { updateWODetails } from "../redux/workOrder/actions";
import { sendUserDetails, selectToken } from "../redux/user/selector";
import{setError} from '../redux/errorModal/actions';

const InstallationPickup=({navigation,salesOrderNo,woList,updateWODetails,userDetails,token,setError})=>{

    console.log("woList :",woList?.[0]?.Status);
    const {screen} = navigation.state.params;
    const [selectAll,changeSelectAll]=useState(false)
    const [expand,changeExpand]=useState([false,null])
    const [list,setList] = useState([]);
    const [tempList,changeTempList]=useState(null)
    const [moveToP, setMoveToP] = useState('');
    const [moveToH, setMoveToH] = useState('');
    const [customPage,changeCustomPage]=useState(1)
    const [postsPerPage] = useState(10);
    const [valuePicker,setValuePicker]=useState('');

    const expandFunction=(id)=>{
        changeExpand([!expand[0],id])
    }
    const imageSource = expand[0] ? require('../assets/expand.png') : require('../assets/expandDown.png')

    useEffect(()=>{
       const dataList = [];

       woList.map((item,id)=>{
           return dataList.push({
            id,
            no: item["SO line number"],
            title: item['Assembly Item'],
            body: item['Item Description'],
            totalQty: item['Quantity'],
            workNo: item['WO Number'],
            zone: item['Zone'],
            //showQtyBtn: showQty(status.title),
            location: item['location'],
            area: item['AreaCode'],
            hwQty: hwQtys(item),
            printQty: printQtys(item),
            hwQty1: hwQtys(item),
            printQty1: printQtys(item),
            //qty: item['Status'][status.title]
        })   
       })
       const sortedList = dataList.sort((a,b)=> a.no > b.no ? 1 : -1)
       setList(sortedList);
       changeTempList(sortedList);
       const nextStatusList = woList[0]['Status'].filter(stat => stat.Status !== woList[0]['Status'][0].Status)[0].Status;
       setMoveToP(nextStatusList);
       setMoveToH(nextStatusList)
   },[])

   const hwQtys = (item) => {
       if(screen === "Delivered to Client"){
            return item['Status'][0].value;
       }
        return item['Status']["HARDWARE - READY FOR PICK-UP"]
   }

   const printQtys = (item) => {
       if(screen === "Delivered to Client"){
           return item['Status'][0].value;
       }
       return item['Status'].filter(stat =>  stat.Status === "PRINT - READY FOR PICK-UP")[0].value
   }

   const selectItem=(no)=>{
         const newList=list.map((item)=>{
              if(item.no==no){
                  item.checked=item.checked ? false:true
                  return item
              }else{
                  return item 
              }
         })
         setList(newList)
     }
    const statusMap = (val) => {
        if(screen === "Delivered to Client"){
            const moveTo = woList?.[0]?.['Status'].filter(stat => stat?.Status !== woList[0]['Status'][0].Status)[0].Status;
            const mapObj = {
            print : [{"title": moveTo }],
            hw : [{"title": moveTo }],
        }
       return mapObj[val]
       }
        const mapObj = {
            print : [{"title": "PRINT-PICKED UP",}],
            hw : [{"title": "HARDWARE-PICKED UP",}],
        }
       return mapObj[val]
    }
    const search=(e)=>{
        // if(!isNaN(e)) return
        if(e){
             let res=list.filter((items)=>{
                return items.no==e
            })
            changeTempList(res)
        }else{
            changeTempList(null)
        }
     }

     const selectAllItems=()=>{
        const newList=list.map((item)=>{
                item.checked=!selectAll ? true:false
                return item
       })
       setList(newList)
       changeSelectAll(!selectAll)
     }

     const setHWQty=(no,value,sign)=>{
         if(!value | isNaN(value)) value=0
        const newList=list.map((item)=>{
            if(item.no==no){
                if(sign=='+'){ 
                    item.hwQty=(parseInt(value)+1).toString()
                } else if(sign=='-'){
                    item.hwQty=(parseInt(value)-1).toString()
                }else{
                    item.hwQty=(parseInt(value)).toString()
                }
                return item
            }else{
                return item 
            }
       })
       setList(newList)
     }

     const setPrintQty=(no,value,sign)=>{
         if(!value | isNaN(value)) value=0
        const newList=list.map((item)=>{
            if(item.no==no){
                if(sign=='+'){ 
                    item.printQty=(parseInt(value)+1).toString()
                } else if(sign=='-'){
                    item.printQty=(parseInt(value)-1).toString()
                }else{
                    item.printQty=(parseInt(value)).toString()
                }
                return item
            }else{
                return item 
            }
       })
       setList(newList)
     }

    const oldStatus = (val) => {
        if(screen === "Delivered to Client"){
            const moveTo = woList[0]['Status'][0].Status;
            const mapObj = {
            print : moveTo,
            hw : moveTo,
        }
       return mapObj[val]
       }
        const mapObj = {
            print : "PRINT - READY FOR PICK-UP",
            hw : "HARDWARE - READY FOR PICK-UP",
        }
       return mapObj[val]
    }
     const newStatus = (val) => {
       if(screen === "Delivered to Client"){
           const moveTo = woList[0]['Status'].filter(stat => stat.Status !== woList[0]['Status'][0].Status)[0].Status
           const mapObj = {
            print : moveTo,
            hw : moveTo,
        }
       return mapObj[val]
       }
        const mapObj = {
            print :  "PRINT - PICKED UP",
            hw :  "HARDWARE - PICKED UP",
        }
       return mapObj[val]
    }

    function validateTransferableQuantity(){

        let qualityValidate = [];
        let selectedItems = [];
        if(selectAll){
            list.map((item)=>{
                qualityValidate.push(
                    parseInt(item.printQty) > parseInt(Number(item.printQty1))?"false":"true"
                )
            })
        }else{
            selectedItems = list.filter((item)=>{
                return item.checked
            })
            selectedItems.map((item)=>{
                qualityValidate.push(   
                    parseInt(item.printQty) > parseInt(Number(item.printQty1))?"false":"true"
                )
            })
        }
       return qualityValidate;
    }
     const updateWO = async () => {

        //User shouldn't be able to transfer more than what is in the FROM status quantity. 
        //This causes negative quantity values in the system 
        const isValidatArray=validateTransferableQuantity();
        const isValidate=isValidatArray.some((value)=>{
            return value==="false"
        });
        if(isValidate){
            setError("Invalid Quantity","Transferable quantity should be less than FROM status quantity");
            return;
        }

        let workOrderArray = [];
        let selectedItems = [];

        console.log("List for security: ",list);
        if(selectAll){
            list.map((item)=>{
                if(item.qty==0) return
                workOrderArray.push({ 
                    Workorder_number: item.workNo,
                    status: newStatus('print'),
                    oldStatus: oldStatus('print'),
                    quantity: item.printQty,
                    hwQuantity: item.hwQty,
                    hwStatus: newStatus('hw'),
                    hwOldStatus: oldStatus('hw')
                });
            })
        }else{
            selectedItems = list.filter((item)=>{
                return item.checked
            })
            selectedItems.map((item)=>{
                if(item.qty==0) return
                workOrderArray.push({ 
                    Workorder_number: item.workNo,
                    status: newStatus('print'),
                    oldStatus: oldStatus('print'),
                    quantity: item.printQty,
                    hwQuantity: item.hwQty,
                    hwStatus: newStatus('hw'),
                    hwOldStatus: oldStatus('hw')
                });
            })
        }
        
        const data = {
            "email": userDetails.email,
            "role": userDetails.currentRole,
            "WO": workOrderArray,

        }
        console.log("security update WO-->",data);
        
        await updateWODetails(data,token)
        await navigation.navigate('DashBoard')
     }
    const isChecked = list.filter((item)=>item.checked).length!==0;
    const indexOfLastPost = customPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
    const p=Math.ceil(list.length / postsPerPage);
    const paginate = pageNumber => changeCustomPage(pageNumber);
    console.log("---------------------------------------")
    console.log("salesOrderNo: ",salesOrderNo);
    return (
        <>
        <Header
            navigation={navigation}
            title={woList?.[0]?.['Status'][0]?.Status}
        />

        <View style={{ paddingHorizontal : "6%", flex: 1 ,alignItems:'center'}}>

           <View style={{width:'100%',backgroundColor:'white',bottom:'5%',elevation:3,borderRadius:5,shadowColor: '#000',paddingBottom:"1%",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.5,
                            shadowRadius: 1,  }}>

                    <View style={{paddingHorizontal:'4%',paddingVertical:'3%',flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize:actuatedNormalize(14),fontFamily:'Poppins-SemiBold'}}>
                                <Text style={{color:'#494949'}}>Sales Order Number:
                                </Text> 
                                 <Text style={{fontSize:actuatedNormalize(12),color:'#E11D38'}}>{`\n`}{salesOrderNo}
                                 </Text>
                            </Text>
                        </View>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize:actuatedNormalize(14),fontFamily:'Poppins-SemiBold'}}><Text style={{color:'#494949'}}>Total Items:</Text>  <Text style={{fontSize:actuatedNormalize(12),color:'#E11D38'}}>{`\n`}{list.length}</Text></Text>
                        </View>       
                   </View> 
                   {
                        screen !== "Delivered to Client" &&  <Text style={{ fontSize: actuatedNormalize(14), fontFamily: 'Poppins-Medium',paddingHorizontal: '4%' }}>Move To:</Text>
                   }
                  
                   <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal:'4%', marginBottom: 10, alignItems: 'center',alignContent:'center' }}>
                            <Text style={{ fontSize: actuatedNormalize(16), fontFamily: 'Poppins-Medium',textAlignVertical:"top" }}>{ screen !== "Delivered to Client" ? 'Print:' : 'Move To:'}</Text>
                            <StatusPicker
                                value={moveToP}
                                handler={setMoveToP}
                                list={statusMap('print')}
                            />
                    </View>  
                    {
                        screen !== "Delivered to Client" ? <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal: '4%',}}>
                            <Text style={{ fontSize: actuatedNormalize(16), fontFamily: 'Poppins-Medium',marginBottom:10, }}>Hardware:</Text>
                            <StatusPicker
                                value={moveToH}
                                handler={setMoveToH}
                                list={statusMap('hw')}
                            />
                    </View>  : null
                    }   
          </View>

          <View style={{width:'100%',flexDirection:'row',justifyContent:"space-between",marginTop:'-1%'}}>
                <SearchField handler={search} /> 
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox selected={selectAll} handler={selectAllItems} />
                    <Text style={{fontSize:actuatedNormalize(12),fontFamily:'Poppins',color:'#858585',marginLeft:"5%"}}>Select All</Text>
                </View> 
          </View>

          <FlatList
            style={{width:"100%",flex:1,marginTop:'8%'}}
            data={tempList?tempList:currentPosts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View key={item.no} elevation={3} style={{borderWidth:0.5,backgroundColor:'#fff',marginVertical:'2%',height:'auto',borderRadius:10,borderColor:'white',flex:1, shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.5,
                shadowRadius: 1, elevation: 0  }}>
                    <LinearGradient
                            colors={['#FFEDF0', '#FFFFFF']}
                            start={{x:0.1,y:0.9}}
                            end={{ x: 0.8, y: 0.8 }}
                    >       
                        <TouchableOpacity
                        style={{flexDirection:'row',minHeight:118}}>
                        <View style={{flexDirection:'column',paddingHorizontal:'4%',paddingVertical:'4%',flex:1}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                                <CheckBox selected={item.checked? true:false} handler={selectItem} itemNo={item.no} />
                                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: actuatedNormalize(14), color: '#E11D38', paddingHorizontal: '2%' }}>{item.no}.</Text>
                                <View style={{ flex: 1, paddingHorizontal: '1%' }}>
                                    <Text 
                                    style={{fontFamily:'Poppins-SemiBold',fontSize:actuatedNormalize(14),color:'#000000',paddingHorizontal:'2%'}}>{item.body.slice(0,40)}</Text>
                                    {expand[1] === item.no && expand[0] ?
                                        <Text style={{ fontSize: actuatedNormalize(12), fontFamily: 'Poppins-Medium', width: '85%', color: '#rgba(0, 0, 0, 0.7)' }} >{item.body}</Text>
                                        : null
                                    }
                                </View>
                                <TouchableOpacity onPress={()=>expandFunction(item.no)}>
                                        <Image source={imageSource} />
                                </TouchableOpacity>
                                
                            </View>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: actuatedNormalize(12), color: '#E11D38', marginTop: '4%' }}>{item.workNo}</Text>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <View>
                                    <Text style={{fontSize:actuatedNormalize(12),fontFamily:'Poppins-Medium',marginBottom:'4%'}}>
                                        {screen !== "Delivered to Client" ? 'Print ' : 'Quantity '} 
                                        <Text style={{color:'#E11D38'}}>{item.printQty1}</Text>
                                    </Text>
                                    <ChangeQtyInput 
                                    value={item.printQty} 
                                    handler={setPrintQty} 
                                    dimensions={{width:108,height:34}} 
                                    itemNo={item.no} 
                                    disableAdd={parseInt(item.printQty) >= parseInt(item.printQty1)} 
                                    disableSubtract={item.printQty <= 0}
                                    />
                                </View>
                                {
                                    screen !== "Delivered to Client" && 
                                    <View>
                                        <Text style={{fontSize:actuatedNormalize(12),fontFamily:'Poppins-Medium'}}>Hardware <Text style={{color:'#E11D38'}}>{item.hwQty1}</Text></Text>
                                        <ChangeQtyInput 
                                        value={item.hwQty} 
                                        handler={setHWQty} 
                                        dimensions={{width:108,height:34}}
                                        itemNo={item.no} 
                                        disableAdd={parseInt(item.hwQty) >= parseInt(item.hwQty1)} 
                                        disableSubtract={item.hwQty <= 0}
                                        />
                                    </View>
                                }
                            </View>     
                        </View>
                        </TouchableOpacity>
                        </LinearGradient>
                </View>
                )}
            />
        </View>

        <View style={{justifyContent:'center',alignItems:'center',width:'100%',height:42,marginBottom:'1%',height:42}}>
                <TouchableOpacity 
                disabled={!isChecked}
                onPress={updateWO}
                style={{flex:1,width:'55%',backgroundColor:isChecked?'#E11D38':'gray',justifyContent:'center',alignItems:'center',borderRadius:5,borderWidth:1,borderColor:'white'}}>
                    <Text style={{fontFamily:'Poppins-SemiBold',fontSize:18,color:'white'}}>Update</Text>
                </TouchableOpacity>
        </View>

        <View style={purchaseOrdListStyles.paginatorContainer}>
            <View style={purchaseOrdListStyles.paginatorAlign}>
            { list.length ? <Paginator  list={list.length}  customPageNumber={customPage} postsPerPage={postsPerPage} paginate={paginate} changeCustomPage={changeCustomPage}/> : null }
                <View style={purchaseOrdListStyles.pageSearchContainer}>
                            <TextInput 
                                style={purchaseOrdListStyles.pageSearchInput} 
                                placeholder="Page" 
                                onChangeText={(val)=>{
                                    changeCustomPage(val)
                                }}
                                />
                        <View style={purchaseOrdListStyles.pageSerachButtonFlex}>
                            <TouchableOpacity>
                            <Image source={require('../assets/go-icon-red.png')} />
                        </TouchableOpacity>
                        </View>     
                    
                    
                </View>
            </View>
        </View>

    </>
    )
}

const mapStateToProps=createStructuredSelector({
    //installationList:selectInstallList
    woList: selectRecentPOList,
    salesOrderNo: salesOrderNoI,
    userDetails:sendUserDetails,
    token: selectToken,
})

export default connect(mapStateToProps,
    {updateWODetails,setError})
    (isAuthHOC(  
        BackGroundWrapper(
            InstallationPickup
        )     
    )
)    