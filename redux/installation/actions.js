import { installationTypes } from "./types";
import api from "../../services/api";
import { setLoader,unsetLoader } from "../loaderModal/actions";
import {GenerateDropboxLink} from '../../dropbox.util';

export const storeInstallList=(list=[])=>{
  return {
    type:installationTypes.STORE_ITEMS_WITH_IMAGE_LIST,
    payload:list
  }
}

export const storeImageFlag=(flag)=>{
  return {
    type:installationTypes.STORE_IMAGES,
    payload:flag
  }
}

export const storeKeys=(keys=[])=>{
  return {
    type:installationTypes.STORE_LIST_KEYS,
    payload:keys
  }
}

export const storeSelectedItems=(itemsArr)=>{
  return {
    type:installationTypes.STORE_SELECTED_ITEMS,
    payload:itemsArr
  }
}

export const storeImageDropBox=(woArray,list,salesOrderNo,fromCamera)=>{
  console.log("data for storeImageDropBox")
  console.log("--------------------------")
  console.log("selectedItem-->",woArray);
  console.log("res-->",list)
  console.log("salesOrderNo-->",salesOrderNo)
  console.log("fromCamera-->",fromCamera)
  console.log("--------------------------")

  return async (dispatch,getState)=>{
    const {env} = getState().user;

    console.log("environment-->",env);
    dispatch(setLoader());

    try {
          const {workNo,images} = woArray;
          const bodyFormData = new FormData();
          const imageArray = images.map((img,i)=> {
            const date = new Date();
            return {
              uri:fromCamera?`file://${img.path}`:img.path,
              name:`${workNo}_${date.getHours()}${date.getMilliseconds()}${i}.jpg`,
              type: 'image/jpeg'
            }
          })
          imageArray.forEach((image)=>{
            bodyFormData.append('capturedImages[]',image);
          })
          bodyFormData.append('workOrderNo',workNo)
          bodyFormData.append('salesOrderNo',salesOrderNo);
          let res=await api.postFormData(bodyFormData,"imageUpload");
          console.log("response of netsuite-->",res.data);

          //logic for making shared link
          const dbxObj=await GenerateDropboxLink(res.data[0],env);
          console.log("dbx ency link",dbxObj);

          const index = list.findIndex((obj)=>obj.no === woArray.no)
          list[index]["dropboxURL"] = res.data[0];
          list[index]["encryptedLink"]=dbxObj;
          console.log("List-->",list);

          await dispatch(storeInstallList(list));
          await dispatch(storeImageFlag(fromCamera?{isCamera:true,isGallery:false}:{isCamera:false,isGallery:true}))
          await dispatch(unsetLoader());
    } catch (error) {
        dispatch(unsetLoader());
        console.log('error is ',error)
    }
  }
}

