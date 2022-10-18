import './usersetting.less'
import { Button, Menu } from 'antd'
import { LeftOutlined,IdcardOutlined,SettingOutlined,SolutionOutlined,StopOutlined } from '@ant-design/icons'
import { Outlet,useNavigate } from 'react-router-dom';
import getItem from '../../../utils/getItem';
function UserSetting(){
  const navigate=useNavigate()
  const items=[
    getItem('个人资料',"profile",<IdcardOutlined />),
    getItem('账号设置','account',<SettingOutlined />),
    getItem('简历设置','resume',<SolutionOutlined />),
    getItem('屏蔽管理','block',<StopOutlined />)
  ]
  function menuclick(e){
    navigate(`/user/setting/${e.key}`)
  }

  return(
    <div className='UserSetting'>
      <div className='setting-top'>
        <Button icon={<LeftOutlined />} onClick={()=>{navigate('/user')}}>返回个人主页</Button>
      </div>
      <div className='setting-main'>
        <div className="setting-main-left">
          <Menu 
          items={items} 
          className='left-menu'
          defaultSelectedKeys={['profile']}
          onClick={menuclick}
          ></Menu>
        </div>
        <div className="setting-main-right">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}
export default UserSetting