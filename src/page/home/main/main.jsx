import "./main.less"
import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { message, Empty, Button, Spin } from "antd"
import { getarticle } from "../../../api/article"
import { useState } from "react"
import getsearch from "../../../utils/getsearch"
import { timechange2 } from "../../../utils/gettime"
function HomeMain() {
  // 首页文章数据
  const location = useLocation()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  // 加载动画
  const [state, setstate] = useState(false)
  // 申请文章数据
  useEffect(() => {
    if (getsearch(location.search) !== "") {
      let getdata = getsearch(location.search)
      if (data.length === 0) {
        getdata["num"] = 0
      } else {
        getdata["num"] = 0
      }
      getdata["number"] = 7
      let resdata = getarticle(getdata)
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            let regexpdata = JSON.parse(JSON.stringify(res.data))
            let reg = new RegExp(/[#/`]/g, "g")
            for (let i in regexpdata) {
              regexpdata[i].content = regexpdata[i].content.replace(reg, " ")
            }
            setData(regexpdata)
            setTimeout(() => {
              setstate(true)
            }, 200)
          } else {
            message.error("请求数据出错！")
          }
        })
      }
    }
  }, [location.search])
  // 无数据
  const errEL = (
    <div className="err">
      <Empty description="暂 无 数 据 ">
        <Link to={"/edit"}>
          <span>加 入 创 作</span>{" "}
        </Link>
      </Empty>
    </div>
  )
  // 有数据
  // 处理跳转
  function goto(id) {
    navigate(`/exhibition?id=${id}`)
  }
  function getmore() {
    let getdata = getsearch(location.search)
    getdata["num"] = data.length
    getdata["number"] = 5
    let resdata = getarticle(getdata)
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          let regexpdata = JSON.parse(JSON.stringify(res.data))
          let reg = new RegExp(/[#/`]/g, "g")
          for (let i in regexpdata) {
            regexpdata[i].content = regexpdata[i].content.replace(reg, " ")
          }
          setData(data.concat(regexpdata))
        } else {
          message.error("请求数据出错！")
        }
      })
    }
  }
  const el = (
    <ul className="HomeMain-ul">
      {data.map((item, index) => {
        return (
          <li
            key={index}
            onClick={() => goto(item.articleid)}
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
      {data.length !== 0 ? (
        <div>
          {(data.length - 7) % 5 === 0 ? (
            <Button className="btn" onClick={() => getmore()}>
              加载更多
            </Button>
          ) : (
            <Button className="btn">已加载所有数据</Button>
          )}
        </div>
      ) : (
        ""
      )}
    </ul>
  )

  return (
    <>
      {state ? (
        data.length === 0 ? (
          errEL
        ) : (
          el
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
    </>
  )
}
export default HomeMain
