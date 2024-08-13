import React,{useState} from 'react'
import { StyleSheet,View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import CaptureImage from './CaptureImage.component'
import InstallationDeliver from './InstallationDeliver.component'

const editIcon = require("../assets/editIcon.png");

function ListItem({changeSelectedItem, item, mode, list,screen,selectItem,setList}) {

    const [expand, changeExpand] = useState([false, null]);
    const expandFunction = id => {
      changeExpand([!expand[0], id]);
    };

    const imageSource = expand[0]
    ? require("../assets/expand.png")
    : require("../assets/expandDown.png");

    const setHWQty = (no, value, sign) => {
        if (!value | isNaN(value)) value = 0;
        const newList = list.map(item => {
          if (item.no == no) {
            if (sign == "+") {
              item.hwQty = (parseInt(value) + 1).toString();
            } else if (sign == "-") {
              item.hwQty = (parseInt(value) - 1).toString();
            } else {
              item.hwQty = parseInt(value).toString();
            }
            return item;
          } else {
            return item;
          }
        });
        setList(newList);
    };

    const setPrintQty = (no, value, sign) => {
        if (!value | isNaN(value)) value = 0;
        const newList = list.map(item => {
          if (item.no == no) {
            if (sign == "+") {
              item.printQty = (parseInt(value) + 1).toString();
            } else if (sign == "-") {
              item.printQty = (parseInt(value) - 1).toString();
            } else {
              item.printQty = parseInt(value).toString();
            }
            return item;
          } else {
            return item;
          }
        });
        setList(newList);
    };

    return (
        <View style={styles.listContainer}
            elevation={3}
        >
            <LinearGradient
                colors={["#FFEDF0", "#FFFFFF"]}
                start={{ x: 0.1, y: 0.9 }}
                end={{ x: 0.8, y: 0.8 }}
            >
                {mode === "InstallationDeliver" ? (
                    <InstallationDeliver editIcon={editIcon} expand={expand} handerExpand={expandFunction} imageSource={imageSource} item={item} mode={mode} selectItem={selectItem} setHWQty={setHWQty} setPrintQty={setPrintQty}
                    />
                    ):
                    (
                    <CaptureImage changeSelectedItem={changeSelectedItem} expand={expand} handerExpand={expandFunction} imageSource={imageSource} item={item} list={list} screen={screen} selectItem={selectItem}
                    />
                    )
                }
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer:{
        borderWidth: 0.5,
        backgroundColor: "#fff",
        marginVertical: "2%",
        height: "auto",
        borderRadius: 10,
        borderColor: "white",
        // flex: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    }
    
})

export default ListItem