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
  Platform
} from "react-native";
import SearchField from "../components/SearchField";
import FilterDropdown from "../components/FilterDropdown";
//import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
import isAuthHOC from "../HOC/isAuthHOC";
import successLoaderWrapper from '../HOC/successLoaderHOC'
import BackGroundWrapper from '../HOC/addBackgroundHOC'
import StatusPicker from '../components/StatusPicker'
import CheckBox from "../components/Checkbox";
import { purchaseOrdListStyles } from "../styles/purchaseOrderListStyles";
import Paginator from "../components/Paginator";
import ChangeQtyInputProd from "../components/ChangeQtyInputProd";
import { selectWorkOrderList, salesOrderNo } from "../redux/workOrder/selector";
import { sendUserDetails, selectToken } from "../redux/user/selector";
import { actuatedNormalize } from "../styles/dynamicFonts";
import {
  fetchRecentWorkOrder,
  fetchWorkOrderDetails,
  updateWODetails,
} from "../redux/workOrder/actions";
import { setError } from "../redux/errorModal/actions";

const ProductionDetails = ({
  navigation,
  itemList,
  salesOrderNo,
  userDetails,
  updateWODetails,
  fetchWorkOrderDetails,
  token,
  setError,
}) => {
  const { status, allStatuses, screen } = navigation.state.params;
  const [list, setList] = useState([]);
  const [tempList, changeTempList] = useState(null);
  const [selectAll, changeSelectAll] = useState(false);
  const [moveTo, setMoveTo] = useState("");
  const [moveToOrg, setMoveToOrg] = useState("");
  const [expand, changeExpand] = useState([false, null]);
  let [skip, changeSkip] = useState(0);
  const [customPage, changeCustomPage] = useState(1);
  const [disableUpdate, setDisableUpdate] = useState(false);
  const [postsPerPage] = useState(5);
  const [statusList, setStatusList]  = useState([])

  const indexOfLastPost = customPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
  const p = Math.ceil(list.length / postsPerPage);
  const paginate = pageNumber => changeCustomPage(pageNumber);

  useEffect(() => {
    const dataList = [];
    const filteredWO = itemList.filter(item => {
      const { Status } = item;
      const statusValPresent = !checkIfEmpty(
        Status.filter(statusItem => statusItem.Status === status.Status)[0]
          .value
      );
      return statusValPresent;
    });

    const receivedItems =
      userDetails?.currentRole === "TLC-Warehouse Manager"
        ? "WAREHOUSE - WORK ORDER RECEIVED"
        : "Production - Work Order Received";
    filteredWO.map((item, id) => {
      const resArray = item["Status"].filter(
        item => item.Status == status.Status
      );
      const val = resArray[0].value;
      return dataList.push({
        id,
        no: item["SO line number"],
        title: item["Assembly Item"],
        body: item["Item Description"],
        totalQty: item["Quantity"],
        workNo: item["WO Number"],
        zone: item["Zone"],
        //showQtyBtn: showQty(status.title),
        location: item["location"],
        area: item["AreaCode"],
        qty: val ? val : "",
        currentStatQty: val ? val : "",
      });
    });

    const sortedList = dataList.sort((a, b) => (a.no > b.no ? 1 : -1));
    setList(sortedList);
    const nextStatusList = statusMap();
    setMoveTo(nextStatusList?.[0]["title"]);
    setMoveToOrg(nextStatusList?.[0]['newTitle']);
  }, []);

  const checkIfEmpty = val => {
    if (val == null || val == undefined || val == "" || val == 0) {
      return true;
    }
    return false;
  };

  const statusMap = () => {
    let moveToList = [];
    allStatuses.map(stat => {
      if (stat.Status !== status.Status) {
        moveToList.push({ title: stat.Status, newTitle: stat.newStatus });
      }
    });
    return moveToList;
  };

    useEffect(()=>{
        let moveToList = [];
        allStatuses.map((stat)=> {
            if(stat.Status!==status.Status){
                moveToList.push({title:stat.Status,newTitle:stat.newStatus})
            }
        })
        setStatusList(moveToList)
    },[status])
  const showQty = status => {
    if (userDetails?.currentRole === "TLC-Warehouse Manager") {
      return showQtyWM[status];
    }
    return showQtyBtn[status];
  };

  const expandFunction = id => {
    changeExpand([!expand[0], id]);
  };

  const imageSource = expand[0]
    ? require("../assets/expand.png")
    : require("../assets/expandDown.png");

  const filterPages = (item, index) => {
    return index >= skip && index <= skip + 4;
  };

  const search = e => {
    if (e) {
      let res = list.filter(items => {
        return items.no == e;
      });
      changeTempList(res);
    } else {
      changeTempList(null);
    }
  };

  const selectAllItems = () => {
    const newList = list.map(item => {
      item.checked = !selectAll ? true : false;
      return item;
    });
    setList(newList);
    changeSelectAll(!selectAll);
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
    const isItemUnSelected = list.filter(item => {
      return !item.checked;
    });

    if (isItemUnSelected.length !== 0) {
      changeSelectAll(false);
    } else {
      changeSelectAll(true);
    }
    setList(newList);
  };

  const setQty = (no, value, sign) => {
    if (!value | isNaN(value)) value = 0;
    const newList = list.map(item => {
      if (item.no == no) {
        if (sign == "+") {
          item.qty = (parseInt(value) + 1).toString();
        } else if (sign == "-") {
          item.qty = (parseInt(value) - 1).toString();
        } else {
          item.qty = parseInt(value).toString();
        }
        return item;
      } else {
        return item;
      }
    });
    setList(newList);
  };

  function validateTransferableQuantity() {
    let qualityValidate = [];
    let selectedItems = [];
    if (selectAll) {
      list.map(item => {
        qualityValidate.push(
          parseInt(item.qty) > parseInt(item.currentStatQty) ? "false" : "true"
        );
      });
    } else {
      selectedItems = list.filter(item => {
        return item.checked;
      });
      selectedItems.map(item => {
        qualityValidate.push(
          parseInt(item.qty) > parseInt(item.currentStatQty) ? "false" : "true"
        );
      });
    }
    return qualityValidate;
  }
   const getTitle=(title)=>{
        setMoveTo(title);
     }

  const updateWO = async () => {
    //User shouldn't be able to transfer more than what is in the FROM status quantity.
    //This causes negative quantity values in the system
    const isValidatArray = validateTransferableQuantity();
    const isValidate = isValidatArray.some(value => {
      return value === "false";
    });
    if (isValidate) {
      setError(
        "Invalid Quantity",
        "Transferable quantity should be less than FROM status quantity"
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
          status: moveTo.trim(),
          oldStatus: status.Status.trim(),
          quantity: item.qty,
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
          status: moveTo.trim(),
          oldStatus: status.Status.trim(),
          quantity: item.qty,
        });
      });
    }

    // if(workOrderArray.length === 0) return setDisableUpdate(true)
    const data = {
      email: userDetails.email,
      role: userDetails.currentRole,
      WO: workOrderArray,
    };
    console.log("Workorder data",data);
    await updateWODetails(data, token);
  
    await fetchWorkOrderDetails(
      "",
      token,
      userDetails.email,
      userDetails.currentRole,
      salesOrderNo
    );
    await navigation.navigate("ProductionStatus");
  };

  const isChecked = list.filter(item => item.checked).length !== 0;
  return (
    <>
      <Header navigation={navigation} title={status.Status} />

      <View style={{ paddingHorizontal: "6%", flex: 1, alignItems: "center" }}>
        <View
          style={{
            height: "auto",
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
          <View
            style={{
              paddingHorizontal: "4%",
              paddingVertical: "7%",
              flexDirection: "column",
              justifyContent: "center",
              marginRight: "8%",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: actuatedNormalize(16),
                  fontFamily: "Poppins-Medium",
                  color: "black",
                }}
              >
                Move To :
              </Text>
              {Platform.OS!=="ios"?
              <StatusPicker
                value={moveTo}
                handler={setMoveTo}
                //setLableHandler={setMoveToOrg}
                list={statusMap()}
                role={userDetails?.currentRole}
              />:
	              <StatusPicker
                  value={moveToOrg}
                  handler={getTitle}
                  list={statusList}
                  role={userDetails?.currentRole}
                  />
              }
            </View>
            <View style={{ flexDirection: "column", marginTop: "5%" }}>
              <Text
                style={{
                  fontSize: actuatedNormalize(16),
                  fontFamily: "Poppins-Medium",
                  color: "black",
                }}
              >
                SO Number:{" "}
                <Text style={{ color: "#E11D38" }}>{salesOrderNo}</Text>{" "}
              </Text>
              <Text
                style={{
                  fontSize: actuatedNormalize(16),
                  fontFamily: "Poppins-Medium",
                  color: "black",
                }}
              >
                Total Items:{" "}
                <Text style={{ color: "#E11D38" }}>{status?.value}</Text>
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "-3%",
          }}
        >
          <SearchField handler={search} />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox selected={selectAll} handler={selectAllItems} />
            <Text
              style={{
                fontSize: actuatedNormalize(12),
                fontFamily: "Poppins",
                color: "#858585",
                marginLeft: "5%",
              }}
            >
              Select All
            </Text>
          </View>
        </View>

        <FlatList
          style={{ width: "100%", flex: 1, marginTop: "3%" }}
          data={tempList ? tempList : currentPosts.filter(filterPages)}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              key={item.no}
              elevation={3}
              style={{
                borderWidth: 0.5,
                backgroundColor: "#fff",
                marginVertical: "2%",
                height: "auto",
                borderRadius: 10,
                borderColor: "black",
                flex: 1,
                backgroundColor: "red",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.5,
                shadowRadius: 1,
                borderRightColor: "#000",
              }}
            >
              <LinearGradient
                colors={["#FFEDF0", "#FFFFFF"]}
                start={{ x: 0.1, y: 0.9 }}
                end={{ x: 0.8, y: 0.8 }}
              >
                <TouchableOpacity style={{ flexDirection: "row", flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "column",
                      paddingHorizontal: "4%",
                      paddingVertical: "4%",
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flex: 1,
                      }}
                    >
                      <CheckBox
                        selected={item.checked ? true : false}
                        handler={selectItem}
                        itemNo={item.no}
                      />
                      <Text
                        style={{
                          fontFamily: "Poppins-SemiBold",
                          fontSize: actuatedNormalize(14),
                          color: "#E11D38",
                          paddingHorizontal: "2%",
                        }}
                      >
                        {item.no}.
                      </Text>
                      <View style={{ flex: 1, paddingHorizontal: "1%" }}>
                        <Text
                          onPress={() => {
                            navigation.navigate("ProductionItemDetail", {
                              itemDetails: item,
                              prodStatus: status.Status,
                              moveTo,
                              screen,
                            });
                          }}
                          style={{
                            fontFamily: "Poppins-SemiBold",
                            fontSize: actuatedNormalize(14),
                            color: "black",
                          }}
                        >
                          {item.body.slice(0, 40)}
                        </Text>
                        {expand[1] === item.no && expand[0] ? (
                          <Text
                            style={{
                              fontSize: actuatedNormalize(12),
                              fontFamily: "Poppins-Medium",
                              width: "80%",
                              color: "#rgba(0, 0, 0, 0.7)",
                            }}
                          >
                            {item.body}
                          </Text>
                        ) : null}
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "110%",
                          }}
                        >
                          <View style={{}}>
                            <Text
                              style={{
                                fontFamily: "Poppins-SemiBold",
                                fontSize: actuatedNormalize(12),
                                color: "#E11D38",
                                marginTop: "4%",
                              }}
                            >
                              {item.workNo}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "Poppins-SemiBold",
                                fontSize: actuatedNormalize(12),
                              }}
                            >
                              Total Quantity{" "}
                              <Text style={{ color: "#E11D38" }}>
                                {item.totalQty}
                              </Text>
                            </Text>
                            <Text
                              style={{
                                fontFamily: "Poppins-SemiBold",
                                fontSize: actuatedNormalize(12),
                              }}
                            >
                              Current Status Quantity{" "}
                              <Text style={{ color: "#E11D38" }}>
                                {item.currentStatQty ? item.currentStatQty : 0}
                              </Text>
                            </Text>
                          </View>

                          <ChangeQtyInputProd
                            value={item.qty ? item.qty : 0}
                            handler={setQty}
                            itemNo={item.no}
                            dimensions={{ width: "40%", height: 34 }}
                            disableAdd={
                              parseInt(item.qty) >=
                              parseInt(item.currentStatQty)
                            }
                            disableSubtract={item.qty <= 0}
                          />
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{ height: "20%" }}
                        onPress={() => expandFunction(item.no)}
                      >
                        <Image source={imageSource} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
        />
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 42,
          marginBottom: "1%",
          height: 42,
        }}
      >
        <TouchableOpacity
          onPress={updateWO}
          disabled={!isChecked}
          style={{
            flex: 1,
            width: "55%",
            backgroundColor: isChecked ? "#E11D38" : "gray",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "white",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: actuatedNormalize(18),
              color: "white",
            }}
          >
            Update
          </Text>
        </TouchableOpacity>
      </View>

      <View style={purchaseOrdListStyles.paginatorContainer}>
        <View style={purchaseOrdListStyles.paginatorAlign}>
          {list.length ? (
            <Paginator
              p={p}
              list={list.length}
              skip={skip}
              changeSkip={changeSkip}
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
                <Image source={require("../assets/go-icon-red.png")} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  itemList: selectWorkOrderList,
  salesOrderNo,
  userDetails: sendUserDetails,
  token: selectToken,
});

export default connect(mapStateToProps, {
  updateWODetails,
  fetchWorkOrderDetails,
  setError,
})(isAuthHOC(BackGroundWrapper(ProductionDetails)));
