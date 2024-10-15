import React from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import CheckBox from './Checkbox';
import {actuatedNormalize} from '../styles/dynamicFonts';

const cameraIcon = require('../assets/camera.png');
const increaseIcon = require('../assets/increase-icon.png');
const galleryIcon = require('../assets/upload-image.png');

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {toggleCaptureModal} from '../redux/captureModal/actions';
import {
  storeInstallList,
  storeImageDropBox,
} from '../redux/installation/actions';
import {salesOrderNoI} from '../redux/barcodeScanner/selector';
import {purchaseOrdListStyles} from '../styles/purchaseOrderListStyles';

function CaptureImage({
  changeSelectedItem,
  expand,
  handerExpand,
  imageSource,
  item,
  list,
  screen,
  salesOrderNoI,
  selectItem,
  storeImageDropBox,
  storeInstallList,
  toggleCaptureModal,
}) {
  // const [text, setText] = useState("");

  // const onChangeText = (text) => {
  //   if (+text) {
  //     setText(text);
  //   }
  // };
  //console.log('--------item----quantity------------', item);

  const temp = item.Status.filter(el => {
    return el.Status === 'PRINT - INSTALLED';
  });

  //console.log('--------temp----element------------', temp);

  const [number, onChangeNumber] = React.useState(temp[0].value);
  const [numData] = React.useState(item.WOQuantity);

  const changeToCamera = item => {
    changeSelectedItem(item);
    storeInstallList(list);
    toggleCaptureModal(true);
  };

  const handleChoosePhoto = item => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then(images => {
        saveGalleryImages(images, item);
      })
      .catch(err => console.log(err));
  };

  const saveGalleryImages = (images, item) => {
    const res = list.map(ele => {
      if (ele.no === item.no) {
        return {
          ...ele,
          addedImage: true,
          images,
        };
      }
      return ele;
    });
    storeInstallList(res);

    const selectedItem = res.filter(ele => ele.no === item.no)?.[0];
    storeImageDropBox(selectedItem, res, salesOrderNoI, false);
  };

  const openBrowser = url => {
    if (!url) return;
    Linking.openURL(url);
  };

  const onchangeHandler = text => {
    onChangeNumber(text);
    console.log('type of woq', typeof parseInt(item.WOQuantity));
    item.WOQuantity = parseInt(text);
  };

  return (
    <>
      <View style={styles.list}>
        <CheckBox
          selected={item.checked ? true : false}
          handler={selectItem}
          itemNo={item.no}
        />
        <Text style={styles.listNo}>{item.no + ' '}.</Text>
        <View style={{flex: 1, paddingHorizontal: '1%'}}>
          <Text style={styles.itemBody}>{item.body.slice(0, 40)}.</Text>
          <Text style={styles.itemWorkNo}>{item.workNo}</Text>

          {expand[1] === item.no && expand[0] ? (
            <Text style={styles.itemDescription}>{item.body}</Text>
          ) : null}
          {!item.addedImage && (
            <View style={styles.addImage}>
              <TouchableOpacity onPress={() => changeToCamera(item)}>
                <Image source={cameraIcon} style={{width: 28, height: 26}} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginLeft: 7}}
                onPress={() => handleChoosePhoto(item)}>
                <Image source={galleryIcon} style={{width: 28, height: 26}} />
              </TouchableOpacity>
              {item.imagePath !== '' ? (
                <TouchableOpacity
                  style={styles.openBrowser}
                  onPress={() => openBrowser(item.imagePath)}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: actuatedNormalize(11),
                    }}>
                    Open Folder
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            handerExpand(item.no);
          }}>
          <Image source={imageSource} />
        </TouchableOpacity>
      </View>

      <View style={styles.thumbnail}>
        <SafeAreaView>
          <TextInput
            style={{
              marginRight: item.images ? '15%' : '28%',
              borderColor: '#A0A0A0',
              borderWidth: 1,
              height: 28,
              width: 100,
              paddingVertical: 5,
              borderRadius: 5,
            }}
            onChangeText={text => onchangeHandler(text)}
            value={number}
            placeholder="Work Quantity"
            keyboardType="numeric"
          />
        </SafeAreaView>
        {item.images?.length > 1
          ? [
              <Image
                style={styles.img}
                key={item.images[0].path}
                source={{
                  uri:
                    screen === 'Installation Camera'
                      ? `file://${item.images[0].path}`
                      : item.images[0].path,
                }}
              />,
              <View style={styles.length}>
                <Image source={increaseIcon} style={styles.increaseIcon} />
                <View>
                  {item.images?.length && (
                    <Text style={styles.lengthNum}>
                      {item.images?.length - 1}
                    </Text>
                  )}
                </View>
              </View>,
            ]
          : item.images?.map((image, index) => {
              return (
                <Image
                  style={styles.img}
                  key={image.path}
                  source={{
                    uri:
                      screen === 'Installation Camera'
                        ? `file://${image.path}`
                        : image.path,
                  }}
                />
              );
            })}
      </View>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  salesOrderNoI,
});
export default connect(mapStateToProps, {
  storeImageDropBox,
  storeInstallList,
  toggleCaptureModal,
})(CaptureImage);

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 0.5,
    backgroundColor: '#fff',
    marginVertical: '2%',
    height: 'auto',
    borderRadius: 10,
    borderColor: 'white',
    // flex: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
    marginBottom: '0.2%',
  },
  listNo: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: actuatedNormalize(15),
    color: '#E11D38',
    paddingHorizontal: '2%',
  },
  itemBody: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: actuatedNormalize(14),
    color: '#000000',
    paddingHorizontal: '2%',
  },
  itemWorkNo: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: actuatedNormalize(12),
    color: '#E11D38',
    marginTop: '4%',
  },
  itemDescription: {
    fontSize: actuatedNormalize(12),
    fontFamily: 'Poppins-Medium',
    width: '85%',
    color: '#rgba(0, 0, 0, 0.7)',
  },
  addImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    alignItems: 'center',
  },
  openBrowser: {
    marginLeft: 'auto',
    backgroundColor: '#DDDDDD',
    padding: 8,
    borderRadius: 20,
  },
  thumbnail: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginEnd: 50,
    marginLeft: 24,
    marginBottom: 4,
    paddingBottom: 4,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  increaseIcon: {
    width: 25,
    height: 25,
  },
  length: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lengthNum: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
