import axios from 'axios'
import throttle from '../utils/throttle';
export  const getarticle= throttle(params=>{
  return axios.get('/show',{ 
      params: params 
  })
},300);

export  const getarticlelike= throttle(params=>{
  return axios.get('/show/article',{ 
      params: params 
  })
},300);

export  const getarticlecollect= throttle(params=>{
  return axios.get('/show/collect',{ 
      params: params 
  })
},300);

export  const getcomment= throttle((params) =>{
    return axios.get('/show/comment', 
    {params:params})
},300);

export  const postcomment= throttle((data) =>{
  return axios.post('/show/comment', data)
},300);

export  const getcommentlike= throttle((params) =>{
  return axios.get('/show/comment/like', {params:params})
},300);

export  const getredata= throttle((params) =>{
  return axios.get('/show/recommend', {params:params})
},300);


