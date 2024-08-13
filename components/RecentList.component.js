import { Image,Text,TouchableOpacity,StyleSheet,View} from 'react-native';
import React from 'react'

import {actuatedNormalize} from '../styles/dynamicFonts'

function RecentList({item,indexKey,fetchPODetails}) {
  return (
    <TouchableOpacity 
      onPress={()=>fetchPODetails(item[indexKey.id])} 
      key={Math.random()*10000} 
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>
          {item[indexKey.title]}
        </Text>
        <Text style={styles.date}>
          Date : {item[indexKey.date]}
        </Text>
      </View>
      <View >
        <Image source={require("../assets/go-to.png")} />
      </View>
    </TouchableOpacity>
  )
}

export default RecentList

const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "5%",
    marginTop: "3%",
    color:"black",
  },
  title:{
      fontFamily: "Poppins",
      fontSize: actuatedNormalize(16),
      color:"black"
  },
  date:{
      fontFamily: "Poppins",
      fontSize: actuatedNormalize(10)
  }
})