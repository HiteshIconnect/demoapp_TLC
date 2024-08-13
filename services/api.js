import axios from "axios";

const AWS_IP = "http://15.184.55.180:3000/";
const DEV_SERVER_IP = "http://172.25.12.93:5000";
const PROD_IP = "http://3.209.139.140:3000";

//DEV testing RULES
//change URL to your computers IPv4 address
//make sure that the server and mobile are in same network
const instance = axios.create({
  baseURL: AWS_IP,
  headers: {
    "content-type": "application/json",
  },
});

const routes = {
  login: "/v1/login",
  loginStatus: "/v1/loginStatus",
  mainUrl: "/v1/auth/getSignedInRestlet",
  imageUpload: "v1/uploadFile",
};

export default {
  getData: (data, route) =>
    instance({
      method: "GET",
      url: routes[route],
      data: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        // "x-access-token":data
      },
      
    }),
  postData: (data, route) =>
    instance({
      method: "POST",
      url: routes[route],
      data: data,
      headers: { "content-type": "application/json" },
    
    }),
  getDataWithParams: (data, route, params, token, query) =>
    instance({
      method: "POST",
      url: `${routes[route]}/${params?.scriptId}/${params?.deployId}`,
      data: data,
      headers: {
        "content-type": "application/json",
        "x-access-token": `Bearer ${token}`,
      },
      params: query ? query : null,
    }),
  postFormData: (data, route) =>
    instance({
      method: "POST",
      url: routes[route],
      data,
      headers: { "content-type": `multipart/form-data` },
    }),
};
