// 节流，间隔触发
export default function throttle(func,wait){
  var context, args;
  var previous = 0;
  return function() {
      var now = +new Date();//利用隐式转换，相当于toNumber()，实际由valueOf()返回的原始值得到,也可以使用Date.now()方法，在不支持该方法的浏览器时使用“+”
      context = this;
      args = arguments;
      if (now - previous > wait) {
          let data=func.apply(context, args);
          previous = now;
          return data
      }
      return 0
  }

}


