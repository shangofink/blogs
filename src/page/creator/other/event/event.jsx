import { Button, Dropdown, Menu,Space } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react'
import './event.less'
import Img from '../../../../img/posts.png'
export default function Event(){
  const [btn,setBtn]=useState(0)
  const [mState,setMState]=useState('进行中')
  const [mType,setMType]=useState('热门活动')
  const handleMenuStateClick = (e) => {
    setMState(e.key)
  };
  const handleMenuTypeClick = (e) => {
    setMType(e.key)
  };
  const menuState=(
    <Menu
    onClick={handleMenuStateClick}
    items={[
      {
        label: '进行中',
        key: '进行中',
      },
      {
        label: '已结束',
        key: '已结束',
      },
    ]}
  />
  )
  const menuType=(
    <Menu
    onClick={handleMenuTypeClick}
    items={[
      {
        label: '热门活动',
        key: '热门活动',
      },
      {
        label: '后端',
        key: '后端',
      },
      {
        label: '前端',
        key: '前端',
      },
      {
        label: 'Android',
        key: 'Android',
      },
      {
        label: 'ios',
        key: 'ios',
      },
      {
        label: '人工智能',
        key: '人工智能',
      },
      {
        label: '开发工具',
        key: '开发工具',
      },
      {
        label: '代码人生',
        key: '代码人生',
      },
      {
        label: '阅读',
        key: '阅读',
      },
    ]}
  />
  )
  return(
    <div className="Event">
      <div className="event-top">
        <Button className={'btn'+(btn===0?' sel':'')} onClick={()=>{}}>文章活动</Button>
        <Button className={'btn'+(btn===1?' sel':'')} onClick={()=>{}}>沸点活动</Button>
      </div>
      <div className="event-main">
        <span>活动状态：</span>
        <Dropdown overlay={menuState} >
          <Button className='btn'>
            <Space className='space'>
              {mState}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <span style={{marginLeft:'40px'}}>活动分类：</span>
        <Dropdown overlay={menuType}>
          <Button className='btn'>
            <Space className='space'>
              {mType}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <div className='event-main-content'>
          <ul>
            <li>
              <div className='content-data'>
                <img src={Img} alt='1'></img>
                <div className='bottom'>
                  <div className='title'>小册上新 | 深入解析 Dubbo 架构设计以及实践</div>
                  <p className='content'>限时6折,仅需$ 23.944444444444444444444444444444444</p>
                  <p className='time'>2022.06.29 ~ 2022.07.06</p>
                </div>
              </div>
            </li>
            <li>
              <div className='content-data'>
                <img src={Img} alt='1'></img>
                <div className='bottom'>
                  <div className='title'>小册上新 | 深入解析 Dubbo 架构设计以及实践</div>
                  <p className='content'>限时6折,仅需$ 23.944444444444444444444444444444444</p>
                  <p className='time'>2022.06.29 ~ 2022.07.06</p>
                </div>
              </div>
            </li>
            <li>
              <div className='content-data'>
                <img src={Img} alt='1'></img>
                <div className='bottom'>
                  <div className='title'>小册上新 | 深入解析 Dubbo 架构设计以及实践</div>
                  <p className='content'>限时6折,仅需$ 23.944444444444444444444444444444444</p>
                  <p className='time'>2022.06.29 ~ 2022.07.06</p>
                </div>
              </div>
            </li>
            <li>
              <div className='content-data'>
                <img src={Img} alt='1'></img>
                <div className='bottom'>
                  <div className='title'>小册上新 | 深入解析 Dubbo 架构设计以及实践</div>
                  <p className='content'>限时6折,仅需$ 23.944444444444444444444444444444444</p>
                  <p className='time'>2022.06.29 ~ 2022.07.06</p>
                </div>
              </div>
            </li>
            <li>
              <div className='content-data'>
                <img src={Img} alt='1'></img>
                <div className='bottom'>
                  <div className='title'>小册上新 | 深入解析 Dubbo 架构设计以及实践</div>
                  <p className='content'>限时6折,仅需$ 23.944444444444444444444444444444444</p>
                  <p className='time'>2022.06.29 ~ 2022.07.06</p>
                </div>
              </div>
            </li>
            <li>
              <div className='content-data'>
                <img src={Img} alt='1'></img>
                <div className='bottom'>
                  <div className='title'>小册上新 | 深入解析 Dubbo 架构设计以及实践</div>
                  <p className='content'>限时6折,仅需$ 23.944444444444444444444444444444444</p>
                  <p className='time'>2022.06.29 ~ 2022.07.06</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}