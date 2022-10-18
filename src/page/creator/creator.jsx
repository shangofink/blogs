import "./creator.less"
import { Button, message, Modal, Input } from "antd"
import Img from "../../img/posts.png"
import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons"
import { Menu } from "antd"
import { useState } from "react"
import getItem from "../../utils/getItem"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getcreatorindex, postdy } from "../../api/creator"
import { gettime } from "../../utils/gettime"
const { TextArea } = Input
export default function Creator() {
  const navigate = useNavigate()
  const location = useLocation()
  // 左侧栏
  const items = [
    getItem("首页", "home", <MailOutlined />),
    getItem("内容管理", "content", <AppstoreOutlined />, [
      getItem("文章管理", "content/article"),
      getItem("专栏管理", "content/column"),
      getItem("沸点管理", "content/pins"),
    ]),
    getItem("数据中心", "data", <SettingOutlined />, [
      getItem("内容数据", "data/content/article"),
      getItem("关注者数据", "data/content/follow"),
    ]),
    getItem("活动中心", "event", <SettingOutlined />, [
      getItem("创造活动", "event/article"),
    ]),
    getItem("帮助中心", "help", <SettingOutlined />, [
      getItem("常见问题", "question/help"),
    ]),
  ]
  const rootSubmenuKeys = ["home", "content", "data", "event", "help"]
  const [openKeys, setOpenKeys] = useState([location.pathname.slice(9)])
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  // 点击跳转
  const menuclick = (e) => {
    if (location.pathname.match(`/creator/${e.key}`) === null) {
      if (e.key.match("question") || e.key.match("event")) {
        message.info("功能暂未开放！敬请期待！")
      } else {
        navigate(`/creator/${e.key}`)
      }
    }
  }
  // 根据url申请数据
  const [user, setuser] = useState("")
  useEffect(() => {
    if (user === "") {
      let resdata = getcreatorindex("")
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setuser(res.name)
          } else {
            message.error(res.message)
          }
        })
      }
    }
  }, [user])
  // 控制动态编写元素
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOk = () => {
    let obj = {}
    obj["mood"] = mood
    obj["time"] = gettime()
    obj["content"] = value
    let resdata = postdy(obj)
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          message.info("发布成功")
        } else {
          message.error("发布失败！" + res.message)
        }
      })
      setIsModalOpen(false)
    }
  }
  useEffect(() => {
    setmood(0)
    setvalue(undefined)
  }, [isModalOpen])
  const [value, setvalue] = useState(undefined)
  function onchange(e) {
    setvalue(e.target.value)
  }
  // 控制心情选择
  const [mood, setmood] = useState(0)
  function moodsel(n) {
    switch (n) {
      case 0:
        if (mood !== 0) setmood(0)
        else return
        break
      case 1:
        if (mood !== 1) setmood(1)
        else return
        break
      case 2:
        if (mood !== 2) setmood(2)
        else return
        break
      case 3:
        if (mood !== 3) setmood(3)
        else return
        break
      case 4:
        if (mood !== 4) setmood(4)
        else return
        break
      default:
        break
    }
  }
  return (
    <div className="Creator">
      <div className="left">
        <div className="left-top">
          <img
            src={
              localStorage.getItem("imgurl") === undefined
                ? Img
                : localStorage.getItem("imgurl")
            }
            alt=""
          ></img>
          <span className="username">{user}</span>
          <Button
            style={{ marginTop: 10 }}
            type="primary"
            onClick={() => navigate("/edit")}
          >
            写文章
          </Button>
          <Button
            style={{ marginTop: 5 }}
            type="primary"
            onClick={() => setIsModalOpen(true)}
          >
            发表动态
          </Button>
        </div>
        <div className="left-mian">
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            defaultSelectedKeys={openKeys}
            onClick={menuclick}
            style={{
              // width: 200,
              marginTop: 10,
              border: 0,
              borderRadius: 25,
            }}
            items={items}
          />
        </div>
      </div>
      <div className="right">
        <Outlet></Outlet>
      </div>
      {/* 动态创建 */}
      <Modal
        className="dy-model"
        title="发布动态"
        open={isModalOpen}
        onOk={handleOk}
        okText="立即发布"
        cancelText="取消发布"
        onCancel={() => setIsModalOpen(false)}
        style={{ borderRadius: 5 }}
      >
        <div className="dy">
          <p>发布者：{user}</p>
          <div className="mood">
            心情：
            <a onClick={() => moodsel(0)} title="开心">
              <svg
                className={"all" + (mood === 0 ? " svgsel" : "")}
                aria-hidden="true"
              >
                <use className="use" xlinkHref="#icon--happy-"></use>
              </svg>
            </a>
            <a onClick={() => moodsel(1)} title="一般">
              <svg
                className={"all" + (mood === 1 ? " svgsel" : "")}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-yiban-copy"></use>
              </svg>
            </a>
            <a onClick={() => moodsel(2)} title="委屈">
              <svg
                className={"all" + (mood === 2 ? " svgsel" : "")}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-weiqu"></use>
              </svg>
            </a>
            <a onClick={() => moodsel(3)} title="哭">
              <svg
                className={"all" + (mood === 3 ? " svgsel" : "")}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-ku-copy"></use>
              </svg>
            </a>
            <a onClick={() => moodsel(4)} title="大哭">
              <svg
                className={"all" + (mood === 4 ? " svgsel" : "")}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-daku"></use>
              </svg>
            </a>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: 50 }}>内容：</div>
            <div>
              <TextArea
                value={value}
                className="content"
                defaultValue="小小的说点什么吧...."
                showCount
                maxLength={80}
                onChange={(e) => onchange(e)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
