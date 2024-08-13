import React,{memo} from "react";
import { Image, TouchableOpacity } from 'react-native';

import { checkStyles } from "../styles/checkboxStyles";

const CheckBox=({selected,handler,itemNo})=>{
   console.log("checkbox rendered");
    const toggleSelected=()=>{
        let itemNumber = itemNo?.toString();
        if(!selected){
            return itemNumber ? handler(itemNumber):handler(true)
        }
        return itemNumber ? handler(itemNumber):handler(false)       
    }

    return (
        <TouchableOpacity 
            style={[checkStyles.container]}
            onPress={toggleSelected}
        >           
            { 
            selected ? (<Image style={checkStyles.boxSize} 
                        source={require('../assets/check.png')} />
                        ):null
            }
        </TouchableOpacity>
    )
}

export default memo(CheckBox)