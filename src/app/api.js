import { create } from 'apisauce'
import sha256 from 'crypto-js/sha256';

  const getSecreteCode = () => {
    let date = new Date();
    let ndate = date.getFullYear()+''+(date.getMonth()+1)+''+date.getDate()+'-'+date.getHours()+':'+date.getMinutes();
    let key = 'cR9i43OnLk7r9Ty44QespV2h'+'|'+ndate;
    // console.log(date.getMinutes());
    let enckey = sha256(key).toString();
    return enckey;
  }

  const api = create({
    baseURL: 'https://services.7searchppc.com/api',
    headers: {  
        // 'X-API-KEY': getSecreteCode(),
        'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h', 
        'Access-Control-Allow-Origin': true,
    },
  });

  const api2 = create({
    baseURL: 'https://services.7searchppc.com/api',
    //  baseURL: 'http://192.168.18.166/example-app/public/api',
    // headers: {  
    //     'X-API-KEY': '7SAPI321', 

    
    //     'Access-Control-Allow-Origin': true,
    // },
  });

  const removeAuth = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  }

  const loginUser = async (email, pass, browser) => {
    api.setHeaders({
      'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
      'Access-Control-Allow-Origin': true,
    })
    const res =  await api.post('/user/login', {
      email:email,
      password:pass,
      browser:browser
    });
    return res.data;

  }

  const validateToken = async (email, token) => {
    api.setHeaders({
      'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
      'Access-Control-Allow-Origin': true,
    })
    const res =  await api.post('/user/validatetoken', {
      email:email,
      token:token
    });

    return res.data;
  }

  
  const validateForgetKey = async (uid, key) => {
    api.setHeaders({
      'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
      'Access-Control-Allow-Origin': true,
    })
    const res =  await api.post('/forget/user/password/validatekey', {
      uid:uid,
      authkey:key
    });

    return res.data;
  }

  const getWalletAmount = async ( uid ) => {  
    api.setHeaders({
      'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
      'Access-Control-Allow-Origin': true,
    })
    const res =  await api.get('/user/wallet/show/'+uid);
    if(res.data.code == 403) {
      removeAuth();
    } else {
      return res.data;
    }
  }

  const getUserInfo = async ( uid ) => {
    api.setHeaders({
      'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
      'Access-Control-Allow-Origin': true,
    })
    const res = await api.get('/user/profile/info/'+uid)
    // return res.data.data;
    if(res.data.code == 403) {
      removeAuth();
    } else {
      return res.data.data;
    }
  }

  const getUserCountry = async ( uid ) => {
    api.setHeaders({
      'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
      'Access-Control-Allow-Origin': true,
    })
    const res = await api.post('/user/fetch/country', {
      uid: uid
    })
    // return res.data.data;
    if(res.data.code == 403) {
      removeAuth();
    } else {
      return res.data.data;
    }
  }
  

  const saveUserInfo = async ( uid, data ) => {
    api.setHeaders({
      'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
      'Access-Control-Allow-Origin': true,
    })
    const res = await api.post('/user/profile/update/'+uid, data)
    // return res.data;
    if(res.data.code == 403) {
      removeAuth();
    } else {
      return res.data;
    }
  }
      
  const getCountryList = async (  ) => {
    api.setHeaders({
      'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
      'Access-Control-Allow-Origin': true,
    })
    const res = await api.get('/country/index')
    return res.data;
  }
   
  const getCategoryList = async (  ) => {
    api.setHeaders({
      'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
      'Access-Control-Allow-Origin': true,
    })
    let uid = localStorage.getItem('uid');
    const res = await api.get('/category/index',{
      uid:uid
    })
    return res.data;
  }
     
  const CampaignList = async ( type, sts, src, pg, lim ) => {
    api.setHeaders({
      'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
      'Access-Control-Allow-Origin': true,
    })
    let uid = localStorage.getItem('uid');
    const res = await api.post('/user/campaign/list', {
      uid:uid,
      src:src,
      type:type,
      status:sts,
      page:pg,
      lim:lim
    });
    // return res.data;
    if(res.data.code == 403) {
      removeAuth();
    } else {
      return res.data;
    }
  }

  const deleteCampaign = async ( uid, cid ) => {
    api.setHeaders({
      'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
      'Access-Control-Allow-Origin': true,
    })
    const res = await api.post('/user/campaign/delete', {
      uid:uid,
      cid:cid
    })
    // return res.data;
    if(res.data.code == 403) {
      removeAuth();
    } else {
      return res.data;
    }
  }

  const updateCampaignStatus = async ( uid, cid, sts ) => {
    api.setHeaders({
      'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
      'Access-Control-Allow-Origin': true,
    })
    const res = await api.post('/user/campaign/campaignstatus', {
      uid:uid,
      cid:cid,
      status:sts,
    })
    // return res.data;
    if(res.data.code == 403) {
      removeAuth();
    } else {
      return res.data;
    }
  }


/*
/****************************************************************
 * =============================================================*
 *-------------------- Text Campaign Ad API --------------------*
 * =============================================================*
 * **************************************************************
 */

const getCampaignInfo = async (uid, cid) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/showtextad', {
    uid:uid,
    cid:cid
  })
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const createCampaign = async ( data ) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/createtextad', data)
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const updateCampaign = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/updatetextad ', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}


/*
 ****************************************************************
 * =============================================================*
 *------------------- Banner Campaign Ad API -------------------*
 * =============================================================*
 * **************************************************************
 */

const createBannerCampaign = async ( data ) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/createbannerad', data)
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const updateBannerCampaign = async ( data ) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/updatebannerad', data)
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}


