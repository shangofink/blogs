import axios from 'axios'
import throttle from '../utils/throttle';
// 获取作者热榜数据
export  const getauthor= throttle((params) =>{
    return axios.get('/home/author', { 
      params: params 
    })
  },300) ;
  
// 取消关注
export const getattention = (params) => axios.get('/home/author/change', { 
    params: params 
});