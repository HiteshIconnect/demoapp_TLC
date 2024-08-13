import React from 'react'
import { printLabelStyles } from "../styles/printLabelStyles";
import { Text, View, Image, TouchableOpacity } from "react-native";


const ItemDetailCard=({data,mode})=>{


    return (
        <View style={[printLabelStyles.itemDetailsContainer,printLabelStyles.boxShadowGenrate]} elevation={3}>
        <View style={printLabelStyles.flexWrapperContainer}>
          <View style={printLabelStyles.textSideContainer}>
            <Text style={printLabelStyles.itemNameStyle}>
              {data.Itemdescription}
            </Text>

            {mode=='inv' ?(
            <View>
              <Text style={printLabelStyles.itemDetailsGreyed}>Item</Text>
              <Text style={printLabelStyles.itemDetailsRed}>{data.item}</Text>
            </View>
            ):null
            }
            <View>
              <Text style={printLabelStyles.itemDetailsGreyed}>UOM</Text>
              <Text style={printLabelStyles.itemDetailsRed}>{data.Uom}</Text>
            </View>
            <View>
              <Text style={printLabelStyles.itemDetailsGreyed}>
              {mode=='inv' ? 'Quantity on Hand':'Total Order' }
              </Text>
              <Text style={printLabelStyles.itemDetailsRed}>{data.quantity}</Text>
            </View>
          </View>

          <View style={printLabelStyles.flexHalf}>
            <Image
              style={printLabelStyles.imageStyle}
              source={require("../assets/screw.png")}
            />
          </View>
        </View>
      </View>
    )
}

export default ItemDetailCard