import React from 'react'
import { Image,StyleSheet,Text,TouchableOpacity,View } from 'react-native';

import CheckBox from './Checkbox';
import ChangeQtyInput from "../components/ChangeQtyInputProd";

import {actuatedNormalize} from '../styles/dynamicFonts'

function InstallationDeliver({editIcon,expand,handerExpand,imageSource,item,mode,selectItem,setHWQty,setPrintQty}) {
  return (
    <TouchableOpacity style={styles.container}>
        <View style={styles.titleContainer}>
            <CheckBox
                selected={item.checked ? true : false}
                handler={selectItem}
                itemNo={item.no}
            />
            <Text style={styles.itemNo}>
                {item.no}.
            </Text>
            <View style={styles.titleSection}>
                <Text style={styles.titleBody}>
                    {item.body.slice(0, 40)}.
                </Text>
                <View style={styles.subHeading}>
                    <Text style={styles.workOrder}>
                        {item.workNo}
                    </Text>
                    <Text style={styles.quantity}>
                        Quantity = {item.totalQty}
                    </Text>
                </View>

                {expand[1] === item.no && expand[0] ? (
                    <Text style={styles.description}>
                        {item.body}
                    </Text>
                ) : null}
            </View>
            <TouchableOpacity onPress={() => {
                    handerExpand(item.no);
            }}>
                <Image
                    source={
                    mode === "InstallationDeliver"
                        ? imageSource
                        : editIcon
                    }
                />
            </TouchableOpacity>
        </View>

        <View style={styles.statusContainer}>
            <View>
                <Text style={{
                    fontSize: actuatedNormalize(12),
                    fontFamily: "Poppins-Medium",
                    marginBottom: "4%",
                    }}
                >
                    Print{" "}
                    <Text style={{ color: "#E11D38" }}>
                        {item.printQty1}
                    </Text>
                </Text>
                <ChangeQtyInput
                    value={item.printQty}
                    handler={setPrintQty}
                    dimensions={{ width: 108, height: 34 }}
                    itemNo={item.no}
                    disableAdd={parseInt(item.printQty) >= parseInt(item.printQty1)}
                    disableSubtract={item.printQty <= 0}
                />
            </View>

            <View>
                <Text
                    style={{
                    fontSize: actuatedNormalize(12),
                    fontFamily: "Poppins-Medium",
                    }}
                >
                    Hardware{" "}
                    <Text style={{ color: "#E11D38" }}>
                        {item.hwQty1}
                    </Text>
                </Text>
                <ChangeQtyInput
                    value={item.hwQty}
                    handler={setHWQty}
                    dimensions={{ width: 108, height: 34 }}
                    itemNo={item.no}
                    disableAdd={
                    parseInt(item.hwQty) >= parseInt(item.hwQty1)}
                    disableSubtract={item.hwQty <= 0}
                />
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default InstallationDeliver

const styles = StyleSheet.create({
    container:{ 
        flexDirection:"column",
        minHeight: 118,
       
        paddingHorizontal: "4%",
        paddingVertical: "4%",
    },
    description:{
        fontSize: actuatedNormalize(12),
        fontFamily: "Poppins-Medium",
        width: "85%",
        color: "#rgba(0, 0, 0, 0.7)",
    },
    itemNo:{
        fontFamily: "Poppins-SemiBold",
        fontSize: actuatedNormalize(14),
        color: "#E11D38",
        paddingHorizontal: "2%",
    },
    quantity:{
        fontFamily: "Poppins-SemiBold",
        fontSize: actuatedNormalize(12),
        color: "#E11D38",
        marginTop: "4%",
        marginLeft: "5%",
    },
    statusContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    subHeading:{
        flexDirection: "row",
        alignItems: "center",
    },
    titleContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        
    },
    titleBody:{
        fontFamily: "Poppins-SemiBold",
        fontSize: actuatedNormalize(14),
        color: "#000000",
        paddingHorizontal: "2%",   
    },
    titleSection:{
        flex: 1, 
        paddingHorizontal: "1%",
    },
    workOrder:{
        fontFamily: "Poppins-SemiBold",
        fontSize: actuatedNormalize(12),
        color: "#E11D38",
        marginTop: "2%",
    }
})