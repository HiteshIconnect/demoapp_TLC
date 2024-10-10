import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackGroundWrapper from '../HOC/addBackgroundHOC';
import Header from '../components/Header';
import isAuthHOC from '../HOC/isAuthHOC';
import CheckBox from '../components/Checkbox';
import SearchField from '../components/SearchField';
import {purchaseOrdListStyles} from '../styles/purchaseOrderListStyles';
import Paginator from '../components/Paginator';
import {actuatedNormalize} from '../styles/dynamicFonts';
import StatusPicker from '../components/StatusPicker';
import {
  storeInstallList,
  storeKeys,
  storeImageFlag,
} from '../redux/installation/actions';
import {selectInstallList, imageUploaded} from '../redux/installation/selector';
import CaptureImageModal from '../components/CaptureImageModal';

import {
  selectRecentPOList,
  salesOrderNoI,
} from '../redux/barcodeScanner/selector';
import {updateWODetails} from '../redux/workOrder/actions';
import {sendUserDetails, selectToken} from '../redux/user/selector';
import ErrorModal from '../components/ErrorModal';
import {setError} from '../redux/errorModal/actions';

import AppButton from '../components/AppButton.component';
import ListItem from '../components/ListItem.component';

const InstallationStatus = ({
  navigation,
  salesOrderNoI,
  imageUploaded,
  selectInstallList,
  woList,
  userDetails,
  token,
  updateWODetails,
  storeInstallList,
  storeImageFlag,
  setError,
}) => {
  const {status, allStatuses, screen} = navigation.state.params;
  const [selectAll, changeSelectAll] = useState(false);
  const [moveToP, setMoveToP] = useState({});
  const [moveToH, setMoveToH] = useState({});
  const [mode, changeMode] = useState(screen);
  const [list, setList] = useState([]);
  const [tempList, changeTempList] = useState([]);
  const [customPage, changeCustomPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [selectedItem, changeSelectedItem] = useState([]);
  console.log('screen-->', screen);
  console.log('----------woList------->', woList);

  const backAction = () => {
    console.log('screen from the back action-->', screen);
    screen === 'Installation Camera'
      ? navigation.navigate('DashBoard')
      : navigation.goBack();
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    let dataList = [];
    if (screen === 'Capture Images') {
      storeImageFlag({isCamera: false, isGallery: false});
      changeMode(screen);
      woList?.map((item, id) => {
        return dataList.push({
          id,
          no: item['SO line number'],
          title: item['Assembly Item'],
          body: item['Item Description'],
          totalQty: item['Quantity'],
          workNo: item['WO Number'],
          zone: item['Zone'],
          location: item['location'],
          area: item['AreaCode'],
          imagePath: item['ImagePath'],
          WOQuantity: item['Quantity'],
          Status: item['Status'],
        });
      });
    } else {
      const filteredWO = woList.filter(item => {
        const {Status} = item;
        let statusValPresent = [];
        status.name.map(name => {
          const statusVal = !checkIfEmpty(
            Status.filter(
              item =>
                item.Status == status.name[0] || item.Status == status.name[1],
            )[0].value,
          );
          statusValPresent.push(statusVal);
        });
        return statusValPresent;
      });
      filteredWO.map((item, id) => {
        return dataList.push({
          id,
          no: item['SO line number'],
          title: item['Assembly Item'],
          body: item['Item Description'],
          totalQty: item['Quantity'],
          workNo: item['WO Number'],
          zone: item['Zone'],
          location: item['location'],
          area: item['AreaCode'],
          hwQty:
            item['Status'].filter(stat => stat.Status === status.name[1])[0]
              .value || 0,
          printQty:
            item['Status'].filter(stat => stat.Status === status.name[0])[0]
              .value || 0,
          hwQty1:
            item['Status'].filter(stat => stat.Status === status.name[1])[0]
              .value || 0,
          printQty1:
            item['Status'].filter(stat => stat.Status === status.name[0])[0]
              .value || 0,
        });
      });
      const nextStatusList = statusMap();

      handleMoveToH(nextStatusList?.[0]['title']);
      handleMoveToP(nextStatusList?.[0]['title']);
    }
    const sortedList = dataList.sort((a, b) => (a.no > b.no ? 1 : -1));
    setList(sortedList);
    changeTempList(sortedList);
    storeInstallList(sortedList);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    const focusListener = navigation.addListener('didFocus', () => {
      console.log('The screen is focused after camera');
      console.log('-----------------------');
      console.log(selectInstallList);

      // Call any action
      if (imageUploaded.isCamera) {
        console.log('inside camera effect true');
        setList(selectInstallList);
        changeTempList(selectInstallList);
      }
    });
    return () => {
      if (imageUploaded.isCamera) {
        storeImageFlag({isCamera: false, isGallery: false});
      }
      focusListener.remove();
    };
  }, [imageUploaded.isCamera, selectInstallList]);

  useEffect(() => {
    console.log('Inside gallery effect2');
    console.log('-----------------------');
    console.log(selectInstallList);

    if (imageUploaded.isGallery) {
      console.log('inside gallery effect true');
      setList(selectInstallList);
      changeTempList(selectInstallList);
    }

    return () => {
      if (imageUploaded.isGallery) {
        storeImageFlag({isCamera: false, isGallery: false});
      }
    };
  }, [imageUploaded.isGallery, selectInstallList]);

  const checkIfEmpty = val => {
    if (val == null || val == undefined || val == '' || val == 0) {
      return true;
    }
    return false;
  };

  const statusMap = () => {
    let moveToList = [];

    allStatuses.map(stat => {
      if (stat.Status !== status.Status) {
        moveToList.push({title: stat.Status});
      }
    });
    return moveToList;
  };

  const selectItem = no => {
    const newList = list.map(item => {
      if (item.no == no) {
        item.checked = item.checked ? false : true;
        return item;
      } else {
        return item;
      }
    });
    setList(newList);
  };

  const selectAllItems = () => {
    const newList = list.map(item => {
      item.checked = !selectAll ? true : false;
      return item;
    });
    setList(newList);
    changeSelectAll(!selectAll);
  };

  const search = e => {
    // if(!isNaN(e)) return
    if (e) {
      let res = list.filter(items => {
        return items.no == e;
      });
      changeTempList(res);
    } else {
      changeTempList(null);
    }
  };

  function validateTransferableQuantity() {
    let qualityValidate = [];
    let selectedItems = [];
    if (selectAll) {
      list.map(item => {
        qualityValidate.push(
          parseInt(item.printQty) > parseInt(item.printQty1) ||
            parseInt(item.hwQty) > parseInt(item.hwQty1)
            ? 'false'
            : 'true',
        );
      });
    } else {
      selectedItems = list.filter(item => {
        return item.checked;
      });
      selectedItems.map(item => {
        qualityValidate.push(
          parseInt(item.printQty) > parseInt(item.printQty1) ||
            parseInt(item.hwQty) > parseInt(item.hwQty1)
            ? 'false'
            : 'true',
        );
      });
    }
    return qualityValidate;
  }

  const updateWO = async () => {
    if (screen !== 'Capture Images') {
      //User shouldn't be able to transfer more than what is in the FROM status quantity.
      //This causes negative quantity values in the system
      const isValidatArray = validateTransferableQuantity();
      const isValidate = isValidatArray.some(value => {
        return value === 'false';
      });
      if (isValidate) {
        setError(
          'Invalid Quantity',
          'Transferable quantity should be less than FROM status quantity',
        );
        return;
      }
      let workOrderArray = [];
      let selectedItems = [];
      if (selectAll) {
        list.map(item => {
          if (item.qty == 0) return;
          workOrderArray.push({
            Workorder_number: item.workNo,
            status: moveToP.val.name[0],
            oldStatus: status.name[0],
            quantity: item.printQty,
            hwQuantity: item.hwQty,
            hwStatus: moveToH.val.name[1],
            hwOldStatus: status.name[1],
          });
        });
      } else {
        selectedItems = list.filter(item => {
          return item.checked;
        });
        selectedItems.map(item => {
          if (item.qty == 0) return;
          workOrderArray.push({
            Workorder_number: item.workNo,
            status: moveToP.val.name[0],
            oldStatus: status.name[0],
            quantity: item.printQty,
            hwQuantity: item.hwQty,
            hwStatus: moveToH.val.name[1],
            hwOldStatus: status.name[1],
          });
        });
      }

      const data = {
        email: userDetails.email,
        role: userDetails.currentRole,
        WO: workOrderArray,
      };
      console.log('update wo -->', data);

      await updateWODetails(data, token);
      navigation.navigate('DashBoard');
    } else {
      const urlListArray = selectInstallList;
      if (selectAll) {
        for (let i = 0; i < urlListArray.length; i++) {
          if (!urlListArray[i].hasOwnProperty('encryptedLink')) {
            setError(
              'Capture image',
              'Capture atleast one Image of each line item to update',
            );
            return;
          }
        }
      }

      let workOrderArray = [];
      let selectedItems = [];
      console.log('urlListArray-------------', urlListArray);
      if (selectAll) {
        urlListArray.forEach(item => {
          workOrderArray.push({
            Workorder_number: item.workNo,
            dropboxURL: item.encryptedLink,
            WOQuantity: item.WOQuantity,
          });
        });
      } else {
        selectedItems = urlListArray.filter(item => {
          return item.checked;
        });

        for (let i = 0; i < selectedItems.length; i++) {
          if (!selectedItems[i].hasOwnProperty('encryptedLink')) {
            setError(
              'Capture image',
              'Capture atleast one Image of each line item to update',
            );
            return;
          }
        }

        selectedItems.forEach(item => {
          workOrderArray.push({
            Workorder_number: item.workNo,
            dropboxURL: item.encryptedLink,
            WOQuantity: item.WOQuantity,
          });
        });
      }

      const data = {
        email: userDetails.email,
        role: userDetails.currentRole,
        WO: workOrderArray,
        action_type: 'capture_photo',
      };
      console.log('update wo with gallery', data);
      await updateWODetails(data, token);
      navigation.navigate('DashBoard');
    }
  };

  const isChecked = list.filter(item => item.checked).length !== 0;
  const handleMoveToH = item => {
    const moveTo = allStatuses.filter(stat => stat.Status === item);
    setMoveToH({key: moveTo[0].Status, val: moveTo[0]});
  };

  const handleMoveToP = item => {
    const moveTo = allStatuses.filter(stat => stat.Status === item);
    setMoveToP({key: moveTo[0].Status, val: moveTo[0]});
  };

  const updateDropbox = async () => {
    const urlListArray = selectInstallList;
    //if selectAll then do validate
    if (selectAll) {
      for (let i = 0; i < urlListArray.length; i++) {
        if (!urlListArray[i].hasOwnProperty('encryptedLink')) {
          setError(
            'Capture image',
            'Capture atleast one Image of each line item to update',
          );
          return;
        }
      }
    }

    let workOrderArray = [];
    let selectedItems = [];
    if (selectAll) {
      urlListArray.forEach(item => {
        workOrderArray.push({
          Workorder_number: item.workNo,
          dropboxURL: item.encryptedLink,
        });
      });
    } else {
      selectedItems = urlListArray.filter(item => {
        return item.checked;
      });

      for (let i = 0; i < selectedItems.length; i++) {
        if (!selectedItems[i].hasOwnProperty('encryptedLink')) {
          setError(
            'Capture image',
            'Capture atleast one Image of each line item to update',
          );
          return;
        }
      }

      selectedItems.forEach(item => {
        workOrderArray.push({
          Workorder_number: item.workNo,
          dropboxURL: item.encryptedLink,
        });
      });
    }

    const data = {
      email: userDetails.email,
      role: userDetails.currentRole,
      WO: workOrderArray,
      action_type: 'capture_photo',
    };
    console.log('update wo with camera', data);
    await updateWODetails(data, token);
    navigation.navigate('DashBoard');
  };
  const indexOfLastPost = customPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
  const p = Math.ceil(list.length / postsPerPage);
  const paginate = pageNumber => changeCustomPage(pageNumber);

  return (
    <KeyboardAwareScrollView>
      <ErrorModal />
      <CaptureImageModal
        navigation={navigation}
        changeTempList={changeTempList}
        setList={list}
        selectedItem={selectedItem}
      />

      <Header
        navigation={navigation}
        title={`${
          screen === 'Capture Images' || screen === 'Installation Camera'
            ? 'Capture Images'
            : status?.Status
        }`}
      />

      <View style={styles.container}>
        <View style={styles.UpdateStatusCardContainer}>
          <View style={styles.UpdateStatusCard}>
            {mode === 'InstallationDeliver' ? (
              <>
                <Text style={styles.moveTo}>Move to:</Text>
                <View style={styles.printContainer}>
                  <Text style={styles.print}>Print:</Text>
                  <StatusPicker
                    value={moveToP.key}
                    handler={handleMoveToP}
                    list={statusMap()}
                  />
                </View>
                <View style={styles.hardwareContainer}>
                  <Text style={styles.hardware}>Hardware:</Text>
                  <StatusPicker
                    value={moveToH.key}
                    handler={handleMoveToH}
                    list={statusMap()}
                  />
                </View>
                <View style={styles.totolItemsContainer}>
                  <Text style={styles.totolItems}>
                    <Text style={{color: '#494949'}}>Total Items:</Text>{' '}
                    <Text
                      style={{
                        fontSize: actuatedNormalize(12),
                        color: '#E11D38',
                      }}>
                      {status?.item}
                    </Text>
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View>
                  <Text
                    style={{
                      fontSize: actuatedNormalize(16),
                      fontFamily: 'Poppins-SemiBold',
                      color: '#E11D38',
                    }}>
                    {screen}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        fontSize: actuatedNormalize(14),
                        fontFamily: 'Poppins-SemiBold',
                        color: 'black',
                      }}>
                      Sales Order Number:
                    </Text>
                    <Text
                      style={{
                        fontSize: actuatedNormalize(12),
                        fontFamily: 'Poppins-SemiBold',
                        color: '#E11D38',
                      }}>
                      {salesOrderNoI}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        fontSize: actuatedNormalize(14),
                        fontFamily: 'Poppins-SemiBold',
                        color: 'black',
                      }}>
                      Total Items:
                    </Text>
                    <Text
                      style={{
                        fontSize: actuatedNormalize(12),
                        fontFamily: 'Poppins-SemiBold',
                        color: '#E11D38',
                      }}>
                      {list.length}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '1%',
          }}>
          <SearchField handler={search} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox selected={selectAll} handler={selectAllItems} />
            <Text
              style={{
                fontSize: actuatedNormalize(12),
                fontFamily: 'Poppins',
                color: '#858585',
                marginLeft: '5%',
              }}>
              Select All
            </Text>
          </View>
        </View>

        <FlatList
          style={{
            width: '100%',
            flex: 1,
            marginTop: '5%',
            height: screen === 'Capture Images' ? 410 : 298.5,
          }}
          data={tempList ? tempList : currentPosts}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <ListItem
                changeSelectedItem={changeSelectedItem}
                item={item}
                mode={mode}
                list={list}
                screen={screen}
                selectItem={selectItem}
                setList={setList}
              />
            );
          }}
        />
      </View>

      <View style={styles.btnContainer}>
        <AppButton
          onPress={screen === 'Installation Camera' ? updateDropbox : updateWO}
          isChecked={isChecked}
        />
      </View>

      <View style={purchaseOrdListStyles.paginatorContainer}>
        <View style={purchaseOrdListStyles.paginatorAlign}>
          {list.length ? (
            <Paginator
              p={p}
              list={list.length}
              customPageNumber={customPage}
              postsPerPage={postsPerPage}
              paginate={paginate}
              changeCustomPage={changeCustomPage}
            />
          ) : null}
          <View style={purchaseOrdListStyles.pageSearchContainer}>
            <TextInput
              style={purchaseOrdListStyles.pageSearchInput}
              placeholder="Page"
              onChangeText={val => {
                changeCustomPage(val);
              }}
            />
            <View style={purchaseOrdListStyles.pageSerachButtonFlex}>
              <TouchableOpacity>
                <Image source={require('../assets/go-icon-red.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = createStructuredSelector({
  selectInstallList,
  woList: selectRecentPOList,
  salesOrderNoI,
  userDetails: sendUserDetails,
  token: selectToken,
  imageUploaded,
});

export default connect(mapStateToProps, {
  storeInstallList,
  storeKeys,
  updateWODetails,
  storeImageFlag,
  setError,
})(isAuthHOC(BackGroundWrapper(withNavigation(InstallationStatus))));

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '6%',
    flex: 1,
    alignItems: 'center',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 42,
    marginBottom: '0.5%',
  },
  UpdateStatusCardContainer: {
    width: '100%',
    backgroundColor: 'white',
    bottom: '5%',
    elevation: 3,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  UpdateStatusCard: {
    paddingHorizontal: '4%',
    paddingVertical: '4%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  moveTo: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  printContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  print: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  hardwareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hardware: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  totolItemsContainer: {
    flexDirection: 'row',
    paddingTop: '5%',
    marginBottom: '2%',
  },
  totolItems: {
    fontSize: actuatedNormalize(14),
    fontFamily: 'Poppins-SemiBold',
  },
});
