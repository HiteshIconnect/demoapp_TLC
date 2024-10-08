import axios from "axios";

const dev={
     /**Dropbox configuration */
     "REFRESH_TOKEN":"VCpz1zwOIkkAAAAAAAAAAXhRCNb6CSeUJBxxtBtiu79K8SJL-f23rlD2yntSw_Ht",
     "CLIENT_ID" : "84hnkjynx2auebc",
     "CLIENT_SECRET" : "ent9jhr2l3wlolp",
}

const prod={

    "REFRESH_TOKEN":"4Nok8HB7rfgAAAAAAAAAAb4E08K-cw8mOda2sst0kCzyap895Q5sf8D2rpMj8vOP",
    "CLIENT_ID" : "xwvyf2tgvd2mjwd",
    "CLIENT_SECRET" : "xej597jf7d0dmd0",
}

export const authorizeUser=async(env)=> {
    try {
        const resultAccessToken = await axios({
        method: "post",
        url: "https://api.dropboxapi.com/oauth2/token",
        params: {
            grant_type: "refresh_token",
            refresh_token:env==="sandbox"?dev.REFRESH_TOKEN:prod.REFRESH_TOKEN,
            client_id:env==="sandbox"?dev.CLIENT_ID:prod.CLIENT_ID,
            client_secret: env==="sandbox"?dev.CLIENT_SECRET:prod.CLIENT_SECRET
        },
        headers: { "Content-Type": "application/json" },
        });
        return resultAccessToken.data.access_token;
    } catch (error) {
        console.log(error);
    }
}

let accessToken = "";
const GetDropboxLink=async (path)=> {
    console.log("GetDropboxLink",path)
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    };
    const data = {
        direct_only: true,
        path: path,
    };
    try {
        return await axios.post(
        "https://api.dropboxapi.com/2/sharing/list_shared_links",
        data,
        { headers: headers }
        );
    } catch (error) {
        //if(error)console.log(">>374. Error from dropbox",error.response.data);
    }
}
      
/**prathmeshk 29-03-22
 * Generating sharable Dropbox link
 */

export const GenerateDropboxLink=async (path,env)=>{
    console.log("inside dropbox utility",path,env);

    if(!path)return;
    
    accessToken = await authorizeUser(env);
    //console.log("accessToken",accessToken);

    let result = "/" + path.toString().split("/").slice(7).join("/");
    console.log("path after slice",result);

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    };
    const data = {
        path: result,
        settings: {
        audience: "public",
        access: "viewer",
        requested_visibility: "public",
        allow_download: true,
        },
    };
    try {
    const response = await axios.post(
        "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
        data,
        { headers: headers }
    );
    return response.data.url;
    } catch (error) {
        
        if (error.response.data.error[".tag"] === "shared_link_already_exists") {
            const resURL = await GetDropboxLink(result);
            return resURL.data.links[0].url;
        }
    }
}

    