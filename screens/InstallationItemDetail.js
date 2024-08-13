import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Header from "../components/Header";
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import SearchField from '../components/SearchField'
import FilterDropdown from "../components/FilterDropdown";
//import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
import isAuthHOC from "../HOC/isAuthHOC";
import withFontWrapper from '../HOC/addFontHOC'
import BackGroundWrapper from '../HOC/addBackgroundHOC'
import Picker from '../components/Picker2'
import { actuatedNormalize } from '../styles/dynamicFonts'
import { selectInstallList } from "../redux/installation/selector";
import { storeInstallList } from '../redux/installation/actions'
import ChangeQtyInput from "../components/ChangeQtyInput";

const InstallationItemDetail = ({ navigation, items, storeInstallList }) => {

    const id = navigation.getParam("id")
    const [item, setItem] = useState({})
    const [imageCount, setImageCount] = useState(0)

    useEffect(() => {
        let res = items.filter((item) => {
            return item.id == id
        })
        setItem(items[0])
        setImageCount(items[0].images?.length)
    })

    const deleteImage = (uri) => {
        let res = item.images?.filter((image) => {
            return image.uri !== uri
        })
        let itemCpy = { ...item }
        itemCpy.images = res

        setItem(itemCpy)
        setImageCount(imageCount - 1)

        let totalArrCpy = [...items]

        let res2 = totalArrCpy.map((product) => {
            if (product.id == item.id) {
                return {
                    ...itemCpy
                }

            }
            return product
        })
        storeInstallList(res2)
    }

    const takePhoto = () => {
        if (imageCount === 3) return
        const itemCpy = { ...item }
        itemCpy.takeSingle = true
        setItem(itemCpy)
        navigation.navigate("InstallationCamera", { singleMode: true, id })
    }
    return (
        <>
            <Header
                navigation={navigation}
                title={
                    "Item Detail"
                }
            />
            <View style={{ paddingHorizontal: "7%", flex: 1 }}>


                <View style={{
                    flexDirection: 'column', backgroundColor: 'white', height: 'auto', bottom: '5%', borderWidth: 1, borderRadius: 5, borderColor: 'white', elevation: 3, shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.5,
                    shadowRadius: 1,
                }}>
                    <View style={{ paddingHorizontal: '4%', paddingVertical: '4%', height: 'auto' }}>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <View style={{ flexDirection: 'column', marginBottom: '2%', flex: 0.6 }}>
                                    <Text style={{ fontSize: actuatedNormalize(12), fontFamily: 'Poppins-Medium', color: 'rgba(0, 0, 0, 0.6)' }}>Item Description:</Text>
                                    <Text style={{ fontSize: actuatedNormalize(12), fontFamily: 'Poppins-Medium' }}>Indoor Free Standing Backdrop - TS MOD Covered with Poly Woven B1 Fabric and Liner with Counterweights, with Liner,  W=7.6m x H=3.5m, Production Ready Artworks by the Client</Text>
                                </View>
                                <View style={{ flex: 0.4 }}>
                                    <Image
                                        style={{ flex: 0.8, width: '95%' }}
                                        source={require("../assets/screw.png")}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>

                                <View style={{ flexDirection: 'column', marginBottom: '2%', flex: 0.5 }}>
                                    <Text style={{ fontSize: actuatedNormalize(14), fontFamily: 'Poppins-Medium', color: 'rgba(0, 0, 0, 0.6)' }}>WO Number</Text>
                                    <Text style={{ fontSize: actuatedNormalize(14), fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>W21060001</Text>
                                </View>


                                <View style={{ flexDirection: 'column', marginBottom: '2%', flex: 0.5 }}>
                                    <Text style={{ fontSize: actuatedNormalize(14), fontFamily: 'Poppins-Medium', color: 'rgba(0, 0, 0, 0.6)' }}>Quantity</Text>
                                    <Text style={{ fontSize: actuatedNormalize(14), fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>50</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <View style={{ flexDirection: 'column', marginBottom: '2%', flex: 0.5 }}>
                                    <Text style={{ fontSize: actuatedNormalize(14), fontFamily: 'Poppins-Medium', color: 'rgba(0, 0, 0, 0.6)' }}>Line Number</Text>
                                    <Text style={{ fontSize: actuatedNormalize(14), fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>2</Text>
                                </View>

                                <View style={{ flexDirection: 'column', marginBottom: '2%', flex: 0.5 }}>
                                    <Text style={{ fontSize: actuatedNormalize(14), fontFamily: 'Poppins-Medium', color: 'rgba(0, 0, 0, 0.6)' }}>Location</Text>
                                    <Text style={{ fontSize: actuatedNormalize(14), fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>Khalifa Stadium</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <View style={{ flexDirection: 'column', marginBottom: '2%', flex: 0.5 }}>
                                    <Text style={{ fontSize: actuatedNormalize(14), fontFamily: 'Poppins-Medium', color: 'rgba(0, 0, 0, 0.6)' }}>Area</Text>
                                    <Text style={{ fontSize: actuatedNormalize(14), fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>Area 123</Text>
                                </View>

                                <View style={{ flexDirection: 'column', marginBottom: '2%', flex: 0.5 }}>
                                    <Text style={{ fontSize: actuatedNormalize(14), fontFamily: 'Poppins-Medium', color: 'rgba(0, 0, 0, 0.6)' }}>Zone</Text>
                                    <Text style={{ fontSize: actuatedNormalize(14), fontFamily: 'Poppins-SemiBold', color: '#E11D38' }}>Field Of Play</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: '20%' }}>
                    {
                        item.addedImage ?
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => takePhoto()} style={{ flex: 1, }}>
                                    <Image style={{ height: 70, width: 70 }} source={require('../assets/takePhoto.png')} />
                                </TouchableOpacity>
                                {item.images?.length > 0 ?
                                    item.images.map((image) => {
                                        return (
                                            <View key={image.uri}>
                                                <TouchableOpacity onPress={() => deleteImage(image.uri)} style={{ position: 'absolute', top: 0, right: 0, zIndex: 40 }}>
                                                    <Image source={require('../assets/x-circle.png')} style={{ alignSelf: 'flex-end' }} />
                                                </TouchableOpacity>
                                                <Image style={{ width: 70, height: 70, marginHorizontal: "1%", borderRadius: 5 }} key={image.uri} source={{ uri: image.uri }} />
                                            </View>
                                        )
                                    })
                                    :
                                    null
                                }
                            </View>
                            : null

                    }


                    <View style={{
                        marginTop: '5%', flexDirection: 'column', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 1, elevation: 3, height: 152, borderRadius: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.5,
                        shadowRadius: 1,
                    }}>
                        <LinearGradient
                            colors={['#FFEDF0', '#FFFFFF']}
                            start={{ x: 0.1, y: 0.9 }}
                            end={{ x: 0.8, y: 0.8 }}
                            style={{ flex: 1, borderRadius: 5 }}
                        >
                            <View style={{ paddingHorizontal: '4%', paddingVertical: "3%", flex: 1 }}>

                                <Text style={{ fontSize: actuatedNormalize(16), fontFamily: "Poppins-SemiBold" }}>Production Status : <Text style={{ fontFamily: "Poppins-Medium", color: '#E11D38' }}>Installation</Text> </Text>

                                <View style={{ flexDirection: 'column', marginTop: "5%", flex: 1 }}>
                                    <View style={{ flexDirection: 'row', paddingHorizontal: '3%', flex: 1, justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: actuatedNormalize(14), fontFamily: "Poppins-Medium" }}>Print</Text>
                                        <ChangeQtyInput value={''} handler={''} dimensions={{ width: 108, height: 34 }} />
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingHorizontal: '3%', flex: 1, justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: actuatedNormalize(14), fontFamily: "Poppins-Medium" }}>Hardware</Text>
                                        <ChangeQtyInput value={''} handler={''} dimensions={{ width: 108, height: 34 }} />
                                    </View>

                                </View>

                            </View>

                        </LinearGradient>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 42, marginTop: '6%', height: 42 }}>
                        <TouchableOpacity style={{ flex: 1, width: '65%', backgroundColor: '#E11D38', justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: 'white' }}>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 18, color: 'white' }}>Update</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>




            </View>
        </>
    )
}
const mapStateToProps = createStructuredSelector({
    items: selectInstallList
})

export default connect(mapStateToProps, {
    storeInstallList
})(
    isAuthHOC(
        BackGroundWrapper(InstallationItemDetail)
    )
)