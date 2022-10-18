import { message } from 'antd';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3100'; // 基础请求地址

//基础URL 192.168.21.147
axios.defaults.timeout=30000//超时
axios.defaults.retry = 3; //设置全局请求次数
// axios.defaults.retryDelay = 1000;//设置全局请求间隙
// 响应拦截器
axios.interceptors.response.use(function(res){
    return res.data
    // res => res.data,  // 拦截到响应对象，将响应对象的 data 属性返回给调用的地方
    // err => Promise.reject(err)
},function(res,err){
    if(res.response.status===401){
        
        message.warn('登陆过期,准备跳转登陆界面！')
        localStorage.clear()
        setTimeout(()=>{
            window.location.href = '/login'
        },1500)
        return Promise.reject(err)
    }else if(res.response.status===404){
        message.warn('抱歉！访问的页面没找到！！')
        setTimeout(()=>{
            window.location.href = '/undiscovered'
        },2000)
        return Promise.reject(err)
    } else if(res.response.status===500){
        message.warn('抱歉！服务器响应错误！')
        setTimeout(()=>{
            window.location.href = '/error'
        },2000)
        return Promise.reject(err)
    }
    

    var config = err.config;
  if (!config || !config.retry) return Promise.reject(err);
  // 设置用于跟踪重试次数的变量
  config.__retryCount = config.__retryCount || 0;
 
  // 检查我们是否已将重试总数最大化
  if (config.__retryCount >= config.retry) {
    // 错误拒绝
    return Promise.reject(err);
  }
 
  // 增加重试次数
  config.__retryCount += 1;
 
  // 创造新的承诺来处理指数退避
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });
 
  // 返回承诺，其中将撤回axios以重试请求
  return backoff.then(function () {
    return axios(config);
  });
})
// 请求拦截器
axios.interceptors.request.use(function(config){
    if(localStorage.getItem('token')===null && (window.location.pathname!=='/login' && window.location.pathname!=='/register')){
        message.warn('登陆过期,准备跳转登陆界面！')
        localStorage.clear()
        setTimeout(()=>{
            window.location.href = '/login'
        },1500)
    }else{
        config.headers.token=localStorage.getItem('token')
        return config
    }
},function(err){
    return Promise.reject(err)
})
