import React,{useState,useEffect} from "react";
import {connect} from 'react-redux'
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import withFontWrapper from "../HOC/addFontHOC";
import BackGroundWrapper from "../HOC/addBackgroundHOC";
import Header from "../components/Header";
import { printLabelStyles } from "../styles/printLabelStyles";
import { lotCardStyles } from "../styles/lotcardStyles";
import ItemDetailCard from '../components/ItemDetailCard'
import UpdateItemCart from '../components/UpdateItemCard'
import isAuthHOC from "../HOC/isAuthHOC";
import LocationBinCard from "../components/LocationBinCard";
import LotCard from "../components/LotCard";
import Lot from "../components/Lot";
import ErrorModal from '../components/ErrorModal'
import { createStructuredSelector } from "reselect";
import {setError,unsetError } from '../redux/errorModal/actions'
import {setUpdatePoList,changeReceviedQty} from '../redux/purchaseOrder/actions'
import {selectPoNumber,selectPurchaseList} from '../redux/purchaseOrder/selector'
import {selectPrinterIp} from '../redux/user/selector'
import DateTimePicker from '@react-native-community/datetimepicker';
import PrinterInfoModal from '../components/printerInfoModal'
import { setSuccess } from '../redux/successModal/actions';

var net = require('net');
var port = 6101;

const PrintLabel = ({ navigation,setError,setUpdatePoList,po,poList,changeReceviedQty,setSuccess,printerIp}) => {
  
const itemData=navigation.state.params.item

const getDate=()=>{
  const today=new Date()
  const day=today.getDate().toString().length==1 ?  `0${today.getDate()}` :today.getDate()
  const month=today.getMonth().toString().length ==1 ? `0${today.getMonth()+1}` :today.getMonth()+1
  const year=today.getUTCFullYear().toString().slice(2,4)
  return `${day}${month}${year}`
}

const [date, setDate] = useState(new Date(1598051730000));
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);
const [disableButton,setDisableButton] = useState(false);
const [prevReceived,changePrevReceived]=useState(itemData.quantityreceived)
const [lineItem,setLineItem]=useState(itemData)
const [count, setCount] = useState(0);
const [qtyReceived,changeQtyReceived]=useState(itemData.quantityreceived)
const [pending,changePending]=useState( parseInt(itemData.quantity)- parseInt(itemData.quantitybilled)  )
const [lots,changeLot]=useState([])
const [location,selectLocation]=useState('Location')
const [formError,changeFormStatus]=useState(null)
const [errorMessage,setErrorMessage]=useState("")
const [noExpiryMode,setNoExpiryMode]=useState(false)
const [lotData,changeLotData]=useState({
  lotNumber:`${po}-${itemData?.line}-${getDate()}`,
  Expiry_date:"",
  quantityreceived:0,
  isNew:true,
  id:null,
  Bin:""
})
const [isOpen,setModal]=useState(false)

useEffect(()=>{
  if( itemData.lots?.length>0){
    changeLot(itemData.lots)
  }
},[])

useEffect(()=>{
  if(count>0){
    appendToList()
  }

  setCount(count+1)
},[lineItem])

const onChange = (event, selectedDate) => {
  if(!selectedDate) return
  const date=new Date(selectedDate)
  const mm=date.getMonth()+1 // this is done to handle sept issue 09+1=010
  const day=date.getDate().toString().length==1 ?  `0${date.getDate()}` :date.getDate()
  const month=mm.toString().length ==1 ? `0${mm}` :mm
  const year=date.getUTCFullYear().toString()
  const currentDate = selectedDate || date;
  setShow(Platform.OS === 'ios');
  setDate(currentDate);
  handleLotDataChange(`${day}/${month}/${year}`,'Expiry_date')

};

const giveExpiryDateForLot=(date)=>{
  const dates=date.split('/')
  if(dates.length<3) return 
   dates[2]=dates[2].slice(2,4)
   return dates.join('')
}

