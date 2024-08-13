import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {withNavigationFocus} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Camera} from 'react-native-vision-camera';

import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {selectToken, sendUserDetails} from '../redux/user/selector';
import {barcodeStyles} from '../styles/barcodeScannerStyles';
import isAuthHOC from '../HOC/isAuthHOC';

import {
  fetchPODetailsAPI,
  clearPurchaseOrderStatus,
  fetchInventoryDetails,
} from '../redux/purchaseOrder/actions';
import {
  selectPurchaseList,
  selectPurchaseListStatus,
} from '../redux/purchaseOrder/selector';

import LoaderModal from '../components/LoaderModal';
import {fetchWorkOrderDetails} from '../redux/workOrder/actions';
import {setLoader, unsetLoader} from '../redux/loaderModal/actions';
const BarcodeScanner = ({
  navigation,
  fetchPODetailsAPI,
  token,
  purchaseList,
  status,
  clearPurchaseOrderStatus,
  fetchInventoryDetails,
  userDetails,
  fetchWorkOrderDetails,
  setLoader,
  unsetLoader,
}) => {
  const screen = navigation.getParam('screen');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodes, setBarcode] = useState([]);

  // const devices = useCameraDevices();
  // const device = devices.back;

  // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.ALL_FORMATS], {
  //   checkInverted: true,
  // });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();

    if (status) {
      if (screen == 'Purchase Order') {
        navigation.navigate('PurchaseOrderList');
      }

      if (screen == 'Inventory Transfer') {
        navigation.navigate('InventoryDetailPage');
      }

      if (screen === 'Production Management') {
        navigation.navigate('ProductionStatus');
      }
      clearPurchaseOrderStatus();
    }
  }, []);

  const handleBarCodeScanned = async data => {
    // alert(`Bar code ${data} was scanned  !`);
    setScanned(true);
    if (screen == 'Purchase Order') {
      await fetchPODetailsAPI(data, token);
    }

    if (screen == 'Inventory Transfer') {
      await fetchInventoryDetails(data, token, setScanned);
    }

    if (screen === 'Production Management') {
      await fetchWorkOrderDetails(
        '',
        token,
        userDetails.email,
        userDetails.currentRole,
        data,
      );
    }

    // setTimeout(()=>{
    //    setScanned(false)
    // },4000)
  };

  useEffect(() => {
    barcodes.map((barcode, idx) => {
      handleBarCodeScanned(barcode.displayValue);
    });
  }, [barcodes]);

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

  const handleCodeScan = (data) => {
    console.log('scanned data---------', data)
  }

  return (
    <View style={[barcodeStyles.container, barcodeStyles.containerFlex]}>
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
            topContent={
              <View>
                <Text style={{color: 'black'}}>Data Scanned</Text>
              </View>
            }
            bottomContent={
              <View>
                <Text>QR Code Scanner</Text>
              </View>
            }
          />
        </>
      )}

      <View style={barcodeStyles.cancelBtContainer}>
        <TouchableOpacity
          style={barcodeStyles.cancelBtStyle}
          onPress={() => navigation.navigate('PurchaseOrder')}>
          <Text style={barcodeStyles.cancelBtText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  purchaseList: selectPurchaseList,
  status: selectPurchaseListStatus,
  userDetails: sendUserDetails,
});

export default connect(mapStateToProps, {
  fetchPODetailsAPI,
  clearPurchaseOrderStatus,
  fetchInventoryDetails,
  fetchWorkOrderDetails,
  setLoader,
  unsetLoader,
})(isAuthHOC(withNavigationFocus(BarcodeScanner)));
