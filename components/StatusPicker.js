import React, { useEffect, useState , useRef} from "react";
import {View,Platform , TextInput} from 'react-native';
import ModalSelector from 'react-native-modal-selector'
import { Picker } from "@react-native-picker/picker";

const StatusPicker=({value,handler,list,role})=>{
    const [textInputValue,setTextInputValue]=useState(value);
    const listWithIndex=list.map((status,i)=>{
        status.id=i+1;
        return status;
    });
    const test = useRef();
    
    useEffect(()=>{  
        if (value && !test.current) {
            setTextInputValue(value)
            test.current = true;
        }
    },[value])
    
    return(
        <View style={{borderRadius:10,width: '60%' }}>
            {Platform.OS==='ios'?
            <ModalSelector
                data={listWithIndex}
                style={{backgroundColor:'#E11D38',color:'white',fontFamily:'Poppins-Medium',width:"100%"}}
                keyExtractor= {item => item.id}
                labelExtractor= {item => role==="TLC-Warehouse Manager"|| role==="TLC-Production Manager"?item.newTitle:item.title}
                initValue={textInputValue}
                supportedOrientations={['portrait']}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                //cancelButtonAccessibilityLabel={'Cancel Button'}
                cancelButtonAccessible={false}
                onChange={(option)=>{ handler(option.title),setTextInputValue(role==="TLC-Warehouse Manager"|| role==="TLC-Production Manager"?option.newTitle:option.title)}}
            >
                <TextInput
                    style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                    //editable={false}
                    placeholder={textInputValue}
                    value={textInputValue} 
                />
            </ModalSelector>:
            <Picker
                selectedValue={value}
                style={{backgroundColor:'#E11D38',color:'white',fontFamily:'Poppins-Medium',width:"100%"}}
                mode="dropdown" 
                dropdownIconColor='white'
                itemStyle = {{}}
                onValueChange={(item,value)=>{
                    handler(item)
                    }}
                >
                    {
                    list.map((item) => {
                    return <Picker.Item 
                    style = {{borderBottomWidth: 1, fontSize: 12,fontFamily:'Poppins-Medium'}}
                    fontFamily='Poppins-Medium'
                    key={Math.random().toString()}
                    label={role==="TLC-Warehouse Manager"|| role==="TLC-Production Manager"?item.newTitle:item.title} value={item.title} />
                    })   
                    }
            </Picker>
            }
        </View>
    )
}

export default StatusPicker