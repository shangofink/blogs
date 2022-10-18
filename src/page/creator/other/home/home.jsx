import "./home.less"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button, message, Empty, Space, Table, Tag, Spin } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { getcreatorhome } from "../../../../api/creator"
import { timechange, getoldtimestring } from "../../../../utils/gettime"
export default function Home() {
  const [search, setSearch] = useSearchParams()
  const navigate = useNavigate()
  const [state, setstate] = useState(false)
  const [btn, setBtn] = useState(
    search.get("type") === null ? "time" : search.get("type")
  )
  const [data, setdata] = useState({}) //上部数据

  const [showdata, setshowdata] = useState([])
  const [articledata, setad] = useState({}) // 最新数据
  const [readdata, setrd] = useState({}) // 阅读最多数据
  // 表格配置
  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: "300px",
      render: (text) => <h3>{text}</h3>,
      ellipsis: "true",
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: "80px",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "precisetype",
      dataIndex: "precisetype",
      key: "precisetype",
      align: "center",
      width: "80px",
      render: (precisetype) => <Tag color="geekblue">{precisetype}</Tag>,
    },
    {
      title: "read",
      dataIndex: "read",
      key: "read",
      align: "center",
      width: "100px",
      render: (text) => (
        <>
          <span
            className="iconfont icon-yueduliang"
            style={{ color: "rgb(48, 121, 190)" }}
          >
            {""}
          </span>
          &nbsp;&nbsp;
          {text}
        </>
      ),
    },
    {
      title: "time",
      dataIndex: "time",
      key: "time",
      align: "center",
      width: "150px",
      render: (text) => timechange(text),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: "180px",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/exhibition?id=${record.articleid}`)}>
            查看
          </a>
        </Space>
      ),
    },
  ]

  //初始跳转 并 初始申请数据
  useEffect(() => {
    if (
      search.get("type") === null ||
      (search.get("type") !== "time" && search.get("type") !== "read")
    ) {
      navigate("/creator/home?type=time")
    } else {
      if (Object.keys(data).length === 0) {
        let resdata = getcreatorhome("")
        if (resdata !== 0) {
          resdata.then((res) => {
            if (res.msg) {
              setdata(res.data)
              setTimeout(() => {
                setstate(true)
              }, 200)
            } else {
              message.error(res.message)
            }
          })
        }
      }
      setTimeout(() => {
        switch (search.get("type")) {
          case "time":
            if (Object.keys(articledata).length === 0) {
              let resdata2 = getcreatorhome({ type: "time" })
              if (resdata2 !== 0) {
                resdata2.then((res) => {
                  if (res.msg) {
                    setad(res.data)
                    setshowdata(res.data)
                  } else {
                    message.error("未知错误")
                  }
                })
              }
            }
            break
          case "read":
            if (Object.keys(readdata).length === 0) {
              let resdata = getcreatorhome({ type: "read" })
              if (resdata !== 0) {
                resdata.then((res) => {
                  if (res.msg) {
                    setrd(res.data)
                    setshowdata(res.data)
                  } else {
                    message.error("未知错误")
                  }
                })
              }
            }
            break
          default:
            break
        }
      }, 350)
    }
  }, [search])

  function btnclick(sel) {
    let type = search.get("type")
    if (type !== sel) {
      switch (sel) {
        case "time":
          if (Object.keys(articledata).length === 0) {
            let resdata = getcreatorhome({ type: sel })
            if (resdata !== 0) {
              resdata.then((res) => {
                if (res.msg) {
                  setad(res.data)
                  setshowdata(res.data)
                  setSearch(`type=${sel}`)
                  setBtn(sel)
                } else {
                  message.error("未知错误")
                }
              })
            }
          } else {
            setshowdata(articledata)
            setSearch(`type=${sel}`)
            setBtn(sel)
          }
          break
        case "read":
          if (Object.keys(readdata).length === 0) {
            let resdata = getcreatorhome({ type: sel })
            if (resdata !== 0) {
              resdata.then((res) => {
                if (res.msg) {
                  setrd(res.data)
                  setshowdata(res.data)
                  setSearch(`type=${sel}`)
                  setBtn(sel)
                } else {
                  message.error("未知错误")
                }
              })
            }
          } else {
            setshowdata(readdata)
            setSearch(`type=${sel}`)
            setBtn(sel)
          }
          break
        default:
          break
      }
    }
  }
  return (
    <div className="creat-Home">
      <div className="right-one">
        <div className="one-top">
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>数据预览</span>
          <span style={{ color: "rgb(153, 148, 148)" }}>
            最后 {getoldtimestring()} 的数据表现
          </span>
        </div>
        {state ? (
          <div className="one-main">
            <ul>
              <li>
                <div>
                  <p>总关注数</p> <p>{data.attentioned}</p>
                  <p>较前日--</p>
                </div>
              </li>
              <li>
                <div>
                  <p>文章展现数</p> <p>{data.articlenum}</p>
                  <p>较前日--</p>
                </div>
              </li>
              <li>
                <div>
                  <p>文章阅读数</p> <p>{data.read}</p>
                  <p>较前日--</p>
                </div>
              </li>
              <li>
                <div>
                  <p>文章点赞数</p> <p>{data.like}</p>
                  <p>较前日--</p>
                </div>
              </li>
              <li>
                <div>
                  <p>文章评论数</p> <p>{data.comment}</p>
                  <p>较前日--</p>
                </div>
              </li>
              <li>
                <div>
                  <p>文章收藏数</p> <p>{data.collected}</p>
                  <p>较前日--</p>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <div
            style={{
              minHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin />
          </div>
        )}
      </div>
      <div className="right-two">
        <div className="two-top">
          <span
            style={{
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            近期发布
          </span>
          <div>
            <Button
              className={"btn" + (btn === "time" ? " sel" : "")}
              onClick={() => btnclick("time")}
            >
              最新
            </Button>
            <Button
              className={"btn" + (btn === "read" ? " sel" : "")}
              onClick={() => btnclick("read")}
            >
              最热
            </Button>
          </div>
        </div>
        <div className="home-main">
          <div className="main">
            <div>
              <Table
                rowKey={(record) => record.articleid}
                columns={columns}
                showHeader={false}
                dataSource={showdata}
                bordered={false}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
