import axios from 'axios'
import throttle from '../utils/throttle';
export  const getlogin= throttle((params) =>{
  return axios.get('/login', { 
    params: params 
  })
},300) ;

export  const postlogin= throttle((data) =>{
  return axios.post('/login',{data:data})
},300) ;


