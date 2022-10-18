import axios from 'axios'
import throttle from '../utils/throttle';

export  const getauthors= throttle((params) =>{
    return axios.get('/authors', {
      params:params
    })
  },250) ;

