export default  function getsearch(search) {
  if(search==='') return ''
  else{
    var data=search.slice(1).split('&')
    var obj={}
    for(let i in data){
      var arr=data[i].split('=')
      obj[arr[0]]=arr[1]
    }
    return obj
  }
}