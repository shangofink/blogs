// 获取时间字符串（年-月-日-时：分：秒）
function gettimestring(){
  let time=new Date()
  let Y = time.getFullYear() + '-';
  let M = (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1) + '-';
  let D = time.getDate() + ' ';
  let h = time.getHours() + ':';
  let m = time.getMinutes() + ':';
  let s = time.getSeconds();
  return Y+M+D+h+m+s;
}
// 获取数据时间(昨日)
function getoldtimestring(){
  let time=new Date(new Date().toLocaleDateString()).getTime()-8640000
  return timechange2(time)
}
// 获取时间戳
function gettime(){
  let time=new Date()
  return time.getTime()
}
// 获取当前小时数，返回首页对应数值
function homegetHours(){
  let time=new Date()
  let hours=time.getHours()
  let str=''
  if(hours<6&&hours>=0){
    str='凌晨好'
  }else if(hours<12&&hours>=6){
    str='上午好'
  }else if(hours<14&&hours>=12){
    str='中午好'
  }else if(hours<18&&hours>=14){
    str='下午好'
  }else if(hours<24&&hours>=18){
    str='晚上好'
  }
  return str
}
// 获取时间数字 [年，月，日，时，分，秒]
function gettimearr(){
  let time=new Date()
  let Y = time.getFullYear();
  let M = (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1);
  let D = (time.getDate() < 10 ? '0' + time.getDate() : time.getDate());
  let h = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours());
  let m = (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes());
  let s = (time.getSeconds()< 10 ? '0' + time.getSeconds() : time.getSeconds());
  return [Y,M,D,h,m,s]
}
// 字符串转时间戳
function gettime2(str){
  let time=new Date(str)
  return time.getTime()
}
// 时间戳转字符串
function timechange(time){
    let date = new Date(parseInt(time))
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D + h + m + s
}
function timechange2(time){
  let date = new Date(parseInt(time))
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  return Y + M + D
}
module.exports = {
  gettime,
  gettime2,
  gettimearr,
  gettimestring,
  timechange,
  timechange2,
  getoldtimestring,
  homegetHours
};