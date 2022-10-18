import axios from 'axios'

export const navusersget= (params) => axios.get('/home/nav', {params: params});

export const adduser = data => axios.post('/register', data);



