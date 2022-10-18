import axios from 'axios'
import throttle from '../../utils/throttle';
// 文章发布
export  const editpost= throttle((data) =>{
    return axios.post('/edit/add', data)
  },300) ;
// 草稿箱保存
export  const draftpost= throttle((data) =>{
  return axios.post('/edit/draft', data)
},300) ;

// 修改 与 发布 
export  const editchange= throttle((params) =>{
  return axios.get('/edit/change', {params:params})
},300) ;
// 发布
export  const editpost2= throttle((data) =>{
  return axios.post('/edit/change/add', data)
},300) ;
// 草稿箱保存
export  const draftpost2= throttle((data) =>{
return axios.post('/edit/change/draft', data)
},300) ;