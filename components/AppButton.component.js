import React from 'react'
import { TouchableOpacity,Text,StyleSheet } from 'react-native';

function AppButton({onPress,isChecked}) {

  return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!isChecked}
            style= {[styles.container, { backgroundColor:isChecked ? "#E11D38" : "gray"  }]}
        >
            <Text style={styles.text}>Update</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "55%",
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "white",
    },
    text:{
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: "white",
    }
})
export default AppButton