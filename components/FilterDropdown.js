import React,{useState} from 'react'
import { purchaseOrdListStyles} from '../styles/purchaseOrderListStyles'
import { Text, View, Image, TouchableOpacity,FlatList } from 'react-native';
import { filterDrpdownStyles } from '../styles/filterDrpDownstyles';
import {Picker} from '@react-native-picker/picker';

const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "All",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Received",
    },
    {
      id: "58694sa0f-3da1-471f-bd96-145571e29d72",
      title: "Pending",
    },
  
     
  ];
const FilterDropdown=({handler,value,drpDownArray})=>{

    const [show,toggleShow]=useState(false);
    const list = drpDownArray ? drpDownArray : DATA
    return(
        <View style={{borderWidth:0.5,borderRadius:5}}>
            <Picker
            selectedValue={value}
            style={{marginTop: 5,fontFamily:'Poppins-Medium',fontSize:8,height:25,borderWidth:1,width:100,padding:5,position:"relative",bottom:"40%",}}
            mode="dropdown" 
            onValueChange={(item,value)=>handler(item)}>
                {
                list.map((item) => {
                return <Picker.Item 
                key={Math.random()}
                label={item.title} value={item.title} />
                })      
                }
        </Picker>
        </View>
        
    )

    // return(
    //     <View style={{width:'28%'}}>
    //     <TouchableOpacity onPress={()=>toggleShow(!show)} style={purchaseOrdListStyles.drpDownContainer}>
    //         <View style={[purchaseOrdListStyles.makeRow,filterDrpdownStyles.dropDownMainContainer]}>
    //             <Text style={filterDrpdownStyles.textStyle}>{value}</Text>
    //             <Image source={require('../assets/dropdown-icon-red.png')} />
    //         </View>
    //     </TouchableOpacity>
    // {
    //     show ? 
    //             <FlatList
    //                 style={filterDrpdownStyles.flatListStyle}
    //                 data={drpDownArray ? drpDownArray:DATA}
    //                 renderItem={({ item }) => (
    //                     <TouchableOpacity
    //                     onPress={()=>{
    //                         handler(item.title)
    //                         toggleShow(false)
    //                     }}
    //                     style={filterDrpdownStyles.itemContainer}>
    //                         <Text style={filterDrpdownStyles.itemText}>{item.title}</Text>
    //                     </TouchableOpacity>
    //                     )}
    //             />
    //     :
    //     null
    // }
        
    //     </View>
    // )
}

export default FilterDropdown