/*
 ****************************************************************
 * =============================================================*
 *------------------- Social Campaign Ad API -------------------*
 * =============================================================*
 * **************************************************************
 */

const createSocialCampaign = async ( data ) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/createsocialad', data)
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const updateSocialCampaign = async ( data ) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/updatesocialad', data)
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}


/*
 ****************************************************************
 * =============================================================*
 *------------------- Native Campaign Ad API -------------------*
 * =============================================================*
 * **************************************************************
 */

const createNativeCampaign = async ( data ) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/createnativead', data)
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const updateNativeCampaign = async ( data ) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/updatenativead', data)
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}


/*
 ****************************************************************
 * =============================================================*
 *------------------- Popunder Campaign Ad API -------------------*
 * =============================================================*
 * **************************************************************
 */

 const createPopupCampaign = async ( data ) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/createpopunderad', data)
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const updatePopupCampaign = async ( data ) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/updatepopunderad', data)
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const updateAllCampaign = async ( data ) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/action', data)
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const uploadImage = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  let uid = localStorage.getItem('uid');
  const res = await api.post('/user/campaign/imageupload', { img: data, uid:uid });
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const createDuplicateCampaign = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/duplicate', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const getNotification = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  let uid = localStorage.getItem('uid');
  const res = await api.post('/user/notification/user_id', {
    user_id:uid
  });
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const getNotificationShort = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  let uid = localStorage.getItem('uid');
  const res = await api.post('/user/notification/unreadnoti', {
    user_id:uid
  });
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const updateNotification = async (noti_id) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  let uid = localStorage.getItem('uid');
  const res = await api.post('/user/notification/read', {
    notifuser_id:noti_id,
    uid:uid
  });
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const getCPCInfo = async (type, cat) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  let uid = localStorage.getItem('uid');
  const res = await api.post('/user/onchagecpc', {
    type:type,
    cat_name:cat,
    uid:uid
  });
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

// ============================================================//
// =================    BLOCK IP REQUEST    ==================//
// ==========================================================//

const submitIpRequest = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/ip/request/create', data);
  return res.data;

}

const getIpList = async ( lim, pg) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  let uid = localStorage.getItem('uid');
  const res = await api.post('/user/ip/list', {
    uid:uid,
    limit:lim,
    page:pg
  });
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}


const applyCpn = async (data) => {  

  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  
  const res = await api.post('/user/apply/coupon', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }

}

const stripePayApi = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api2.post('/stripe/payment', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}


const paymentHistory = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/transactions/list', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const LoginHistory = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  let uid = localStorage.getItem('uid');
  const res = await api.post('/user/login/log', {
    uid:uid
  });
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const BitcoinQrPayApi = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  let uid = localStorage.getItem('uid');
  data['uid'] = uid;
  const res = await api.post('/user/payment/bitcoin', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const BitcoinQrScreenUpload = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const headers = { 'Content-Type': 'multipart/form-data' }
  const res = await api.post('/user/payment/upscreenshot', data, { headers });
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const changePassword = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/change_password', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}


// ============================================================//
// ====================    DashBoard API   ===================//
// ==========================================================//

const dashboardGraph = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/dashboard/data', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const getTopCamps = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/dashboard/campdata', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}


const topCampList = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/dashboard/cmptop', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}
// http://192.168.18.166/7sapp/7searchBackend/public/api/user/support/list

const getSupportData = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/support/list', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const postSupportReq = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/support/create', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const getSupportChat = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/support/info', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const postSupportChat = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/support/chat', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const deleteSupportChat = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/support/delete', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

// =======================================================//
//  --------          REPORT API's          -------------//
// =====================================================//

const getReportData = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/campaign/report', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const getUserCampIdData = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/ad_type/camp', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const getInvoiceData = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/transaction/view', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const getPubData = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/user/pub/website/add', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}


const forgetPasswordApi = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/forget/user/password', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

const updatePasswordApi = async (data) => {
  api.setHeaders({
    'X-API-KEY': 'cR9i43OnLk7r9Ty44QespV2h',
    'Access-Control-Allow-Origin': true,
  })
  const res = await api.post('/forgetpassword/user/submit', data);
  // return res.data;
  if(res.data.code == 403) {
    removeAuth();
  } else {
    return res.data;
  }
}

export  { 
  getPubData,
  loginUser, 
  validateToken,
  getUserInfo, 
  saveUserInfo,
  getWalletAmount,
  getCategoryList,
  getCountryList,
  createCampaign,
  CampaignList,
  deleteCampaign,
  updateCampaignStatus,
  getCampaignInfo,
  updateCampaign,
  uploadImage,
  createBannerCampaign,
  updateBannerCampaign,
  createSocialCampaign,
  updateSocialCampaign,
  createNativeCampaign,
  updateNativeCampaign,
  createPopupCampaign,
  updatePopupCampaign,
  updateAllCampaign,
  createDuplicateCampaign,
  getNotification,
  updateNotification,
  submitIpRequest,
  getIpList,
  getCPCInfo,
  applyCpn,
  stripePayApi,
  paymentHistory,
  getNotificationShort,
  LoginHistory,
  BitcoinQrPayApi,
  BitcoinQrScreenUpload,
  changePassword,
  dashboardGraph,
  getTopCamps,
  topCampList,
  getSupportData,
  postSupportReq,
  getSupportChat,
  postSupportChat,
  deleteSupportChat,
  getReportData,
  getUserCampIdData,
  getInvoiceData,
  forgetPasswordApi,
  updatePasswordApi,
  getUserCountry,
  validateForgetKey
}