const addLot=async ()=>{

 const formError= validation()

  if(formError){
    return
  }

  let lotsCopy=[...lots]
  let lotDataCopy={...lotData}

  if(!lotData.isNew){
    changeQtyReceived(parseInt(qtyReceived)+parseInt(lotDataCopy.quantityreceived))
    lotDataCopy.lotNumber= !noExpiryMode ? `${po}-${itemData?.line}-${getDate()}-${giveExpiryDateForLot(lotData.Expiry_date)}`:`${po}-${itemData?.line}-${getDate()}`
    changeLot(lotsCopy.map((item)=>{
        if(item.id===lotDataCopy.id){
          return lotDataCopy
        }else{
          return item
        }
    })
    )
    changeLotData({
      lotNumber:`${po}-${itemData?.line}-${getDate()}`,
      Expiry_date:"",
      quantityreceived:0,
      isNew:true,
      id:null,
      Bin:""
    })
    return 
  }
  
   lotDataCopy.id=Math.floor(100000 + Math.random() * 900000)
   lotDataCopy.lotNumber= !noExpiryMode ? `${po}-${itemData?.line}-${getDate()}-${giveExpiryDateForLot(lotData.Expiry_date)}`:`${po}-${itemData?.line}-${getDate()}`
   lotDataCopy.Expiry_date=noExpiryMode ?"":lotDataCopy.Expiry_date
   lotsCopy.push(lotDataCopy)

   changeLot(lotsCopy)
    changeQtyReceived(parseInt(qtyReceived)+parseInt(lotDataCopy.quantityreceived))

   changeLotData({
    lotNumber:`${po}-${itemData?.line}-${getDate()}`,
    Expiry_date:"",
    quantityreceived:0,
    isNew:true,
    id:null,
    Bin:""
  })
}


const handleLotDataChange=(value,type)=>{
  
  let lotCopy={...lotData}
  lotCopy[type]=value
  changeLotData(lotCopy)
}

const handleBinData=(data)=>{
  let lotCopy={...lotData}
  lotCopy.Bin=data
  changeLotData(lotCopy)
}

const updateLot=(lot)=>{
  changeLotData({
    lotNumber:!noExpiryMode ? `${po}-${itemData?.line}-${getDate()}-${giveExpiryDateForLot(lotData.Expiry_date)}`:`${po}-${itemData?.line}-${getDate()}`,
    Expiry_date:noExpiryMode ? "":lot.Expiry_date,
    quantityreceived:lot.quantityreceived,
    isNew:false,
    id:lot.id,
    Bin:lot.Bin
  })
}

const deleteLot=(lot)=>{
  changeQtyReceived(parseInt(qtyReceived)-lot.quantityreceived)
  //code revamp later to use reduce()
  changeLot(lots.map((item)=>{
    if(item.id===lotData.id){
      return null
    }else{
      return item
    }
    }).filter((item)=>{
      return item!=null
    })

  )

  changeLotData({
    lotNumber:`${po}-${itemData?.line}-${getDate()}`,
    Expiry_date:"",
    quantityreceived:0,
    isNew:true,
    id:null,
    Bin:""
  })
}


const validation=()=>{
  let errorArray=[]

  // if(!/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/.test(lotData.Expiry_date)){
  //   console.log('wrong date format')
  //   errorArray.push('wrong date')
  // }

  if(lotData.quantityreceived==0){
    errorArray.push('qty cannot be zero')
  }
  if(lotData.quantityreceived>itemData.quantity){
    errorArray.push('qty cannot be greater than total qty')
  }

  if(!noExpiryMode){
    if(!/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(lotData.Expiry_date)){
      errorArray.push('wrong date')
    }
  }

  if(lotData.quantityreceived > itemData.quantity-qtyReceived){
    errorArray.push('Qty is incorrect')
    setErrorMessage('Qty is incorrect')
  }

  if(errorArray.length===0){
    return false
  }else{
    setError('Oops',errorArray.join('\n'),"")
    return true
  }
}


