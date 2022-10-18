import axios from 'axios'
import throttle from '../utils/throttle';
// 获取基本用户数据
export  const getuserdata= throttle((params) =>{
  return axios.get('/user/index', { 
    params: params 
  })
},300) ;
// 获取用户动态
export  const getuserdynamic= throttle((params) =>{
  return axios.get('/user/dynamic', { 
    params: params 
  })
},300) ;
// 获取用户文章
export  const getuserarticle= throttle((params) =>{
  return axios.get('/user/article', { 
    params: params 
  })
},300) ;
// 获取用户专栏
export  const getusercolum= throttle((params) =>{
  return axios.get('/user/colum', { 
    params: params 
  })
},300) ;
// 获取用户沸点
export  const getuserread= throttle((params) =>{
  return axios.get('/user/read', { 
    params: params 
  })
},300) ;
// 获取用户收藏
export  const getusercollect= throttle((params) =>{
  return axios.get('/user/collect', { 
    params: params 
  })
},300) ;
// 获取用户关注
export  const getuserattention= throttle((params) =>{
  return axios.get('/user/attention', { 
    params: params 
  })
},300);
// 获取用户浏览历史
export  const getuserhistory= throttle((params) =>{
  return axios.get('/user/history', { 
    params: params 
  })
},300);
// 用户浏览修改
export  const gethistorychange= throttle((params) =>{
  return axios.get('/user/history/change', { 
    params: params 
  })
},300);



//account
// 获取用户账号绑定数据
export  const getuserdata2= throttle((params) =>{
  console.log(params);
  return axios.get('/user/setting/account', { 
    params: params 
  })
},300) ;
// 修改用户数据
export  const getchange= throttle((params) =>{
  console.log(params);
  return axios.get('/user/setting/account/change', { 
    params: params 
  })
},300);
// 注销用户
export  const getlogout= throttle((params) =>{
  return axios.get('/user/setting/account/logout', { 
    params: params 
  })
},300);

// 获取用户资料数据
export const getuserperson= (params) => axios.get('/user/setting/profile', { 
  params: params 
});
// 修改用户资料数据
export const postuserperson=(data)=>axios.post('/user/setting/profile',{data:data});