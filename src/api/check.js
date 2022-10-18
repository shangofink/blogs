import axios from 'axios'

export const getCheckApi = (params) => axios.get('/check', { 
    params: params 
});

