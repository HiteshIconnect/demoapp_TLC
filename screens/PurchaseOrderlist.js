import React,{useState,useEffect} from 'react';
import {connect } from 'react-redux'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity,ScrollView,FlatList } from 'react-native';
import { createStructuredSelector } from 'reselect';
import {StackActions,NavigationActions} from 'react-navigation'
import withFontWrapper from '../HOC/addFontHOC'
import BackGroundWrapper from '../HOC/addBackgroundHOC'
import Header from '../components/Header'
import Paginator from '../components/Paginator'
import UpdatePOModal from '../components/updatePOModal'
import { purchaseOrdListStyles} from '../styles/purchaseOrderListStyles'
import FilterDropdown from '../components/FilterDropdown'
import isAuthHOC from "../HOC/isAuthHOC";
import { selectPurchaseList,selectPoNumber,selectPurchaseOrderDetails} from '../redux/purchaseOrder/selector'
import {selectUpdatAPIStatus,selectVendorName} from '../redux/purchaseOrder/selector'
import {changeUpdatePOStatus} from '../redux/purchaseOrder/actions'
import { sendUserDetails } from '../redux/user/selector';
import SuccessModal from '../components/SuccessModal';

const sampleData=[
    {
        no:1,
        Itemdescription:'Fasteners- Screw self Drilling ( Tapping ) \n Screw Tax, 8x100mm',
        serialNo:'FA-NSC0030',
        quantity:50,
        quantityreceived:50,
        quantitybilled:20
    },
    {
        no:2,
        Itemdescription:'Fasteners- Screw self Drilling ( Tapping ) \n Screw Tax, 8x100mm',
        serialNo:'FA-NSC0030',
        quantity:50,
        quantityreceived:50,
        quantitybilled:20
    },
    {
        no:3,
        Itemdescription:'Fasteners- Screw self Drilling ( Tapping ) \n Screw Tax, 8x100mm',
        serialNo:'FA-NSC0030',
        quantity:50,
        quantityreceived:50,
        quantitybilled:20
    },
    {
        no:4,
        Itemdescription:'Fasteners- Screw self Drilling ( Tapping ) \n Screw Tax, 8x100mm',
        serialNo:'FA-NSC0030',
        quantity:50,
        quantityreceived:50,
        quantitybilled:20
    },
    {
        no:5,
        Itemdescription:'Fasteners- Screw self Drilling ( Tapping ) \n Screw Tax, 8x100mm',
        serialNo:'FA-NSC0030',
        quantity:50,
        quantityreceived:50,
        quantitybilled:20
    },
]