const addLineItem=()=>{
  if(location=='Location' || location==""){
    setError("Location missing","please select location","")
    return
  }

  if(lots.length==0){
    setError("No Lots","please add lots to update","")
    return
  }
 
  setLineItem({
    ...lineItem,
    lots:[
      ...lots
    ],
    totalQty:lots.reduce((acc,curr)=>{
      return parseInt(acc)+parseInt(curr.quantityreceived)
    },0),
    Location:location,
    quantityreceived:qtyReceived
  })
}

const appendToList=()=>{
  
  changeReceviedQty(Math.abs(parseInt(prevReceived)-parseInt(qtyReceived)))

  const newPOList=poList.map((item)=>{
       if(item.line==lineItem.line){
         return lineItem
       }else{
         return item
       }
  })

  setUpdatePoList(newPOList)
  navigation.goBack()
}

const printFile=()=>{

  console.log("host---------->",printerIp)
    const client = new net.Socket();
    client.connect({ port: port, host: printerIp }, function() {
      console.log('TCP connection established with the servesr. HALLLOO ...');


      client.write('^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR8,8~SD15^JUS^LRN^CI0^XZ')
      client.write('^XA')
      client.write('^MMT')
      client.write('^PW400')
      client.write('^LL0198')
      client.write('^LS0')
      client.write('^FO0,128^GFA,04608,04608,00048,:Z64:')
      client.write('eJztlbFu2zAQho+MGRFEUShABHtQASFdAk0ZO7JA3FmD2S7tO8hAhU5F2XQpij5ARyGToLyEgg5dvfVx0jtSku3UgZStQHXDT9k4f/p5PJ4Bppji3465X4Kx+dIvfGx+6JfjsfnJI/m5X0b7fyxfh3ApdPQqZABCwzuApcavTdaKWF6C2MxAi5Yv4VtaptfyCJK05DcW0gq/rmsSfFIoqpJgvQOWh+zXOs8/IP8iDwOWg1kh1ZhWDH48jWPWtDssJVzZc6skh6SUCvejHLW2XlLkJ3zL3yzYbXPSPEX+upnFsIAIqZFB78YYzYifBzF0/B8SvsDC8gXyUfG8FVpP67r0Ut/jhyH7CSc2IL4NLiB2fENYlEzQQ3bU++cS/RNZOn6CfI6ua8KScHqgLmv5wRP0D2s4XiAfghxmWBZ0vTIrJ44PrPfv+OozrkfwHJDPkY+uS1Xje1StiJ/ebPkC/RcMnH/qogCYyZjRwjCDW4mIX7zZ1p9T/aHz7xqJ+JYjH18F7ji2/mcB+WfNsa+/a1RyjbtwgkexAr31L/lefRw/rRx6y9+pf4ylxfo080WAeur4EaFZIQrciuPj+Xb+JXzl1ibUP7a00vGpNLiLKzT+Fz9k38Vto/PXsbjN8rfuIiN/hejlquPH8Uy0/ASuKlvb9FpVNfb/Hr/u+OqcVz3/5Ro+wXwpNh/Dub7A88WqLM0eP9iwdXPwhlP/YFWcdSfW1x86//cixP6k0u/7pzjMl/Bi139/vg/xn9E88vX3L+n47DCfQ0nE0Xzxu2n7h+30D8Wvu7tDP0jhQP+4N5+dHS6Q7/+9/hwI1/84JVCqnv9wMLq/WYT3V9PdHeT7+ZAiv6zH8EWhwRTmPStMQfxsIF+5qUljgeYbqHIgf3d+IjvSg3w3n0s/n0HZcXztBaKB9Hv/L6CG8v1fF01NEjgdynfBe5Gj8l2EvUwxxRRTTDHF/xN/AMbt9kc=:FB43')
      client.write(`^FT286,109^A0I,28,19^FH\^FD${itemData.Uom}^FS}`)
      client.write(`^FT393,29^A0I,17,16^FH\^FD${itemData.Itemdescription}`)
      // client.write('^FT393,8^A0I,17,16^FH\^FD        -(Single iconnect)-PS-034EA,1.22mx50m^FS')
      client.write('^BY3,3,48^FT349,49^BCI,,N,N')
      client.write(`^FD>;${itemData.Uom}^FS`)
      client.write('^PQ1,0,1,Y^XZ');
      setSuccess('Success','Successfully printed','')
  })

  // The client can also receive data from the server by reading from its socket.
  client.on('data', function(chunk) {

  // Request an end to the connection after the data has been received.
  client.end();
  });

  client.on('end', function() {
  console.log('Requested an end to the TCP connection');
  });
  
  client.on('error', function(err) {
    console.log(err,typeof err)
    setError("Oops","Printer connection failed","")
 })
}

  return (
    <>
     <ErrorModal />
     <PrinterInfoModal isOpen={isOpen} setModal={setModal} printFile={printFile}/>
      <Header navigation={navigation} title="Purchase Order" />

      <View style={printLabelStyles.container}>

       <ItemDetailCard data={itemData} />

        <ScrollView  contentContainerStyle={printLabelStyles.scrollViewContentStyle} style={printLabelStyles.marginBottom5}>
        
          <View style={[printLabelStyles.statsContainer,printLabelStyles.boxShadowGenrate]} elevation={3}>
            <View style={printLabelStyles.statItemFlex}>
              <Text style={printLabelStyles.statLabel}>Total Order</Text>
              <Text style={printLabelStyles.statValue}>{itemData.quantity}</Text>
            </View>
            <View style={printLabelStyles.statItemFlex}>
              <Text style={printLabelStyles.statLabel}>Received Till Date</Text>
              <Text style={printLabelStyles.statValue}>{qtyReceived}</Text>
            </View>
          </View>
          {
          // itemData.inventorydetailavail!="false" ? ( 
            <React.Fragment>
               {lots.map((item)=>{
             return (
                  <Lot 
                  addLot={addLot}
                  item={item}
                  updateLot={updateLot}
                  key={parseInt(item.lotNumber)+(Math.random()*300).toString()}  
                  lotNumber={item.lotNumber} 
                  qty={item.quantityreceived} 
                  lotData={lotData}  
                  deleteLot={deleteLot}
                  />
             )
           })}
           <LocationBinCard location={location} selectLocation={selectLocation} itemlocation={itemData.Location} />

           <LotCard 
                addLot={addLot}
                lotData={lotData}  
                handleLotDataChange={handleLotDataChange}
                deleteLot={deleteLot}
                binArray={itemData["Bin"]}
                handleBinData={handleBinData}
                setShowCalendar={setShow}
                showCal={show}
                noExpiryMode={noExpiryMode}
                setNoExpiryMode={setNoExpiryMode}
                limit={itemData.quantity}
           />

           <View style={printLabelStyles.updateButtonWidth}>
            <TouchableOpacity   onPress={addLineItem} style={printLabelStyles.updateButtonStyle} >
              <Text style={printLabelStyles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
         
           <TouchableOpacity style={ printLabelStyles.printLabelButtonStyle} onPress={()=>setModal(true)} >
            <Text style={printLabelStyles.printLabelText}>Print Label</Text>
          </TouchableOpacity>
          </React.Fragment>
          // ):(
          //  <Text style={{marginTop:'10%',fontSize:18}}>This item cannot be updated</Text>
          // )
          }
        </ScrollView>
     
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
    </>
  );
};

const mapStateToProps=createStructuredSelector({
  po:selectPoNumber,
  poList:selectPurchaseList,
  printerIp:selectPrinterIp
})

export default connect(mapStateToProps,{
  setError,
  unsetError,
  setUpdatePoList,
  changeReceviedQty,
  setSuccess
}) (
  isAuthHOC(BackGroundWrapper(PrintLabel))
  )
