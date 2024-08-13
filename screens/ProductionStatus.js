import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Header from "../components/Header";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import SearchField from "../components/SearchField";
import FilterDropdown from "../components/FilterDropdown";
//import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
import isAuthHOC from "../HOC/isAuthHOC";
import successLoaderWrapper from '../HOC/successLoaderHOC';
import BackGroundWrapper from '../HOC/addBackgroundHOC'
import { actuatedNormalize } from "../styles/dynamicFonts";
import { statusList, salesOrderNo } from "../redux/workOrder/selector";
import { sendUserDetails } from "../redux/user/selector";
import { totalCount } from "../redux/barcodeScanner/selector";
import { salesOrderNoI } from "../redux/barcodeScanner/selector";
import SuccessModal from "../components/SuccessModal";

const ProductionStatus = ({
  navigation,
  statusList,
  salesOrderNo,
  userDetails,
  totalCountInstall,
  salesOrderNoI,
}) => {
  const [list, changeList] = useState([]);
  const [tempList, changeTempList] = useState([]);
  const [filter, changeFilter] = useState("All");

  const setValueArray=userDetails?.currentRole === "TLC-Installer"
  ? totalCountInstall
  : statusList
  const valueArray = Object.values(
    setValueArray||{}
  );
  const res = valueArray.map(key =>
    key.value === "" || key.value === null || key.value === undefined
      ? (key.value = 0)
      : (key.value = parseInt(key.value))
  );

  let num = 1,
    no = 1;
  const sumFunction = (acc, obj) => acc + obj.value;
  const totalStatusVal = valueArray.reduce(sumFunction, 0);

  useEffect(() => {
    const newStatusArray = [];

    if (userDetails?.currentRole === "TLC-Installer") {
      const installerArray = [...totalCountInstall];
      installerArray.map(item => {
        //item.Status=item.Status.split('-').pop();
        item.newStatus = item.Status.slice(item.Status.indexOf("-") + 1).trim();
        return item;
      });

      //const result = [];
      // installerArray.reduce(function(res, status) {
      //   if (!res[status.newStatus]) {
      //         res[status.newStatus] = { Status:status.newStatus, id: status.id, value: status.value, name: [status.Status]};
      //         result.push(res[status.newStatus])

      //   }else{
      //     res[status.newStatus].value += status.value;
      //     res[status.newStatus].name.push(status.Status)
      //   }
      //   return res;
      // }, {});

      let res = {};
      const result = [];
      installerArray.map(item => {
        if (!res[item.newStatus]) {
          res[item.newStatus] = {
            Status: item.newStatus,
            value: item.value,
            name: [item.Status],
            statusValue: [{ [item.Status]: item.value }],
          };

          result.push(res[item.newStatus]);
        } else {
          res[item.newStatus].value += item.value;
          res[item.newStatus].name.push(item.Status);
          res[item.newStatus].statusValue.push({ [item.Status]: item.value });
        }
      });

      const statusListWithId = result.map((item, i) => {
        item.id = i + 1;
        return item;
      });
      newStatusArray.push(...statusListWithId);
    } else {
      const statusListWithId = statusList.map((item, i) => {
        item.id = i + 1;
        item.newStatus = item.Status;
        return item;
      });

      const modifiedStatusArray = statusListWithId.map(status => {
        let count = status.newStatus.split("-").length;
        if (count === 1) return status;
        else
          return {
            ...status,
            newStatus: status.newStatus.split("-").splice(1).join("-").trim(),
          };
      });
      newStatusArray.push(...modifiedStatusArray);
    }
    changeTempList([...newStatusArray]);
    changeList([...newStatusArray]);
  }, []);
  useEffect(() => {
    if (
      userDetails?.currentRole === "TLC-Warehouse Manager" ||
      userDetails?.currentRole === "TLC-Production Manager"
    ) {
      const newStatusArray = [];
      const statusListWithId = statusList.map((item, i) => {
        item.id = i + 1;
        item.newStatus = item.Status;
        return item;
      });

      const modifiedStatusArray = statusListWithId.map(status => {
        let count = status.newStatus.split("-").length;
        if (count === 1) return status;
        else
          return {
            ...status,
            newStatus: status.newStatus.split("-").splice(1).join("-").trim(),
          };
      });
      newStatusArray.push(...modifiedStatusArray);
      changeTempList([...newStatusArray]);
      changeList([...newStatusArray]);
    }
  }, [statusList]);

  useEffect(() => {
    let res = [];
    switch (filter) {
      case "All":
        changeTempList(list);
        break;
      default:
        res = list.filter(item => item.title === filter);
        changeTempList(res);
    }
  }, [filter]);

  const search = e => {
    if (e) {
      let res = list.filter(items => {
        return items.title.toLowerCase().includes(e.toLowerCase());
      });
      changeTempList(res);
    } else {
      changeTempList(list);
    }
  };

  const onStatusClick = item => {
    let navigateTo = "ProductionDetails";
    const { screen } = navigation.state.params;

    if (userDetails?.currentRole === "TLC-Installer") {
      navigateTo =
        screen === "Pick Up" ? "InstallationPickup" : "InstallationStatus";
    }

    navigation.navigate(navigateTo, {
      status: item,
      allStatuses: list,
      screen,
      valueArray: valueArray,
    });
  };

  return (
    <>
      <Header navigation={navigation} title={"Status"} />

      <View style={{ paddingHorizontal: "6%", flex: 1, alignItems: "center" }}>
        <View
          style={{
            height: 90,
            width: "100%",
            backgroundColor: "white",
            bottom: "5%",
            elevation: 3,
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 1,
          }}
        >
          <View style={{ paddingHorizontal: "4%", paddingVertical: "7%" }}>
            <Text
              style={{ fontSize: actuatedNormalize(16), fontFamily: "Poppins" }}
            >
              <Text style={{ color: "#494949" }}>SO No. :</Text>
              <Text style={{ fontFamily: "Poppins-Medium", color: "black" }}>
                {userDetails?.currentRole === "TLC-Installer"
                  ? salesOrderNoI
                  : salesOrderNo}
              </Text>
            </Text>
            <Text
              style={{ fontSize: actuatedNormalize(16), fontFamily: "Poppins" }}
            >
              <Text style={{ color: "#494949" }}>Total Items:</Text>{" "}
              <Text style={{ fontFamily: "Poppins-Medium", color: "black" }}>
                {totalStatusVal}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ width: "100%", height: "80%", marginTop: "2%" }}>
          <FlatList
            style={{ width: "100%", flex: 1, marginTop: "3%" }}
            data={tempList?.length == 0 ? list : tempList}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View
                  key={item.id}
                  elevation={3}
                  style={{
                    borderWidth: 0.5,
                    backgroundColor: "#fff",
                    marginVertical: "2%",
                    height: 68,
                    borderRadius: 10,
                    width: "98%",
                    borderColor: "white",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.5,
                    shadowRadius: 1,
                  }}
                >
                  <LinearGradient
                    colors={["#FFEDF0", "#FFFFFF"]}
                    start={{ x: 0.1, y: 0.9 }}
                    end={{ x: 0.8, y: 0.8 }}
                    // locations={[0.1, 0.8]}
                  >
                    <TouchableOpacity
                      onPress={() => onStatusClick(item)}
                      style={{ flexDirection: "row", height: 68 }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "space-between",
                          paddingHorizontal: "5%",
                          paddingVertical: "2%",
                          flex: 1,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              fontFamily: "Poppins-Medium",
                              fontSize: actuatedNormalize(16),
                              color: "black",
                            }}
                          >
                            {item.id}.
                          </Text>
                          <View
                            style={{
                              flexDirection: "column",
                              marginLeft: "2%",
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "Poppins-Medium",
                                fontSize: actuatedNormalize(16),
                                color: "black",
                              }}
                            >
                              {userDetails?.currentRole === "TLC-Installer"
                                ? item.Status
                                : item.newStatus}
                            </Text>

                            {userDetails?.currentRole === "TLC-Installer" ? (
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginLeft: "2%",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#494949",
                                    fontFamily: "Poppins",
                                    fontSize: actuatedNormalize(14),
                                  }}
                                >
                                  Print
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Poppins-Medium",
                                    fontSize: actuatedNormalize(14),
                                    color: "#E11D38",
                                    paddingLeft: 8,
                                  }}
                                >
                                  {item.statusValue?.[0]?.[item.name[0]] || 0}
                                </Text>

                                <Text
                                  style={{
                                    color: "#494949",
                                    fontFamily: "Poppins",
                                    fontSize: actuatedNormalize(14),
                                    paddingLeft: 8,
                                  }}
                                >
                                  Hardware
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Poppins-Medium",
                                    fontSize: actuatedNormalize(14),
                                    color: "#E11D38",
                                    paddingLeft: 8,
                                  }}
                                >
                                  {item.statusValue?.[1]?.[item.name[1]] || 0}
                                </Text>
                              </View>
                            ) : (
                              <Text
                                style={{
                                  fontFamily: "Poppins-Medium",
                                  fontSize: actuatedNormalize(18),
                                  color: "#E11D38",
                                }}
                              >
                                {item.value}{" "}
                                <Text
                                  style={{
                                    color: "#494949",
                                    fontFamily: "Poppins",
                                    fontSize: actuatedNormalize(12),
                                  }}
                                >
                                  items
                                </Text>
                              </Text>
                            )}
                          </View>
                        </View>
                        <TouchableOpacity
                          style={{ height: "100%", justifyContent: "center" }}
                        >
                          <Image source={require("../assets/go-to.png")} />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              );
            }}
          />
        </View>
      </View>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
    statusList,
    salesOrderNo,
    userDetails:sendUserDetails,
    totalCountInstall:totalCount,
    salesOrderNoI,
});

export default connect(mapStateToProps)(
    isAuthHOC(successLoaderWrapper(ProductionStatus))
)