const PurchaseOrderList =({navigation,purchaseList,po,isPOUpdated,changeUpdatePOStatus,poDetails,userDetails,vendorName})=>{

    const [modalStatus,changeStatus]=useState(false)
    const [filter,changeFilter]=useState('All')
    const [tempList,changeTempList]=useState(null)
    let [skip,changeSkip]=useState(0)
    const [customPage,changeCustomPage]=useState(1)
    const [postsPerPage] = useState(10);
    const [disableButton,setDisableButton] = useState(false);
    
    //const [curr,setCurr]=useState([poDetails.received])
    const [qty,setQty]=useState({
        ordered:0,
        received:0,
        Updating:0
    })

    useEffect(()=>{
        calculatePercentage()
    },[poDetails])

    useEffect(()=>{
        
        if(isPOUpdated){
            changeStatus(false)
            changeUpdatePOStatus(null)
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'DashBoard' })],
            });
            navigation.dispatch(resetAction)
            // navigation.replace('DashBoard')
        }
        switch(filter){
            case 'All':
                changeTempList(null)
                break
            case 'Received':
                const res=purchaseList.filter((item)=>{
                    return parseInt(item.quantity)-parseInt(item.quantityreceived)-parseInt(item.quantitybilled)===0   
                })
                changeTempList(res)
                break
            case 'Pending':
                const res2=purchaseList.filter((item)=>{
                    return (parseInt(item.quantity)-parseInt(item.quantityreceived)-parseInt(item.quantitybilled))!==0   
                })
                changeTempList(res2)
                break
        }
    },[filter,isPOUpdated])

    const indexOfLastPost = customPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = purchaseList.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => changeCustomPage(pageNumber);

    const changeModalStatus = ()=>{
        changeStatus(!modalStatus)
    }
    
    const calculatePercentage=()=>{
        let totalPercentage
        let remaining
        let Updating
        if(poDetails.received==0){
             totalPercentage=0
             remaining=100
             Updating=100
        }else{
             totalPercentage=(poDetails.received/poDetails.total)*100
             remaining= 100-totalPercentage
             Updating=100-(Math.floor(totalPercentage)+Math.floor(remaining))
        }
        
        if(!isNaN(parseInt(totalPercentage))){
            setQty({
                ordered:Math.floor(totalPercentage),
                received:Math.floor(remaining),
                updating:Math.floor(Updating)
            })
        }
    }

    const search=(e)=>{
        if(e){
             let res=currentPosts.filter((items)=>{
                return items.line.includes(e)
            })
            changeTempList(res)
        }else{
            changeTempList(null)
            
        }
    }

    const filterPages=(item,index)=>{
        return index>=skip && index<=skip+4
    }

     const mapper=(item,index)=>{
      
        return ( 
         <View  style={purchaseOrdListStyles.itemViewShadow} key={item.line}>    
            <TouchableOpacity key={item.no}  style={purchaseOrdListStyles.itemContainer} onPress={()=>navigation.navigate('PrintLabel',{item}) } >
                <View  style={purchaseOrdListStyles.itemBackground}>
                     <Text style={[purchaseOrdListStyles.font12, purchaseOrdListStyles.itemNoPadding]}>{item.line}.</Text>
                      <View style={purchaseOrdListStyles.itemTextGrp}>
                        
                         <Text style={purchaseOrdListStyles.font10}>{item.Itemdescription}</Text>
                        
                         <Text style={[purchaseOrdListStyles.font12Grey,purchaseOrdListStyles.makeSerialMargin]}>{item.no ? item.no :''}</Text>
                     </View>
                     <View style={[purchaseOrdListStyles.receivedContainer,parseInt(item.quantity)-parseInt(item.quantityreceived)-parseInt(item.quantitybilled)===0 ? {backgroundColor:'#00840D'}:{backgroundColor:'#E9722E'}]}>
                         <Text style={purchaseOrdListStyles.font10White}>{parseInt(item.quantity)-parseInt(item.quantityreceived)-parseInt(item.quantitybilled)===0 ? 'Received' :'Pending' }</Text>
                     </View>
                </View>
                                 
                 <View style={purchaseOrdListStyles.summaryContainer}>
                     <Text style={purchaseOrdListStyles.font10black}>Total Order : <Text style={purchaseOrdListStyles.colorRed}>{item.quantity}</Text></Text>
                     <Text style={purchaseOrdListStyles.font10black}>Received : <Text style={purchaseOrdListStyles.colorRed}>{item.quantityreceived}</Text> </Text>
                     <Text style={purchaseOrdListStyles.font10black}>Transfered : <Text style={purchaseOrdListStyles.colorRed}>{item.quantitybilled}</Text></Text>
                 </View>
             </TouchableOpacity>
             </View>
             )
         }
    return (
        <>
        <SuccessModal />
        <UpdatePOModal poQty={poDetails} qty={qty} show={modalStatus} changeModalStatus={changeModalStatus} navigation={navigation} />

        <Header navigation={navigation} title="Purchase Order" />
            <View style={purchaseOrdListStyles.container}>
                <View style={purchaseOrdListStyles.updatePoContainer} elevation={5}>
                    <View style={purchaseOrdListStyles.orderDetails}>
                        <View style={purchaseOrdListStyles.orderTextFlex}>
                            <Text style={purchaseOrdListStyles.purchaseOrderLabelText}>Purchase Order:  
                            <Text style={purchaseOrdListStyles.makeColorRed}>{po}</Text></Text>
                            <Text style={purchaseOrdListStyles.purchaseOrderLabelText}>Vendor: 
                            <Text style={purchaseOrdListStyles.makeColorRed}>{vendorName}</Text> </Text>
                        </View>
                        <TouchableOpacity onPress={()=>{changeModalStatus()}} style={purchaseOrdListStyles.updatePoButton}>
                            <Text style={purchaseOrdListStyles.updatePoText}>Update PO</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={purchaseOrdListStyles.makePadding1}>
                        <View style={purchaseOrdListStyles.makeItemCenter}>
                            <View style={[purchaseOrdListStyles.ptbar1,{width:`${qty.ordered}%`}]}></View>
                            <View style={[purchaseOrdListStyles.ptBat2,{width:`${qty.received}%`}]}></View>
                        </View>
                        <View style={purchaseOrdListStyles.makeSpaceBet}>
                            <Text style={[purchaseOrdListStyles.ptText,purchaseOrdListStyles.goBatTextRight]}>{qty.ordered}% completed</Text>
                            <Text style={[purchaseOrdListStyles.ptText]}>{qty.received}%</Text>
                        </View>
                    </View>
                </View>



                <View style={purchaseOrdListStyles.makeSpaceBet}>
                    <View style={purchaseOrdListStyles.searchItemContainer}>
                            <View style={purchaseOrdListStyles.spaceAroundCenter} >
                                <TouchableOpacity>
                                    <Image source={require('../assets/search-icon-red.png')} />
                                </TouchableOpacity>
                                <TextInput
                                onChangeText={(e)=>search(e)}
                                style={purchaseOrdListStyles.textInputWidth} placeholder="Search Item Number" />
                            </View>
                    </View>
                    <FilterDropdown
                        value={filter}
                        handler={changeFilter}
                    />       
                </View>

            
                <ScrollView style={purchaseOrdListStyles.makeMargin5} contentContainerStyle={purchaseOrdListStyles.makeScrollChildCenter}>
                    {
                    tempList ? tempList.map(mapper) : currentPosts.filter(filterPages).map(mapper)
                    }
                </ScrollView>

    

            </View>

            <View style={purchaseOrdListStyles.paginatorContainer}>
            <View style={purchaseOrdListStyles.paginatorAlign}>
                { purchaseList.length ? <Paginator list={purchaseList.length} skip={skip} changeSkip={changeSkip} customPageNumber={customPage} postsPerPage={postsPerPage} paginate={paginate} changeCustomPage={changeCustomPage}/> : null }

                <View style={purchaseOrdListStyles.pageSearchContainer}>
                            <TextInput onChangeText={(text=>changeCustomPage(text))} style={purchaseOrdListStyles.pageSearchInput} placeholder="Page" />
                        <View style={purchaseOrdListStyles.pageSerachButtonFlex}>
                            <TouchableOpacity onPress={(e)=>{
                                // changeCustomPage(val)
                                }}>
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
    purchaseList:selectPurchaseList,
    po:selectPoNumber,
    isPOUpdated:selectUpdatAPIStatus,
    poDetails:selectPurchaseOrderDetails,
    userDetails:sendUserDetails,
    vendorName:selectVendorName
    // status:selectPurchaseListStatus
})

export default connect(mapStateToProps,{
    changeUpdatePOStatus
})(
    isAuthHOC(
        BackGroundWrapper(PurchaseOrderList)
    )
)