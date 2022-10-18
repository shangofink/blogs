import axios from 'axios'
import throttle from '../utils/throttle';
export  const getusershow= throttle(params=>{
  return axios.get('/usershow',{ 
      params: params 
  })
},300);
export  const getusershowdynamic= throttle(params=>{
  return axios.get('/usershow/dynamic',{ 
      params: params 
  })
},300);
export  const getusershowarticle= throttle(params=>{
  return axios.get('/usershow/article',{ 
      params: params 
  })
},300);
export  const getusershowcolumn= throttle(params=>{
  return axios.get('/usershow/column',{ 
      params: params 
  })
},300);
export  const getusershowsearch= throttle(params=>{
  return axios.get('/usershow/search',{ 
      params: params 
  })
},300);
export  const getusershowcolumndata= throttle(params=>{
  return axios.get('/usershow/column/data',{ 
      params: params 
  })
},300);




