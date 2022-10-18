import compareObject from "./compareobj"
export default function comparearr (arr1, arr2) {
  let status=true //默认不同
  if(arr1.length!==arr2.length){
    return false
  }else{
    // 判断数组内对象长度是否相等
    for(let i in arr1){
      if(Object.keys(arr1[i]).length!==Object.keys(arr2[i]).length) return 
    }
    // 判断数组内对象内容是否相等
    for(let i in arr1){
      if(compareObject(arr1[i],arr2[i])) return true
      else return false
    }
  }
  return status
}
