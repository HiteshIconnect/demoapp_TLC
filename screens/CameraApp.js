//FOR REFERENCE ONLY

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { withNavigationFocus } from 'react-navigation';


const CameraApp = ({ isFocused, navigation }) => {

  let cameraRef = null

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, toggleFlash] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      navigation.navigate("Preview", { data: photo })
    }
  };

  return (
    <View style={styles.container}>
      {isFocused &&
        <Camera
          style={styles.camera}
          type={type}
          ref={ref => {
            cameraRef = ref;
          }}
          flashMode={flash ? 'on' : 'off'}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                snap()
              }}>
              <Text style={styles.text}> Click </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                toggleFlash(!flash)
              }}>
              <Text style={styles.text}> Flash: {flash ? 'on' : 'off'} </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});


export default withNavigationFocus(CameraApp)