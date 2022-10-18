import { Button, message, Divider, Spin, Empty } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import "./type.less"
import { timechange2 } from "../../../utils/gettime"
import { gettypesearch } from "../../../api/search"
export default function TypeSearch() {
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  const [str, setstr] = useState()
  const [state, setstate] = useState(false)
  const [showdata, setshowdata] = useState([])
  // 缓存数据
  const [read, setread] = useState([])
  const [time, settime] = useState([])
  const [like, setlike] = useState([])
  const [btn, setbtn] = useState("read") // 最热read 最新time 最多点赞like
  // 申请初始数据
  useEffect(() => {
    let type = search.get("search")
    if (
      type === "" ||
      type === undefined ||
      type.length < 2 ||
      type.length > 10
    ) {
      message.error("没有搜索内容！，准备跳转首页！")
      navigate("/home", { replace: false })
    } else {
      let resdata = gettypesearch({
        type: type,
        sel: "read",
        num: 0,
        number: 10,
      })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setread(res.data)
            setshowdata(res.data)
            setTimeout(() => {
              setstate(true)
            }, 200)
          } else {
            message.error("申请数据出错！" + res.message)
          }
        })
      }
    }
  }, [])
  // 监听点击 并判断当前缓存中是否存在数据
  useEffect(() => {
    let type = search.get("search")
    if (str === undefined) {
      setstr(type)
    }
    switch (btn) {
      case "read":
        if (read.length === 0) {
          let resdata = gettypesearch({
            type: type,
            sel: "read",
            num: 0,
            number: 10,
          })
          if (resdata !== 0) {
            resdata.then((res) => {
              if (res.msg) {
                setread(res.data)
                setshowdata(res.data)
              } else {
                message.error("申请数据出错！" + res.message)
              }
            })
          }
        } else {
          setshowdata(read)
        }
        break
      case "time":
        if (time.length === 0) {
          let resdata = gettypesearch({
            type: type,
            sel: "time",
            num: 0,
            number: 10,
          })
          if (resdata !== 0) {
            resdata.then((res) => {
              if (res.msg) {
                settime(res.data)
                setshowdata(res.data)
              } else {
                message.error("申请数据出错！" + res.message)
              }
            })
          }
        } else {
          setshowdata(time)
        }
        break
      case "like":
        if (like.length === 0) {
          let resdata = gettypesearch({
            type: type,
            sel: "like",
            num: 0,
            number: 10,
          })
          if (resdata !== 0) {
            resdata.then((res) => {
              if (res.msg) {
                setlike(res.data)
                setshowdata(res.data)
              } else {
                message.error("申请数据出错！" + res.message)
              }
            })
          }
        } else {
          setshowdata(like)
        }

        break
      default:
        break
    }
  }, [btn])
  // 处理botton事件
  function selbtn(str) {
    if (str === btn) {
      return
    } else {
      setbtn(str)
    }
  }
  // 处理申请更多
  function getmore() {
    let type = search.get("search")
    let resdata = ""
    switch (btn) {
      case "read":
        resdata = gettypesearch({
          type: type,
          sel: "read",
          num: read.length,
          number: 10,
        })
        if (resdata !== 0) {
          resdata.then((res) => {
            if (res.msg) {
              setread((pre) => [...pre, ...res.data])
              setshowdata((pre) => [...pre, ...res.data])
            } else {
              message.error("申请数据出错！" + res.message)
            }
          })
        }
        break
      case "time":
        resdata = gettypesearch({
          type: type,
          sel: "time",
          num: time.length,
          number: 10,
        })
        if (resdata !== 0) {
          resdata.then((res) => {
            if (res.msg) {
              settime((pre) => [...pre, ...res.data])
              setshowdata((pre) => [...pre, ...res.data])
            } else {
              message.error("申请数据出错！" + res.message)
            }
          })
        }
        break
      case "like":
        resdata = gettypesearch({
          type: type,
          sel: "like",
          num: like.length,
          number: 10,
        })
        if (resdata !== 0) {
          resdata.then((res) => {
            if (res.msg) {
              setlike((pre) => [...pre, ...res.data])
              setshowdata((pre) => [...pre, ...res.data])
            } else {
              message.error("申请数据出错！" + res.message)
            }
          })
        }
        break
      default:
        break
    }
  }

  const errEL = (
    <div className="err">
      <Empty description="暂 无 数 据 ">
        <Link to={"/edit"}>
          <span>加 入 创 作</span>{" "}
        </Link>
      </Empty>
    </div>
  )
  return (
    <div className="articlesearch">
      <div className="top">
        <div>
          <Button
            className={"top-btn" + (btn === "read" ? " sel" : "")}
            onClick={() => selbtn("read")}
          >
            最热文章
          </Button>
          <Button
            className={"top-btn" + (btn === "time" ? " sel" : "")}
            onClick={() => selbtn("time")}
          >
            最新发布
          </Button>
          <Button
            className={"top-btn" + (btn === "like" ? " sel" : "")}
            onClick={() => selbtn("like")}
          >
            最多点赞
          </Button>
        </div>
        <div>
          <span style={{ fontStyle: "italic" }}>当前搜索条目：</span>
          <span>{str}</span>
        </div>
      </div>
      <Divider style={{ margin: "10px 0 20px" }} />
      <div className="main">
        {state ? (
          showdata.length === 0 ? (
            errEL
          ) : (
            <ul className="HomeMain-ul">
              {showdata.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => navigate(`/exhibition?id=${item.articleid}`)}
                    className="HomeMain-ul-li"
                  >
                    <div className="HomeMain">
                      <span className="iconfont icon-user"></span>
                      <span className="sp">{item.author}</span>
                      <span className="iconfont icon-shijianchuo"></span>
                      <span className="sp">{timechange2(item.time)}</span>
                      <span className="iconfont icon-biaoqian"></span>
                      <span className="sp">
                        {item.type}&nbsp;&nbsp;&nbsp;&nbsp;{item.precisetype}
                      </span>
                      <div className="HomeMain-main">
                        <p className="title">{item.title}</p>
                        <p className="contant">{item.content}</p>
                      </div>
                      <div className="bottom">
                        <span className="bottom-sp">
                          <span
                            className="iconfont icon-yueduliang"
                            style={{ color: "rgb(48, 121, 190)" }}
                          ></span>
                        </span>
                        {item.read}
                        <span className="bottom-sp">
                          <span
                            className="iconfont icon-dianzan"
                            style={{ color: "rgb(48, 121, 190)" }}
                          ></span>
                        </span>
                        {item.like}
                        <span className="bottom-sp">
                          <span
                            className="iconfont icon-shoucang"
                            style={{ color: "rgb(48, 121, 190)" }}
                          ></span>
                        </span>
                        {item.collect}
                      </div>
                    </div>
                  </li>
                )
              })}
              <div>
                {showdata.length < 10 || (showdata.length - 10) % 10 !== 0 ? (
                  <Button className="btn">已加载所有数据</Button>
                ) : (
                  <Button className="btn" onClick={() => getmore()}>
                    加载更多
                  </Button>
                )}
              </div>
            </ul>
          )
        ) : (
          <div
            style={{
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 400,
            }}
          >
            <Spin />
          </div>
        )}
      </div>
    </div>
  )
}
