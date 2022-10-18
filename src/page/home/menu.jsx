import { Button } from "antd";
import {useState } from "react";
import './menu.less'
// 精准控制文章type类型
function HomeMenu(props){
  let data={
    backend:['全部','java','算法','Python','GO','LeetCode','架构','Spring Boot','数据库'],
    frontend:['全部','前端','JavaScript','Vue.js','React.js','CSS','面试','TypeScript','架构','算法',],
    android:['全部','Android','Flutter','Android Jetpack','前端','Kotlin','java','APP','游戏','架构'],
}
  let element=''
  const [sel,setSel]=useState('全部')
  for(let i in data){
    if(i===props.select){
      element=data[i].map(item=>{
        return <li key={item}> <Button className={'btn'+(sel===item?' sel':'')} onClick={()=>{setSel(item)}}>{item}</Button></li>
      })
    }
  }
  return(
    <div className="HomeMenu">
      <ul className="menu-ul">
        {element}
      </ul>
    </div>
  )
}
export default HomeMenu