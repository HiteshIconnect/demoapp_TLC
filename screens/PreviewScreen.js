import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, Alert } from 'react-native';
import { captureRef } from 'react-native-view-shot';



const PreviewScreen = ({ navigation }) => {

  let screenShotRef = null

  const data = navigation.getParam('data');



  const saveToCameraRollAsync = async () => {

    try {
      let result = await captureRef(screenShotRef, {
        format: 'png',
      });

      Alert.alert(
        "Image is being Uploaded",
        "Your image is getting uploaded to our dropbox servers  ",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    catch (snapshotError) {
      console.error(snapshotError);
    }

  };

  return (
    <View style={styles.container}>
      <View
        style={styles.flexOne}
        collapsable={false}
        ref={view => {
          screenShotRef = view;
        }}
      >

        <Image source={{ uri: data.uri }} style={styles.flexOne} />

        {/* <Image style={{ bottom: 100, left: 100, opacity: 0.5 }} source={require('../assets/favicon.png')} /> */}
        <Text style={{ bottom: 100, left: 100, opacity: 0.5 }} >PO#123iConnect</Text>
      </View>
      <Button title="Upload to Dropbox" onPress={saveToCameraRollAsync} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'yellow'
  },
  flexOne: {
    flex: 1,
    // width: 100,
    // height: 100
  },


});

export default PreviewScreen
