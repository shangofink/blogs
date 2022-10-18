import axios from 'axios'
import throttle from '../utils/throttle';
export  const getarticle= throttle((params) =>{
    return axios.get('/home/article', { 
      params: params 
    })
  },300) ;

// 添加文章 编辑界面 /edit
export  const addarticle= throttle((data) =>{
    return axios.post('/edit', data)
  },300) ;
// 修改文章 编辑界面 /edit
export  const changearticle= throttle((data) =>{
    return axios.post('/edit', data)
  },300) ;
// 删除文章
export  const removearticle= throttle((data) =>{
    return axios.post('/user', data)
  },300) ;




