import axios from 'axios'
import throttle from '../utils/throttle';

export  const getregister= throttle((params) =>{
    return axios.get('/login/check', { 
        params: params 
    })
},300);

export  const adduser= throttle((data) =>{
    return axios.post('/register', data)
},300);



