
import React, { useState, useEffect,useRef } from 'react';
import { connect } from 'react-redux';
import { BackHandler,StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { withNavigationFocus } from 'react-navigation';
import {storeInstallList,storeKeys,storeImage,storeImageDropBox} from '../redux/installation/actions'
import { selectKeys,selectInstallList } from "../redux/installation/selector";
import { createStructuredSelector } from 'reselect';
import {headerStyle} from '../styles/headerStyles' 
import {unsetCaptureModal} from '../redux/captureModal/actions';
import { salesOrderNoI } from "../redux/barcodeScanner/selector";
import { salesOrderNo } from '../redux/workOrder/selector';

const InstallationCamera = ({ isFocused,salesOrderNoI,salesOrderNo, navigation,storeImage,storeImageDropBox,items,storeInstallList,unsetCaptureModal }) => {

  const singleMode=navigation.getParam("singleMode")
  const {selectedItem}=navigation.state.params;
  const id = selectedItem.no;

  const cameraRef = useRef(null);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [flash, toggleFlash] = useState(false)
  const [click,toggleClick]=useState(false)
  const [count,setCount]=useState(0)
  const [photos,setPhotos]=useState([])

  //const devices = useCameraDevices();
  const device = useCameraDevice(cameraPosition)
  


  const backAction = () => {   
    navigation.goBack()
  };

  useEffect(() => {

    BackHandler.addEventListener("hardwareBackPress", backAction);

    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
    unsetCaptureModal()

    return ()=>BackHandler.removeEventListener("hardwareBackPress",backAction);
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    if (cameraRef) {
      if(count===8 ||(count===1 && singleMode)) return 

      const photo = await cameraRef.current.takePhoto({
        flash: flash ? "on" : "off",
        quality: 0.5,
      })
      
      let totalPhotos=[...photos]
      totalPhotos.push(photo)
      setPhotos(totalPhotos)
      setCount(count+1)
    }
  };

  const deletePhoto=(uri)=>{
    const photoArrayCpy=[...photos]
    let filteredPhotos=photoArrayCpy.filter((photo)=>{
      return photo.path!==uri
    })

    setPhotos(filteredPhotos)
    setCount(count-1)
  }

  const saveImagesAndGo=async ()=>{
    let tempArray=[...items];

    if(singleMode){
      console.log("inside single mode")
      let res=tempArray.map((item)=>{
        if(item.no==id){
          return {
            ...item,
            selected:false,
            addedImage:true,
            images:[
              ...item.images,
              ...photos
            ]
          }
        }
        return item
    })
     storeInstallList(res)
     return navigation.navigate('InstallationItemDetail')
    }
    let res=tempArray.map((item)=>{
        if(item.no === id){
          return {
            ...item,
            addedImage:true,
            images:photos
            
          }
        }
        return item
    });
    storeInstallList(res);
    const selectedItem = res.filter((item)=>item.no === id)?.[0];
    
    await storeImageDropBox(selectedItem,res,salesOrderNoI,true);
    await navigation.navigate('InstallationStatus',{screen:'Installation Camera'});
  }
  return (
    <View style={styles.container}>
     
      {isFocused &&
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          ref={cameraRef}
          photo={true}
        />      
      }

      <TouchableOpacity 
          onPress={() => backAction()}
          style={{marginLeft:30,marginTop:40}}>
          <Image source={require('../assets/arrowBack.png')} />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
      
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCameraPosition((p) => (p === 'back' ? 'front' : 'back'));
          }}
          >
          <Text style={styles.text}> Flip </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            snap();
            toggleClick(true)
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
      
      <View style={{flexDirection:'column',flex:0.6}}>

        <View style={{flex:1,flexDirection:'row'}}>
        {
          photos.length>0 && photos.map((photo)=>{
            return (
              <View style={{flex:0.4}} key={photo.path} >
                  <TouchableOpacity onPress={()=>deletePhoto(photo.path)} style={{position:'absolute',top:0,right:0,zIndex:40}}>
                    <Image source={require('../assets/x-circle.png')} style={{justifyContent:'flex-end'}} />
                  </TouchableOpacity>
                  <Image source={{uri:`file://${photo.path}`}} style={{flex:1,marginHorizontal:'3%',marginVertical:'2%',zIndex:0}} />
                </View>
            )
          })
        }
      
        </View>
        {
          //count===3 || (singleMode && photos.length>0) ?
          <TouchableOpacity disabled={!click} onPress={()=>saveImagesAndGo()} style={{flex:0.6,backgroundColor:click?'#E11D38':'gray',justifyContent:"center",alignItems:'center',marginHorizontal:'10%',marginVertical:'2%',borderRadius:5}}>
            <Text style={{fontSize:16,fontFamily:'Poppins',color:'white'}}>Save</Text>
          </TouchableOpacity>
          //:
          //null
        }

      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
    backgroundColor:'black',
    padding:2,
    borderRadius: 12
  },
});

const mapStateToProps=createStructuredSelector({
  items:selectInstallList,
  salesOrderNoI,
  salesOrderNo
  //items: selectRecentPOList
})


export default connect(mapStateToProps,{
  storeImage,
  storeInstallList,
  unsetCaptureModal,
  storeImageDropBox
})(withNavigationFocus(InstallationCamera))