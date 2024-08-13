import React,{useState,useEffect} from 'react'
import { locationCardStyles } from "../styles/LocationBinCardStyles";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Picker from "../components/Picker2";
import { printLabelStyles } from "../styles/printLabelStyles";

const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Doha",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Dukhan",
    },
    {
      id: "58694sa0f-3da1-471f-bd96-145571e29d72",
      title: "Duhail",
    },
  
     
  ];
  
  const BINDATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "1",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "2",
    },
    {
      id: "58694sa0f-3da1-471f-bd96-145571e29d72",
      title: "3",
    },
    {
        id: "bd7acbsea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "13",
      },
      {
        id: "3ac68safc-c605-48d3-a4f8-fbd91aa97f63",
        title: "24",
      },
      {
        id: "58694ssa0f-3da1-471f-bd96-145571e29d72",
        title: "35",
      },
  
     
  ];


const LocationBinCard=({itemlocation,location,selectLocation})=>{
    
    // const [location,selectLocation]=useState('Location')
    // const [bin,selectBin]=useState('Bin')

    const createLocationArray=(item)=>{
      return [
        {
          id:"1",
          title:item
        }
      ]
    }

    const locationArray=createLocationArray(itemlocation)

    return (
         <>
         <Text style={locationCardStyles.headerText}>Location</Text>
         <View style={locationCardStyles.container}>
            

            <View style={locationCardStyles.pickerContainer}>
              <Picker 
                value={location} 
                type='location'
                list={locationArray}
                handler={selectLocation}
                />

                {/* <Picker
                value={bin}
                list={BINDATA}
                handler={selectBin} 
               /> */}
             </View>
         </View>
        </> 
    )
}

export default LocationBinCard