import {  useLocation } from 'react-router-dom';
import './App.less';
import Baserouter from './router/router2.jsx'
import Nav from './page/nav/nav.jsx'
import React, {  useEffect, useState } from 'react'
import {UpCircleTwoTone,MessageTwoTone} from '@ant-design/icons'
import {  Modal ,Radio,Input,DatePicker, Space, message,BackTop   } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { postbug } from './api/bug';
import { gettime2 } from './utils/gettime';
const { TextArea } = Input;

// APP作为路由中转匹配
function App() {
  const location=useLocation()
  // 全局反馈
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const [content, setcontent] = useState('');
  const [time,settime]=useState(null)
  const timeonChange = (value, dateString) => {
    settime(gettime2(dateString))
  };
  const handleOk = () => {
    if(content===undefined||content===''|| time===null || time===undefined || time===''){
      message.warn('内容与时间不能为空！')
      return
    }else{
      if(content.length<10){
        message.warn('内容不能少于10个字符')
      }else{
        let data={
          type:value===1?'suggest':'bug',
          content:content,
          time:time
        }
        let resdata=postbug(data)
        if(resdata!==0){
          resdata.then(res=>{
            if(res.msg){
              message.info('提交成功！感谢支持！')
              setTimeout(() => {
              setIsModalOpen(false);
              }, 500);
            }
          })
        }
      }
    }
  };
  useEffect(()=>{
    if(!isModalOpen){
      setValue(1)
      settime(undefined)
      setcontent(undefined)
    }
  },[isModalOpen])
  
  const [imgurl,setimgurl]=useState(undefined)
  return (
      <>
        {(location.pathname.match('/edit')||(location.pathname.match('/login'))||(location.pathname.match('/register')))===null?<Nav props={{imgurl,setimgurl}}></Nav>:""}
        <Baserouter data={{imgurl,setimgurl}}></Baserouter>
      <div className='right-return'>
        <BackTop visibilityHeight={300}>
          <UpCircleTwoTone  className='btn-return'  title="返回顶部"/> 
        </BackTop >
        <MessageTwoTone className='btn-contant' style={{fontSize:'33px'}} title='建议反馈' onClick={()=>setIsModalOpen(true)}/>
      
      </div>
         <Modal className='bug-modal' title="反馈与建议" open={isModalOpen} onOk={handleOk} onCancel={()=>setIsModalOpen(false)} okText="提交" cancelText='取消' destroyOnClose={true}>
          <div className='top' style={{marginBottom:15}}>
            <label>类型：</label>
            <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>改进与建议</Radio>
            <Radio value={2}>错误与漏洞</Radio>
          </Radio.Group>
          </div>
          <div className='main' style={{marginBottom:15,display:'flex'}}>
            <label >内容：</label>
            <TextArea
              style={{width:400,display:'inline-block'}}
              value={content}
              onChange={(e) => setcontent(e.target.value)}
              // showCount 
              maxLength={100}
              placeholder="请输入详细内容 (10≤字符数≤100个字符)"
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </div>
          <div>
            <p>选择提交时间 / 错误出现时间：</p>
            <Space direction="vertical" size={12} style={{marginLeft:40,marginTop:10}}>
              <DatePicker defaultPickerValue={time} inputReadOnly={true} locale={locale} showTime onChange={timeonChange} placeholder='请选择时间' placement='topLeft'/>
            </Space>
          </div>
        </Modal>
      </>
  )
}
export default App;