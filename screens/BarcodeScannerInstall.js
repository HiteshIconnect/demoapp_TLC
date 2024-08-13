import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {withNavigationFocus} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Camera} from 'react-native-vision-camera';

import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

import CaptureImageModal from '../components/CaptureImageModal';
import {barcodeStyles} from '../styles/barcodeScannerStyles';
import isAuthHOC from '../HOC/isAuthHOC';
import {toggleCaptureModal} from '../redux/captureModal/actions';
import {
  postScannedBarcodes,
  allowUserToSeeWO,
} from '../redux/barcodeScanner/actions';
import {showWO} from '../redux/purchaseOrder/selector';
import {setLoader, unsetLoader} from '../redux/loaderModal/actions';
import LoaderModal from '../components/LoaderModal';
import {sendUserDetails, selectToken} from '../redux/user/selector';

const BarcodeScannerInstall = ({
  navigation,
  postScannedBarcodes,
  token,
  purchaseList,
  status,
  clearPurchaseOrderStatus,
  toggleCaptureModal,
  userDetails,
  allowUserToSeeWO,
  showWO,
  unsetLoader,
  setLoader,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodesArr, setBarcodeArr] = useState([]);
  const [barcodes, setBarcode] = useState([]);
  const [count, setCount] = useState(1);
  const screen = navigation.getParam('screen');

  // const devices = useCameraDevices();
  // const device = devices.back;

  // const [frameProcessor, barcodes] = useScanBarcodes(
  //   [BarcodeFormat.ALL_FORMATS],
  //   {
  //     checkInverted: true,
  //   },
  // );

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();

    if (status) {
      navigation.navigate('PurchaseOrderList');
      clearPurchaseOrderStatus();
    }
  }, []);

  useEffect(() => {
    if (
      screen === 'InstallationDeliver' ||
      screen === 'Pick Up' ||
      screen === 'Capture Images' ||
      screen === 'Delivered to Client'
    ) {
      const screenMap = {
        'Pick Up': 'InstallationPickup',
        InstallationDeliver: 'ProductionStatus',
        'Capture Images': 'InstallationStatus',
        'Delivered to Client': 'InstallationPickup',
      };
      if (showWO) {
        navigation.navigate(screenMap[screen], {screen});
        allowUserToSeeWO(false);
      }
    }
  }, [showWO]);

  const handleBarCodeScanned = async data => {
    setScanned(true);
    if (barcodesArr.filter(barcode => barcode.item === data).length === 0) {
      setBarcodeArr([
        ...barcodesArr,
        {data: `${count}. ${data}`, id: Math.random() * 500, item: data},
      ]);
      setCount(count + 1);
    }
    toggleCaptureModal(true);
  };

  useEffect(() => {
    barcodes.map((barcode, idx) => {
      handleBarCodeScanned(barcode.displayValue);
    });
  }, [barcodes]);

  const handleCodeScan = (data) => {
    setScanned(true);
    if (barcodesArr.filter(barcode => barcode.item === data).length === 0) {
      setBarcodeArr([
        ...barcodesArr,
        {data: `${count}. ${data}`, id: Math.random() * 500, item: data},
      ]);
      setCount(count + 1);
    }
    toggleCaptureModal(true);
  }

  const removeBarcode = id => {
    setBarcodeArr(
      barcodesArr.filter(item => {
        return item.id != id;
      }),
    );
  };

  if (hasPermission === null) {
    setLoader();
    return null;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (hasPermission) {
    unsetLoader();
  }

  const onSubmitClick = async () => {
    const workOrders = barcodesArr.map(barcodes => barcodes.item);
    await postScannedBarcodes(
      workOrders,
      userDetails?.currentRole,
      userDetails?.email,
      token,
    );
  };
  return (
    <View style={[barcodeStyles.container, barcodeStyles.containerFlex]}>
      <CaptureImageModal handler={setScanned} extraProps={false} scan={true} />
      <LoaderModal />
      <View style={barcodeStyles.scanCodeTextContainer}>
        <Text style={barcodeStyles.scanCodeText}>Scan BAR code</Text>
      </View>
      {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      /> */}
      {!scanned && (
        <>
          <QRCodeScanner
            style={StyleSheet.absoluteFillObject}
            onRead={({data}) => handleCodeScan(data)}
            flashMode={RNCamera.Constants.FlashMode.off}
            // reactivate={true}
            // reactivateTimeout={500}
            showMarker={true}
            // topContent={
            //   <View>
            //     <Text style={{color: 'black'}}>Data Scanned</Text>
            //   </View>
            // }
            bottomContent={
              <View>
                <Text>QR Code Scanner</Text>
              </View>
            }
          />
        </>
      )}

      <FlatList
        style={{
          position: 'absolute',
          top: '50%',
          height: '30%',
          backgroundColor: 'rgba(255,255,255,0.5)',
        }}
        data={barcodesArr}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '2%',
            }}>
            <Text>{item.data}</Text>
            <TouchableOpacity onPress={() => removeBarcode(item.id)}>
              <Image source={require('../assets/x.png')} />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={barcodeStyles.cancelBtContainer}>
        <TouchableOpacity
          style={barcodeStyles.cancelBtStyle}
          onPress={
            barcodesArr.length > 0 ? onSubmitClick : () => navigation.goBack()
          }>
          <Text style={barcodeStyles.cancelBtText}>
            {barcodesArr.length > 0 ? 'Submit' : 'Cancel'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

const mapStateToProps = createStructuredSelector({
  userDetails: sendUserDetails,
  token: selectToken,
  showWO,
});

export default connect(mapStateToProps, {
  toggleCaptureModal,
  postScannedBarcodes,
  allowUserToSeeWO,
  unsetLoader,
  setLoader,
})(isAuthHOC(withNavigationFocus(BarcodeScannerInstall)));
