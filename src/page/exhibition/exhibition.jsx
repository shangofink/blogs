import "./exhibition.less"
import { Viewer } from "@bytemd/react"
import gfm from "@bytemd/plugin-gfm"
import highlight from "@bytemd/plugin-highlight-ssr"
import mediumZoom from "@bytemd/plugin-medium-zoom"
import gemoji from "@bytemd/plugin-gemoji"
import "bytemd/dist/index.min.css" // 引入基础css
import "juejin-markdown-themes/dist/juejin.min.css" // 掘金同款样式
import { useState } from "react"
import {
  Button,
  message,
  Input,
  Comment,
  List,
  Tooltip,
  Tag,
  Spin,
  Divider,
} from "antd"
import { useEffect } from "react"
import {
  getarticle,
  getredata,
  getcomment,
  postcomment,
  getcommentlike,
  getarticlelike,
  getarticlecollect,
} from "../../api/showarticle"
import { useLocation, useNavigate } from "react-router-dom"
import { gettime } from "../../utils/gettime"
import getsearch from "../../utils/getsearch"
import { timechange } from "../../utils/gettime"
import { getattention } from "../../api/author"
const { TextArea } = Input
export default function Exhibition() {
  const navigate = useNavigate()
  const plugins = [gfm(), gemoji(), mediumZoom(), highlight()]
  const [value, setValue] = useState(undefined)
  const [inputdata, setinputdata] = useState(undefined) //输入数据
  const [alldata, setalldata] = useState({}) //作者+文章数据
  const [commentdata, setcommentdata] = useState(0) //评论总条数
  const [redata, setredata] = useState({}) //相关推荐数据
  const location = useLocation()
  const [eldata, seteldata] = useState([]) //评论数据
  // 加载动画
  const [state, setstate] = useState(false)
  // 申请文章数据 与评论数据
  useEffect(() => {
    let data = getsearch(location.search)
    // 申请文章数据
    if (value === undefined) {
      let resdata = getarticle({ articleid: data.id })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setalldata(res.data)
            setValue(res.data.content)
            setcommentdata(res.data.comment)
            setTimeout(() => {
              setstate(true)
            }, 200)
          } else {
            message.error(res.message + "文章内容错误")
          }
        })
      }
      // 申请评论数据
      let resdata2 = getcomment({ articleid: data.id, num: 0, number: 4 })
      if (resdata2 !== 0) {
        resdata2.then((res) => {
          if (res.msg) {
            let baseeldata =
              res.data.map === undefined
                ? []
                : res.data.map((item) => {
                    return {
                      actions: [
                        <Tooltip key="comment-basic-like">
                          <span
                            className="iconfont icon-dianzan"
                            style={{ color: "rgb(153, 148, 148)" }}
                            onClick={(e) =>
                              commentlike(e, item.commentid, item)
                            }
                          >
                            点赞({item.like})
                          </span>
                        </Tooltip>,
                        <span
                          key="comment-basic-reply-to"
                          className="iconfont icon-tubiaozhizuomoban-"
                        >
                          Reply to
                        </span>, //回复
                      ],
                      author: item.name,
                      avatar: item.imgurl,
                      content: <p>{item.content}</p>,
                      datetime: (
                        <Tooltip>
                          <span>{timechange(item.time)}</span>
                        </Tooltip>
                      ),
                      uuid: item.uuid,
                    }
                  })

            seteldata(baseeldata)
          } else {
            message.error("申请评论数据出错！" + res.message)
          }
        })
      }
    }
    // 申请推荐数据
    if (Object.keys(redata).length === 0) {
      let resdata = getredata({ articleid: data.id })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setredata(res.data)
          } else {
            message.error("获取推荐数据出错！" + res.message)
          }
        })
      }
    }
  }, [])
  // 处理文章点赞 与 不喜欢
  function articlesel(e, n) {
    let resdata = 0
    let articleid = getsearch(location.search).id
    if (e.target.style.color !== "rgb(48, 121, 190)") {
      if (n === 0) {
        resdata = getarticlelike({
          sel: "like",
          articleid: articleid,
          type: true,
        })
      } else if (n === 1) {
        resdata = getarticlelike({
          sel: "unlike",
          articleid: articleid,
          type: true,
        })
      }
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            e.target.style.color = "rgb(48, 121, 190)"
            n === 0
              ? setalldata((prevState) => ({
                  ...prevState,
                  like: prevState.like + 1,
                }))
              : setalldata((prevState) => ({
                  ...prevState,
                  unlike: prevState.unlike + 1,
                }))
          } else {
            message.error(res.message)
          }
        })
      }
    } else {
      //取消点赞 与 不赞同的
      if (n === 0) {
        resdata = getarticlelike({
          sel: "like",
          articleid: articleid,
          type: false,
        })
      } else if (n === 1) {
        resdata = getarticlelike({
          sel: "unlike",
          articleid: articleid,
          type: false,
        })
      }
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            e.target.style.color = "rgb(153, 148, 148)"
            n === 0
              ? setalldata((prevState) => ({
                  ...prevState,
                  like: prevState.like - 1,
                }))
              : setalldata((prevState) => ({
                  ...prevState,
                  unlike: prevState.unlike - 1,
                }))
          } else {
            message.error(res.message)
          }
        })
      }
    }
  }
  // 处理文章收藏
  function articlecollect(e) {
    if (e.target.style.color !== "rgb(48, 121, 190)") {
      let resdata = getarticlecollect({
        articleid: getsearch(location.search).id,
        type: true,
      })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            message.info("收藏成功")
            e.target.style.color = "rgb(48, 121, 190)"
          } else {
            message.error(res.message)
            if (res.message === "该文章已经被收藏！") {
              e.target.style.color = "rgb(48, 121, 190)"
            }
          }
        })
      }
    } else {
      let resdata = getarticlecollect({
        articleid: getsearch(location.search).id,
        type: false,
      })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            message.info("取消收藏成功")
            e.target.style.color = "rgb(153, 148, 148)"
          } else {
            message.error(res.message)
          }
        })
      }
    }
  }
  // 发布评论
  function commentbtn() {
    if (inputdata === "") {
      message.warn("评论内容不能为空！")
    } else {
      let obj = {
        content: inputdata,
        time: gettime(),
        articleid: getsearch(location.search).id,
      }
      let resdata = postcomment(obj)
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setinputdata(undefined)
            let data = getsearch(location.search)
            let resdata = getcomment({ articleid: data.id, num: 0, number: 4 })
            if (resdata !== 0) {
              resdata.then((res) => {
                if (res.msg) {
                  setcommentdata(commentdata + 1)
                  let baseeldata = res.data.map((item) => {
                    return {
                      actions: [
                        <Tooltip key="comment-basic-like">
                          <span
                            className="iconfont icon-dianzan"
                            style={{ color: "rgb(153, 148, 148)" }}
                            onClick={(e) =>
                              commentlike(e, item.commentid, item)
                            }
                          >
                            点赞({item.like})
                          </span>
                        </Tooltip>,
                        <span
                          key="comment-basic-reply-to"
                          className="iconfont icon-tubiaozhizuomoban-"
                        >
                          Reply to
                        </span>, //回复
                      ],
                      author: item.name,
                      avatar: item.imgurl,
                      content: <p>{item.content}</p>,
                      datetime: (
                        <Tooltip>
                          <span>{timechange(item.time)}</span>
                        </Tooltip>
                      ),
                    }
                  })
                  seteldata(baseeldata)
                } else {
                  message.error("更新评论数据出错！" + res.message)
                }
              })
            }
            message.info("发布成功！")
          } else {
            message.error("发布失败！" + res.message)
          }
        })
      }
    }
  }
  // 处理评论点赞
  function commentlike(e, commentid) {
    let resdata = 0
    let sel = 0
    if (e.target.style.color === "rgb(153, 148, 148)") {
      resdata = getcommentlike({ commentid: commentid, type: true })
    } else if (e.target.style.color === "rgb(48, 121, 190)") {
      sel = 1
      resdata = getcommentlike({ commentid: commentid, type: false })
    }
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          if (sel === 0) {
            e.target.style.color = "rgb(48, 121, 190)"
          } else {
            e.target.style.color = "rgb(153, 148, 148)"
          }
        } else {
          message.error("操作失败！" + res.message)
        }
      })
    }
  }
  // 处理关注事件
  function attbtn(n) {
    let type = ""
    if (n === 0) {
      type = "attention"
    } else {
      type = "cancel"
    }
    let resdata = getattention({ type: type, attentionid: alldata.uuid })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          let changedata = JSON.parse(JSON.stringify(alldata))
          changedata["boolean"] = !changedata["boolean"]
          setalldata(changedata)
          message.info(n === 0 ? "关注成功！" : "取消关注成功！")
        } else {
          message.error(res.message)
        }
      })
    }
  }
  // 申请评论
  function commentadd() {
    let resdata = getcomment({
      articleid: getsearch(location.search).id,
      num: eldata.length,
      number: 5,
    })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          let baseeldata = res.data.map((item) => {
            return {
              actions: [
                <Tooltip key="comment-basic-like">
                  <span
                    className="iconfont icon-dianzan"
                    style={{ color: "rgb(153, 148, 148)" }}
                    onClick={(e) => commentlike(e, item.commentid)}
                  >
                    点赞({item.like})
                  </span>
                </Tooltip>,
                <span
                  key="comment-basic-reply-to"
                  className="iconfont icon-tubiaozhizuomoban-"
                >
                  Reply to
                </span>, //回复
              ],
              author: item.name,
              avatar: item.imgurl,
              content: <p>{item.content}</p>,
              datetime: (
                <Tooltip>
                  <span>{timechange(item.time)}</span>
                </Tooltip>
              ),
            }
          })
          seteldata(eldata.concat(baseeldata))
        } else {
          message.error("申请评论数据出错！" + res.message)
        }
      })
    }
  }
  return state ? (
    <div className="show">
      <div className="left">
        <div className="main">
          <h1>{alldata.title}</h1>
          <div className="top">
            <div className="top-left">
              <img
                className="img"
                src={alldata.imgurl}
                alt=""
                onClick={() => navigate(`/usershow?id=${alldata.uuid}`)}
              />
              <div className="main">
                <span>{alldata.name}</span>
                <span>level:{alldata.level}</span>
                <p></p>
                <span>{timechange(alldata.time)} </span>
                <span>阅读数：{alldata.read}</span>
              </div>
            </div>
            {alldata.boolean ? (
              <Button
                className="btn"
                style={{ backgroundColor: "#eee" }}
                onClick={() => attbtn(1)}
              >
                <span
                  className="iconfont icon-yiguanzhu"
                  style={{ color: "rgb(48, 121, 190)" }}
                ></span>
              </Button>
            ) : (
              <Button
                className="btn"
                style={{ backgroundColor: "#eee" }}
                onClick={() => attbtn(0)}
              >
                <span
                  className="iconfont icon-yiguanzhu"
                  style={{ color: "rgb(153, 148, 148)" }}
                ></span>
              </Button>
            )}
          </div>
          <Divider style={{ backgroundColor: "#bfc6cf" }} />
          <div className="body">
            <Viewer value={value} plugins={plugins} />
          </div>
          <Divider style={{ backgroundColor: "#bfc6cf" }} />
          <div className="mainbottom">
            <span>分类：</span>
            <Tag color="blue">{alldata.type}</Tag>
            <span>标签：</span>
            <Tag color="geekblue">{alldata.precisetype}</Tag>
            <div>
              <a onClick={(e) => articlesel(e, 0)}>
                <span className="iconfont icon-dianzan" title="点赞"></span>(
                {alldata.like})
              </a>
              <a onClick={(e) => articlesel(e, 1)}>
                <span className="iconfont icon-cai" title="不赞同"></span>(
                {alldata.unlike})
              </a>
              <a onClick={(e) => articlecollect(e)}>
                <span className="iconfont icon-shoucang" title="收藏"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="comment">
        <h2>评论</h2>
        <div className="comment-body">
          <img className="img" src={localStorage.getItem("imgurl")} alt="" />
          <TextArea
            value={inputdata}
            onChange={(e) => setinputdata(e.target.value)}
            placeholder="Controlled autosize"
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </div>
        <div
          className={
            "b" + (inputdata === undefined || inputdata === "" ? " sel" : "")
          }
        >
          <Button type="primary" onClick={() => commentbtn()}>
            发布评论
          </Button>
        </div>
        {eldata.length === 0 ? (
          ""
        ) : (
          <div className="comshow">
            <div>
              <List
                className="comment-list"
                header={<h2>全部评论 {commentdata}</h2>}
                itemLayout="horizontal"
                dataSource={eldata}
                renderItem={(item) => (
                  <li style={{ marginLeft: 30 }}>
                    <Comment
                      actions={item.actions}
                      author={
                        <a
                          onClick={() => navigate(`/usershow?id=${item.uuid}`)}
                        >
                          {item.author}
                        </a>
                      }
                      avatar={
                        <img
                          src={item.avatar}
                          alt=""
                          onClick={() => navigate(`/usershow?id=${item.uuid}`)}
                        />
                      }
                      content={item.content}
                      datetime={item.datetime}
                    />
                  </li>
                )}
              />
              {eldata.length < commentdata ? (
                <Button onClick={() => commentadd()}>
                  还剩下 {commentdata - eldata.length} 条评论
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
      <div className="right-top">
        <div className="top-body">
          <img
            className="img"
            src={alldata.imgurl}
            alt=""
            onClick={() => navigate(`/usershow?id=${alldata.uuid}`)}
          />
          <div className="body-main">
            <span>{alldata.name}</span>
            <span>level:{alldata.level}</span>
            <p>
              类型：
              {alldata.ustype === null ? (
                "暂无"
              ) : (
                <Tag color="blue">{alldata.ustype}</Tag>
              )}{" "}
            </p>
          </div>
        </div>
        <Divider style={{ margin: "10px 0" }} />
        <div className="top-bottom">
          <div>
            <span
              className="iconfont icon-dianzan"
              style={{ color: "rgb(48, 121, 190)", fontSize: 22, marginTop: 5 }}
            ></span>
            <span>文章点赞数:</span>
            <span>{alldata.ulike}</span>
          </div>
          <span
            className="iconfont icon-yueduliang"
            style={{ color: "rgb(48, 121, 190)", fontSize: 22 }}
          ></span>
          <span>文章阅读数:</span>
          <span>{alldata.uread}</span>
        </div>
      </div>
      {Object.keys(redata).length === 0 ? (
        ""
      ) : (
        <div className="right-bottom">
          <div className="top">
            <span>相关文章</span>
          </div>
          <Divider style={{ margin: "15px 0 0 0" }} />
          <div className="bottom">
            <ul style={{ listStyle: "none" }}>
              {Object.keys(redata).map((item, index) => {
                return (
                  <li key={index}>
                    <a href={`/exhibition?id=${redata[item].articleid}`}>
                      {redata[item].title}
                    </a>
                    <p>
                      <span>点赞</span>
                      <span>评论</span>{" "}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div
      style={{
        backgroundColor: "#eee",
        height: "calc(100vh - 60px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin></Spin>
    </div>
  )
}
