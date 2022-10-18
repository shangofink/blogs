import "./userpage.less"
import {
  GithubOutlined,
  WeiboCircleOutlined,
  IeOutlined,
  TrophyTwoTone,
  RightOutlined,
} from "@ant-design/icons"
import { Button, message, Tag, Tabs } from "antd"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getuserdata } from "../../api/user"
import { useEffect } from "react"
import { timechange } from "../../utils/gettime"
// 组件
import Article from "./otherpage/article"
import Attention from "./otherpage/attention"
import Pin from "./otherpage/pin"
import Collect from "./otherpage/collect"
import History from "./otherpage/history"
import Dynamic from "./otherpage/dynamic"
import Colum from "./otherpage/colum"
import getsearch from "../../utils/getsearch"
import { CSSTransition } from "react-transition-group"
import "../../vive/transitiongroup/transitionGroup.css"
function Userpage(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [key, setkey] = useState(
    getsearch(location.search).type === undefined
      ? "dynamic"
      : getsearch(location.search).type
  )
  // 申请用户数据
  const [userdata, setuserdata] = useState("")
  useEffect(() => {
    if (userdata === "") {
      // 申请数据
      let resdata = getuserdata("")
      if (resdata !== 0) {
        resdata
          .then((res) => {
            if (res.msg) {
              setuserdata(res.data[0])
            } else {
              message.error(res.message)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }, [])
  // 监听地址栏
  useEffect(() => {
    let type = getsearch(location.search).type
    if (type === undefined || type === null || type === "null") {
      navigate("/user?type=dynamic")
    } else {
      setkey(type)
    }
  }, [location.search])
  function tabchange(activeKey) {
    navigate(`/user?type=${activeKey}`)
  }
  // 控制动画的时机（创建与销毁）
  const [data, setdata] = useState(false)
  useEffect(() => {
    setdata((pre) => !pre)
  }, [])

  const items = [
    {
      label: <span className="iconfont icon-dongtai"> 动态</span>,
      key: "dynamic",
      children: <Dynamic />,
    },
    {
      label: <span className="iconfont icon-yuedu"> 文章</span>,
      key: "article",
      children: <Article />,
    },
    {
      label: <span className="iconfont icon-columnszhuanlan"> 专栏</span>,
      key: "colum",
      children: <Colum />,
    },
    {
      label: <span className="iconfont icon-favorite"> 收藏</span>,
      key: "collect",
      children: <Collect />,
    },
    {
      label: <span className="iconfont icon-guanzhu"> 关注</span>,
      key: "attention",
      children: <Attention />,
    },
    {
      label: <span className="iconfont icon-history"> 浏览历史</span>,
      key: "history",
      children: <History />,
    },
  ]
  return (
    <>
      <CSSTransition in={data} timeout={500} classNames="router" unmountOnExit>
        <div className="userpage">
          <div className="userpage-left">
            {/* 左上 */}
            <div className="top">
              <div className="user">
                <img
                  src={
                    props.props.imgurl === undefined
                      ? localStorage.getItem("imgurl")
                      : props.props.imgurl
                  }
                  alt="1"
                />
                <div className="top-contant">
                  <p className="name">{userdata.name}</p>
                  <p className="type">
                    类型：
                    {userdata.type === null ? (
                      "暂无"
                    ) : (
                      <Tag color="blue">{userdata.type}</Tag>
                    )}
                  </p>
                  <p className="occupation">
                    职业：{userdata.job === null ? "暂无" : userdata.job}
                  </p>
                </div>
                <div className="top-right">
                  <div className="user-icon">
                    <GithubOutlined
                      style={{ fontSize: "20px", marginRight: "10px" }}
                    />
                    <WeiboCircleOutlined
                      style={{ fontSize: "20px", marginRight: "10px" }}
                    />
                    <IeOutlined
                      style={{ fontSize: "20px", marginRight: "10px" }}
                    />
                  </div>
                  <Button
                    className="user-btn"
                    onClick={() => {
                      navigate("/user/setting/profile")
                    }}
                  >
                    编辑个人资料
                  </Button>
                </div>
              </div>
              <div className="top-bottom">
                <Button className="top-bottom-btn">
                  <div>
                    <TrophyTwoTone
                      style={{ fontSize: "18px", marginRight: "10px" }}
                    />
                    <span>获得勋章 {userdata.number}</span>
                  </div>
                  <RightOutlined style={{ marginTop: "2px" }} />
                </Button>
              </div>
            </div>
          </div>
          {/* 右 */}
          <div className="userpage-right">
            <div className="right-top">
              <div>
                <p>关注了</p>
                <p>{userdata.attention}</p>
              </div>
              <div>
                <p>关注者</p>
                <p>{userdata.attentioned}</p>
              </div>
            </div>
            <div className="right-bottom">
              <Button className="right-bottom-btn">
                <span>收藏集</span>
                <span>{userdata.collect}</span>
              </Button>
              <Button className="right-bottom-btn">
                <span>关注标签</span>
                <span>0</span>
              </Button>
              <div className="right-bottom-time">
                <span>加入时间</span>
                <span>{timechange(parseInt(userdata.time))}</span>
              </div>
            </div>
          </div>
          {/* 左下 */}
          <div className="bottom">
            <Tabs
              items={items}
              activeKey={key}
              onChange={(activeKey) => tabchange(activeKey)}
            ></Tabs>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}
export default Userpage
