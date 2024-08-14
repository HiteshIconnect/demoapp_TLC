import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import BackGroundWrapper from '../HOC/addBackgroundHOC';
import Header from '../components/Header';
import isAuthHOC from '../HOC/isAuthHOC';
import ErrorModal from '../components/ErrorModal';
import {purchaseOrderStyle} from '../styles/purchaseOrder';
import RecentList from '../components/RecentList.component';
import {actuatedNormalize} from '../styles/dynamicFonts';
import {
  fetchPODetailsAPI,
  clearPurchaseOrderStatus,
  fetchRecent,
  fetchInventoryDetails,
  fetchRecentInventory,
  setFetchingStatus,
} from '../redux/purchaseOrder/actions';
import {selectToken, sendUserDetails} from '../redux/user/selector';
import {showWO} from '../redux/purchaseOrder/selector';
import {
  selectPurchaseList,
  selectPurchaseListStatus,
  selectRecentPOList,
  selectRecntAPIFetchStatus,
} from '../redux/purchaseOrder/selector';

import {storeInstallList} from '../redux/installation/actions';
import {
  fetchWorkOrderDetails,
  fetchRecentWorkOrder,
  fetchRecentSalesOrder,
  storeWorkOrderList,
} from '../redux/workOrder/actions';
import {
  postScannedBarcodes,
  allowUserToSeeWO,
} from '../redux/barcodeScanner/actions';
import {toggleCaptureModal} from '../redux/captureModal/actions';
import CaptureImageModal from '../components/CaptureImageModal';
import {salesOrderNoI} from '../redux/barcodeScanner/selector';
import {salesOrderNo} from '../redux/workOrder/selector';
const increaseIcon = require('../assets/increase-icon.png');

