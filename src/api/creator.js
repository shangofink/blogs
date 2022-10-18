import axios from 'axios'
import throttle from '../utils/throttle';
// 首页请求
export  const getcreatorindex= throttle((params) =>{
  return axios.get('/creator/', { 
    params: params 
  })
},300) ;
export  const getcreatorhome= throttle((params) =>{
  return axios.get('/creator/home', { 
    params: params 
  })
},300) ;
// 动态的发布
export  const postdy= throttle((data) =>{
  return axios.post('/creator/add/dynamic',data)
},300) ;
// 内容请求
export  const getcreatorcontent= throttle((params,url) =>{
  return axios.get(url, { 
    params: params 
  })
},300) ;
// 数据请求
export  const getcreatordata= throttle((params) =>{
  return axios.get('/creator/content/datatwo', { 
    params: params 
  })
},300) ;
// 关注请求
export  const getcreatorfollow= throttle((params) =>{
  return axios.get('/creator/content/follow', { 
    params: params 
  })
},300) ;

// 删除请求
export  const datadelete= throttle((params) =>{
  return axios.get('/creator/delete', { 
    params: params 
  })
},300) ;

  // 获取垃圾箱数据
  export  const getdustbin= throttle((params) =>{
    return axios.get('/creator/dustbin', {params:params})
  },300) ;
  // 处理垃圾箱数据
  export  const dustbinchange= throttle((params) =>{
    return axios.get('/creator/dustbin/change', {params:params})
  },300) ;

  // 创建专栏
  export  const postcolum= throttle((data) =>{
    return axios.post('/creator/add/colum',data)
  },300) ;
  // 专栏删除
  export  const getdeletecolum= throttle((params) =>{
    return axios.get('/creator/delete/colum',{params:params})
  },300) ;
  // 专栏详情
  export  const getcolumparticular= throttle((params) =>{
    return axios.get('/creator/colum/particular',{params:params})
  },300) ;
  // 专栏修改获取
  export  const getcolumarticle= throttle((params) =>{
    return axios.get('/creator/colum/found',{params:params})
  },300) ;
  // 修改专栏文章 
  export  const postchangecolum= throttle((data) =>{
    return axios.post('/creator/change/columarticle',data)
  },300) ;
  // 文章撤回 
  export  const articlerecall= throttle((params) =>{
    return axios.get('/creator/article/recall',{params:params})
  },300) ;
