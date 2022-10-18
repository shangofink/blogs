import axios from 'axios'
import throttle from '../utils/throttle';
// 文章搜索
export  const getarticlesearch= throttle((params) =>{
  return axios.get('/search/article', { 
      params: params 
  })
},300);
// 用户搜索
export  const getusersearch= throttle((params) =>{
  return axios.get('/search/user', { 
      params: params 
  })
},300);
// 类型搜索
export  const gettypesearch= throttle((params) =>{
  return axios.get('/search/type', { 
      params: params 
  })
},300);