const PurchaseOrder = ({
  navigation,
  fetchPODetailsAPI,
  token,
  purchaseList,
  status,
  clearPurchaseOrderStatus,
  storeInstallList,
  userDetails,
  fetchRecent,
  recentPO = [],
  salesOrderNoI,
  salesOrderNo,
  fetchInventoryDetails,
  fetchRecentInventory,
  fetchStatus,
  setFetchingStatus,
  fetchWorkOrderDetails,
  postScannedBarcodes,
  fetchRecentSalesOrder,
  toggleCaptureModal,
  fetchRecentWorkOrder,
  showWO,
  allowUserToSeeWO,
}) => {
  const screen = navigation.getParam('type');
  const [poNum, changePoNum] = useState('');
  const [recentList, setRecentList] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [indexKey, setIndexKey] = useState({
    title: '',
    id: '',
  });
  const [wos, updateWos] = useState([]);
  const [loadMore, setLoadMore] = useState(true);

  const screenNavigator = async id => {
    console.log('screenNavigator: ', id);

    if (screen === 'Purchase Order') {
      fetchPODetailsAPI(id, token, userDetails.email);
    }

    if (screen === 'Production Management') {
      await fetchWorkOrderDetails(
        '',
        token,
        userDetails.email,
        userDetails.currentRole,
        id,
      );
      //await changePoNum("")
    }

    if (screen === 'Work Order Details') {
      //await fetchWorkOrderDetails('',token,userDetails.email,userDetails.currentRole,id);
      await postScannedBarcodes(
        [id],
        userDetails.currentRole,
        userDetails.email,
        token,
      );
      //await changePoNum("")
    }

    if (screen === 'Inventory Transfer') {
      await fetchInventoryDetails(id, token);
    }

    if (screen === 'Pick Up') {
      return 'InstallationPickup';
    }

    if (screen === 'InstallationDeliver' || screen === 'Capture Images') {
      storeInstallList();
      return 'InstallationStatus';
    }
  };

  useEffect(() => {
    console.log('first useEffect');
    if (status) {
      const screenToNavigate = screenToSelect[screen];
      navigation.navigate(screenToNavigate, {screen});

      clearPurchaseOrderStatus();
    }
  }, [status, purchaseList]);

  useEffect(() => {
    console.log('second useEffect');
    setFetchingStatus(true);
  }, []);

  useEffect(() => {
    console.log('third useEffect');

    if (fetchStatus == true) {
      if (screen == 'Purchase Order') fetchRecent(token, userDetails.email);
      if (screen === 'Inventory Transfer')
        fetchRecentInventory(token, userDetails.email);
      if (screen == 'Production Management')
        fetchRecentSalesOrder(token, userDetails.email);
      if (
        screen === 'InstallationDeliver' ||
        screen === 'Pick Up' ||
        screen === 'Capture Images' ||
        screen === 'Delivered to Client' ||
        screen === 'Work Order Details'
      )
        fetchRecentWorkOrder(token, userDetails.email);
    }
    setRecentList(recentPO);
    selectKeyOfRecent();
  }, [fetchStatus]);

  useEffect(() => {
    console.log('fourth useEffect');

    const screenMap = {
      'Pick Up': 'InstallationPickup',
      InstallationDeliver: 'ProductionStatus',
      'Capture Images': 'InstallationStatus',
      'Delivered to Client': 'InstallationPickup',
      'Work Order Details': 'ProductionItemDetail',
    };
    if (showWO) {
      if (screen === 'Work Order Details') {
        const dataList = [];

        recentPO.map(item => {
          return dataList.push({
            id: Math.random(),
            no: item['SO line number'],
            title: item['Assembly Item'],
            body: item['Item Description'],
            totalQty: item['Quantity'],
            workNo: item['WO Number'],
            zone: item['Zone'],
            SONo: salesOrderNoI,
            //showQtyBtn: showQty(status.title),
            location: item['location'],
            area: item['AreaCode'],
            project: item['project'],
            customer: item['Customer'],
            qty: 0,
            currentStatQty: 0,
            additionalRemark: item['comments'],
            printFile: item['PrintLink'],
            itemCode: item['Filename'],
            itemName: item['itemName'],
            function_area_item: item['functionArea'],
            product_type: item['productType'],
          });
        });
        navigation.navigate(screenMap[screen], {
          itemDetails: dataList[0],
          prodStatus: 'abcdefg',
          moveTo: '',
          screen: screen,
        });
        updateWos([]);
        allowUserToSeeWO(false);
      } else {
        navigation.navigate(screenMap[screen], {screen});
        updateWos([]);
        allowUserToSeeWO(false);
      }
    }
  }, [showWO]);

  useEffect(() => {
    const focusListener = navigation.addListener('didFocus', () => {
      console.log('The screen is focused after camera');
      console.log('-----------------------2222');
      setLoadMore(true);
    });

    return () => {
      focusListener.remove();
    };
  }, []);

  const fetchPODetails = async PO => {
    console.log('----> fetchPODetails <-----');
    console.log('workorder Array -->', wos);
    console.log('PO -->', PO);
    console.log('loadMore -->', loadMore);

    if (
      screen === 'InstallationDeliver' ||
      screen === 'Pick Up' ||
      screen === 'Capture Images' ||
      screen === 'Delivered to Client'
    ) {
      const woArray = [];
      if (!wos.includes(PO)) {
        woArray.push(...wos, PO);
        updateWos(woArray);
      }
      if (woArray.length === 1) {
        console.log('aPI got fired for single WO');
        console.log('inside single WO', woArray);
        await postScannedBarcodes(
          woArray,
          userDetails?.currentRole,
          userDetails?.email,
          token,
        );
        changePoNum('');
        return;
      }
      console.log('aPI got fired');
      console.log('inside else', wos);

      if (wos.length <= 0) return;
      await postScannedBarcodes(
        wos,
        userDetails?.currentRole,
        userDetails?.email,
        token,
      );

      // if(loadMore){
      //   toggleCaptureModal(true)
      // }else if(loadMore===false && wos.length<=0){
      //   console.log("handled clear wo condition on blank list")
      //   toggleCaptureModal(true)
      // }
      // else{
      //   console.log("aPI got fired");
      //   console.log("inside else",wos);
      //   if(wos.length<=0)return;
      //   await postScannedBarcodes(wos, userDetails?.currentRole, userDetails?.email,token);
      // }
    }
    //uncomment
    screenNavigator(PO || wos[0]);
    changePoNum('');
  };

  const searchWorkOrders = async more => {
    console.log('list of WO arrays-->', wos);
    if (more) {
      changePoNum('');
      setLoadMore(true);
    } else {
      changePoNum('');
      setLoadMore(false);
    }
  };

  const openScanner = () => {
    console.log('screen for scanner >>', screen);
    if (
      screen === 'InstallationDeliver' ||
      screen === 'Pick Up' ||
      screen === 'Capture Images' ||
      screen === 'Delivered to Client' ||
      screen === 'Work Order Details'
    ) {
      return navigation.navigate('BarcodeScannerInstall', {screen});
    }
    navigation.navigate('BarcodeScanner', {screen});
  };

  const selectKeyOfRecent = () => {
    if (screen == 'Purchase Order') {
      setIndexKey({
        title: 'PurchaseOrder ID',
        id: 'PurchaseOrder ID',
        date: 'date',
      });
    }

    if (screen == 'Inventory Transfer') {
      setIndexKey({
        title: 'Item',
        id: 'Item',
        date: 'Last Modified Date',
      });
    }

    if (screen == 'Production Management') {
      setIndexKey({
        title: 'SalesOrder Number',
        id: 'SalesOrder Number',
        date: 'date',
      });
    }

    if (
      screen === 'InstallationDeliver' ||
      screen === 'Pick Up' ||
      screen === 'Capture Images' ||
      screen === 'Delivered to Client' ||
      screen === 'Work Order Details'
    ) {
      setIndexKey({
        title: 'WorkOrder Id',
        id: 'WorkOrder Id',
        date: 'date',
      });
    }
  };

  const checkOrder = {
    'Production Management': 'Load Sales Order',
    'Inventory Transfer': 'Load Item Details',
    'Purchase Order': 'Load Purchase Order',
    'Pick Up': 'Load Work Order',
    InstallationDeliver: 'Load Work Order',
    'Capture Images': 'Load Work Order',
    'Delivered to Client': 'Load Work Order',
    'Work Order Details': 'Load Work Order',
  };

  const checkOrder1 = {
    'Production Management': 'Recent Sales Order',
    'Inventory Transfer': 'Recent Items',
    'Purchase Order': 'Recent Purchase Orders',
    'Pick Up': 'Recent Work Orders',
    InstallationDeliver: 'Recent Work Orders',
    'Capture Images': 'Recent Work Orders',
    'Delivered to Client': 'Recent Work Orders',
    'Work Order Details': 'Recent Work Orders',
  };

  const searchPlaceholder = {
    'Production Management': 'Enter SO no. or scan barcode',
    'Inventory Transfer': 'Enter Item No or Scan barcode',
    'Purchase Order': 'Enter PO no. or scan barcode',
    'Pick Up': 'Enter WO no. or scan barcode',
    InstallationDeliver: 'Enter WO no. or scan barcode',
    'Capture Images': 'Enter WO no. or scan barcode',
    'Delivered to Client': 'Enter WO no. or scan barcode',
    'Work Order Details': 'Enter WO no. or scan barcode',
  };

  const screenToSelect = {
    'Purchase Order': 'PurchaseOrderList',
    'Production Management': 'ProductionStatus',
    'Inventory Transfer': 'InventoryDetailPage',
    'Pick Up': 'InstallationPickup',
    InstallationDeliver: 'InstallationStatus',
    'Work Order Details': 'ProductionItemDetail',
  };

  const removeWO = workOrderNo => {
    console.log('Work Order Num', workOrderNo);
    console.log('WOS', wos);

    //filer
    const filteredWO = wos.filter(item => item !== workOrderNo);
    console.log('filteredWO: ', filteredWO);
    updateWos(filteredWO);
  };

  const addWOToScanList = PO => {
    console.log('PO: ', PO);

    const woArray = [];
    console.log('check for wo exists', wos.includes(PO));

    if (!wos.includes(PO)) {
      woArray.push(...wos, PO);
      updateWos(woArray);
    }
    changePoNum('');
  };

  console.log('screen is -->', screen);
  console.log('wos state-->', wos);
  return (
    <>
      <ErrorModal />
      <Header
        navigation={navigation}
        title={
          screen === 'Production Management' ? userDetails.currentRole : screen
        }
      />
      <CaptureImageModal
        searchMore={searchWorkOrders}
        mode={'multiple search'}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={purchaseOrderStyle.children}>
          <View style={purchaseOrderStyle.userInfoContainer}>
            <Image
              style={purchaseOrderStyle.userImage}
              source={require('../assets/userProfile.png')}
            />
            <View style={purchaseOrderStyle.nameFlexCol}>
              <Text
                style={[
                  purchaseOrderStyle.fontPoppins,
                  purchaseOrderStyle.userName,
                ]}>
                {userDetails?.fullName}
              </Text>
              <Text
                style={[
                  purchaseOrderStyle.fontPoppins,
                  purchaseOrderStyle.userDesgination,
                ]}>
                {userDetails?.currentRole}
              </Text>
            </View>
          </View>

          <View style={purchaseOrderStyle.barcodeContainer}>
            <View style={purchaseOrderStyle.barcode}>
              <View style={purchaseOrderStyle.barcodeFlex}>
                <TextInput
                  placeholderTextColor="#5C5C5C"
                  style={[
                    purchaseOrderStyle.fontPoppins,
                    purchaseOrderStyle.barcodeInput,
                  ]}
                  placeholder={searchPlaceholder[screen]}
                  onChangeText={changePoNum}
                  value={poNum}
                />

                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignContent: 'flex-end',
                    marginEnd: 2,
                  }}
                  onPress={openScanner}>
                  <Image source={require('../assets/barcode-input.png')} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                overflow: 'hidden',
                paddingRight: '2%',
                marginLeft: '5%',
              }}
              onPress={() => addWOToScanList(poNum)}>
              <Image
                source={increaseIcon}
                style={{
                  resizeMode: 'cover',
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  borderWidth: 2,
                  borderColor: '#E11D38',
                }}
              />
            </TouchableOpacity>
          </View>

          {/* list of multi-scan WO */}
          {wos.length > 0 && (
            <View style={purchaseOrderStyle.showContainer}>
              <View style={purchaseOrderStyle.recentOrderContainer}>
                <Text style={purchaseOrderStyle.recentOrderText}>
                  Scan Work Orders
                </Text>
              </View>
              <FlatList
                data={wos}
                keyExtractor={item => item.toString()}
                renderItem={({item}) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: '2%',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins',
                          fontSize: actuatedNormalize(15),
                          color: 'black',
                          paddingVertical: '1%',
                        }}>
                        {item}
                      </Text>
                      <TouchableOpacity onPress={() => removeWO(item)}>
                        <Image source={require('../assets/x.png')} />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          )}
          {poNum.length > 0 || wos.length > 0 ? (
            <View style={purchaseOrderStyle.loadOrderContainer}>
              <TouchableOpacity
                onPress={() => fetchPODetails(poNum)}
                style={
                  poNum || Boolean(wos.length > 0)
                    ? purchaseOrderStyle.loadOrderButton
                    : purchaseOrderStyle.loadOrderButtonDis
                }
                // disabled={(!Boolean(poNum)&&!Boolean(wos.length>0))||!Boolean(poNum) && loadMore }
                disabled={!Boolean(poNum) && !Boolean(wos.length > 0)}>
                <Text style={purchaseOrderStyle.loadOrderText}>
                  {checkOrder[screen]}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={purchaseOrderStyle.makeMargin50}>
            <View style={purchaseOrderStyle.recentOrderContainer}>
              <Text style={purchaseOrderStyle.recentOrderText}>
                {checkOrder1[screen]}
              </Text>
              <TouchableOpacity onPress={() => setViewAll(!viewAll)}>
                <Text style={purchaseOrderStyle.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={purchaseOrderStyle.recentWOcontainer}>
              <FlatList
                data={recentList}
                keyExtractor={item => item['WorkOrder Id']}
                renderItem={({item}) => {
                  return (
                    <RecentList
                      item={item}
                      indexKey={indexKey}
                      fetchPODetails={addWOToScanList}
                    />
                  );
                }}
                contentContainerStyle={{paddingBottom: 8}} // Add padding to the bottom of the FlatList
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  purchaseList: selectPurchaseList,
  status: selectPurchaseListStatus,
  userDetails: sendUserDetails,
  recentPO: selectRecentPOList,
  fetchStatus: selectRecntAPIFetchStatus,
  salesOrderNoI,
  salesOrderNo,
  showWO,
});

export default connect(mapStateToProps, {
  fetchPODetailsAPI,
  clearPurchaseOrderStatus,
  storeInstallList,
  fetchRecent,
  fetchInventoryDetails,
  fetchRecentInventory,
  setFetchingStatus,
  fetchWorkOrderDetails,
  fetchRecentSalesOrder,
  fetchRecentWorkOrder,
  postScannedBarcodes,
  toggleCaptureModal,
  allowUserToSeeWO,
})(isAuthHOC(BackGroundWrapper(PurchaseOrder)));
