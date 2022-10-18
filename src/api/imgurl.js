import axios from 'axios'
import throttle from '../utils/throttle';
export  const imgupload= throttle((data) =>{
    return axios.post('/imgurl/uploadImage',data,{
      'Content-type' : 'multipart/form-data'
  } )
  },500);


