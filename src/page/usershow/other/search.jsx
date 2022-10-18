import { message, Button, Empty, Spin } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { timechange2 } from "../../../utils/gettime"
import { getusershowsearch } from "../../../api/usershow"
export default function UserSearch() {
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  const [data, setdata] = useState([])
  const [state, setstate] = useState(false)
  useEffect(() => {
    if (search.get("search") === null || search.get("search") === "") {
      navigate(`/usershow/search?id=${search.get("id")}&search=0`)
    } else {
      let uuid = search.get("id")
      let resdata = getusershowsearch({
        uuid: uuid,
        title: search.get("search"),
        num: 0,
        number: 4,
      })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            let regexpdata = JSON.parse(JSON.stringify(res.data))
            let reg = new RegExp(/[#/`]/g, "g")
            for (let i in regexpdata) {
              regexpdata[i].content = regexpdata[i].content.replace(reg, " ")
            }
            setdata(regexpdata)
            setTimeout(() => {
              setstate(true)
            }, 200)
          } else {
            message.error("发生错误！" + res.message)
          }
        })
      }
    }
  }, [])
  function getmore() {
    let uuid = search.get("id")
    let resdata = getusershowsearch({
      uuid: uuid,
      title: search.get("search"),
      num: data.length,
      number: 4,
    })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          let regexpdata = JSON.parse(JSON.stringify(res.data))
          let reg = new RegExp(/[#/`]/g, "g")
          for (let i in regexpdata) {
            regexpdata[i].content = regexpdata[i].content.replace(reg, " ")
          }
          setdata(data.concat(regexpdata))
        } else {
          message.error("请求数据出错！")
        }
      })
    }
  }
  const el = (
    <>
      <ul className="HomeMain-ul">
        {data.map((item, index) => {
          return (
            <li
              key={index}
              // onClick={() => goto(item.articleid)}
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
          {data.length < 4 || (data.length - 4) % 4 !== 0 ? (
            <Button className="btn">已加载所有数据</Button>
          ) : (
            <Button className="btn" onClick={() => getmore()}>
              加载更多
            </Button>
          )}
        </div>
      </ul>
    </>
  )
  const nodatael = (
    <div className="empty">
      <Empty />
    </div>
  )
  return state ? (
    <div className="search-article">{data.length === 0 ? nodatael : el}</div>
  ) : (
    <div className="spin">
      <Spin />
    </div>
  )
}
