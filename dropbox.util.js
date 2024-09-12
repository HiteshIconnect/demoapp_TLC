import axios from 'axios';

const dev = {
  /**Dropbox configuration */
  REFRESH_TOKEN:
    '7t0b8Brpyn4AAAAAAAAAAQ3QZclJop28Is4ISSb6pkIQw7Sj4pZhrFKzoL-dFzhq',
  CLIENT_ID: '2druvmjwmfcqikw',
  CLIENT_SECRET: 'f0debuky9itw0vo',
};

const prod = {
  REFRESH_TOKEN:
    '7t0b8Brpyn4AAAAAAAAAAQ3QZclJop28Is4ISSb6pkIQw7Sj4pZhrFKzoL-dFzhq',
  CLIENT_ID: '2druvmjwmfcqikw',
  CLIENT_SECRET: 'f0debuky9itw0vo',
};

export const authorizeUser = async env => {
  try {
    const resultAccessToken = await axios({
      method: 'post',
      url: 'https://api.dropboxapi.com/oauth2/token',
      params: {
        grant_type: 'refresh_token',
        refresh_token:
          env === 'sandbox' ? dev.REFRESH_TOKEN : prod.REFRESH_TOKEN,
        client_id: env === 'sandbox' ? dev.CLIENT_ID : prod.CLIENT_ID,
        client_secret:
          env === 'sandbox' ? dev.CLIENT_SECRET : prod.CLIENT_SECRET,
      },
      headers: {'Content-Type': 'application/json'},
    });
    return resultAccessToken.data.access_token;
  } catch (error) {
    console.log(error);
  }
};

let accessToken = '';
const GetDropboxLink = async path => {
  console.log('GetDropboxLink', path);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    Dropbox_API_Select_User: 'dbmid:AAC-QNPQXpz55TMe8zmawCsZE5ZNqOvXp78',
  };
  const data = {
    direct_only: true,
    path: path,
  };
  try {
    return await axios.post(
      'https://api.dropboxapi.com/2/sharing/list_shared_links',
      data,
      {headers: headers},
    );
  } catch (error) {
    //if(error)console.log(">>374. Error from dropbox",error.response.data);
  }
};

/**prathmeshk 29-03-22
 * Generating sharable Dropbox link
 */

export const GenerateDropboxLink = async (path, env) => {
  console.log('inside dropbox utility', path, env);

  if (!path) return;

  accessToken = await authorizeUser(env);
  console.log('accessToken', accessToken);

  let result = '/' + path.toString().split('/').slice(5).join('/');
  console.log('path after slice', result);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    Dropbox_API_Select_User: 'dbmid:AAC-QNPQXpz55TMe8zmawCsZE5ZNqOvXp78',
  };
  const data = {
    path: result,
    settings: {
      access: 'viewer',
      allow_download: true,
      audience: 'public',
      requested_visibility: 'public',
    },
    //select_user: "dbmid:AAC-QNPQXpz55TMe8zmawCsZE5ZNqOvXp78",
  };
  console.log('data------', data);
  try {
    const response = await axios.post(
      'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
      data,
      {headers: headers},
    );
    console.log('response.data--', response?.data);
    console.log('response.data.url--', response?.data?.url);
    return response.data.url;
  } catch (error) {
    console.log('error-generate-link', error.response.data);
    if (error.response.data.error['.tag'] === 'shared_link_already_exists') {
      const resURL = await GetDropboxLink(result);
      return resURL.data.links[0].url;
    }
  }
};
