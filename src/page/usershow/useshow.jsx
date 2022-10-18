import { Button, Divider, message, Tag, Input, Tabs, Spin } from "antd"
import { useEffect, useState } from "react"
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom"
import "./usershow.less"
import { getattention } from "../../api/author"
import { getusershow } from "../../api/usershow"
import { timechange } from "../../utils/gettime"
import UserDynamic from "./other/dynamic"
import UserColumn from "./other/column"
import UserArticle from "./other/article"
const { Search } = Input
export default function Usershow(props) {
  const [search, setSearch] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [data, setdata] = useState({})
  const [sel, setsel] = useState(true)
  const [state, setstate] = useState(false)
  const [key, setkey] = useState("dynamic")

  // 初始申请数据
  useEffect(() => {
    // 申请数据
    let uuid = search.get("id")
    if (uuid === null || uuid === undefined) {
      message.error("未知错误！准备跳转首页")
      navigate("/home", { replace: false })
    } else {
      let resdata = getusershow({ id: uuid })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setdata(res.data)
            setTimeout(() => {
              setstate(true)
            }, 500)
          }
        })
      }
    }
  }, [])
  // 处理关注事件
  function attention(n) {
    let uuid = search.get("id")
    let resdata = getattention({
      type: n === 0 ? "cancel" : "attention",
      attentionid: uuid,
    })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          let changedata = JSON.parse(JSON.stringify(data))
          changedata.boolean = !changedata.boolean
          setdata(changedata)
          message.info(n === 0 ? "取消关注成功！" : "关注成功！")
        } else {
          message.error(res.message)
        }
      })
    }
  }
  // 处理下部点击事件
  function changebtn(str) {
    if (location.pathname.match(str)) {
      return
    } else {
      navigate(`/usershow/${str}`)
    }
  }
  // 处理搜索转换
  function changeserach(n) {
    if (n === 0) {
      navigate(`/usershow/search?id=${data.uuid}&search=0`)
      setsel(false)
    } else {
      navigate(`/usershow?id=${data.uuid}`)
      setsel(true)
    }
  }
  // 原
  const el = (
    <div className="main-top">
      <Button className="btn" onClick={() => changebtn(0, "dynamic")}>
        动态
      </Button>
      <Button className="btn" onClick={() => changebtn(0, "article")}>
        文章
      </Button>
      <Button className="btn" onClick={() => changebtn(0, "column")}>
        专栏
      </Button>
      <Button className="btn" onClick={() => changeserach(0)}>
        搜索转换
      </Button>
    </div>
  )
  const el2 = (
    <div className="main-top2">
      <div>
        <Button className="btn" onClick={() => changeserach(1)}>
          <span className="iconfont icon-direction-left"></span>
          &nbsp;&nbsp;&nbsp;&nbsp;返回
        </Button>
        <span style={{ fontSize: 16, marginLeft: 10, fontStyle: "italic" }}>
          搜索文章
        </span>
      </div>

      <Search
        className="input"
        placeholder="搜索发布的文章"
        size="large"
        allowClear
        enterButton
        onSearch={(value) => searchchange(value)}
        style={{
          width: 300,
        }}
      />
    </div>
  )
  const tabsright = (
    <a onClick={() => changeserach(0)}>
      <svg
        className="icon"
        aria-hidden="true"
        style={{ width: 25, height: 25, marginRight: 50 }}
      >
        <use xlinkHref="#icon-sousuo"></use>
      </svg>
    </a>
  )

  function searchchange(value) {
    navigate(`/usershow/search?id=${data.uuid}&search=${value}`)
  }
  const items = [
    {
      label: <span className="iconfont icon-dongtai"> 动态</span>,
      key: "dynamic",
      children: <UserDynamic uuid={data.uuid} />,
    },
    {
      label: <span className="iconfont icon-yuedu"> 文章</span>,
      key: "article",
      children: <UserArticle uuid={data.uuid} />,
    },
    {
      label: <span className="iconfont icon-columnszhuanlan"> 专栏</span>,
      key: "colum",
      children: <UserColumn uuid={data.uuid} />,
    },
  ]

  return state ? (
    <div className="showuser">
      <div className="left">
        <div className="left-top">
          <div className="data">
            <img className="img" src={data.imgurl} alt="" />
            <div className="property">
              <h1>{data.name}</h1>
              <p>
                方向类型：<Tag color="blue">{data.type}</Tag>
              </p>
              <p>
                个人主页：
                {data.page === "" ? (
                  "暂无"
                ) : (
                  <a href={data.page}>{data.page}</a>
                )}
              </p>
              <p>
                个人简介：<span className="intro">{data.intro}</span>
              </p>
            </div>
          </div>
          {data.boolean ? (
            <Button className="attention" onClick={() => attention(0)}>
              取消关注
            </Button>
          ) : (
            <Button className="unattention" onClick={() => attention(1)}>
              关注
            </Button>
          )}
        </div>
        <div className="left-bottom">
          {sel ? (
            <Tabs
              tabBarExtraContent={tabsright}
              items={items}
              activeKey={key}
              onChange={(activeKey) => setkey(activeKey)}
            ></Tabs>
          ) : (
            el2
          )}
          <Divider style={{ margin: "10px 0" }} />
          <Outlet />
        </div>
      </div>
      <div className="right">
        <div className="top">
          <h2>个人成就</h2>
          <Divider style={{ margin: "0 0 10px" }} />
          <p>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-biaoqianA01_shoucang-13"></use>
            </svg>
            文章点赞数 {data.like}
          </p>
          <p>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-biaoqiankuozhan_yuedu-114"></use>
            </svg>
            文章阅读数 {data.read}
          </p>
          <p>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-biaoqianA01_shoucang-73"></use>
            </svg>
            文章收藏数 {data.collected}
          </p>
        </div>
        <div className="main">
          <div>
            <span>关注了</span>
            <span>{data.attention}</span>
          </div>
          <Divider type="vertical" style={{ height: 80 }} />
          <div>
            <span>关注者</span>
            <span>{data.attentioned}</span>
          </div>
        </div>
        <div className="bottom">
          <p>
            <span>收藏集</span>
            <span>0</span>
          </p>
          <p>
            <span>关注标签</span>
            <span>0</span>
          </p>
          <p>
            <span>加入时间</span>
            <span>{timechange(data.time)}</span>
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="showuser-spin">
      <Spin />
    </div>
  )
}
