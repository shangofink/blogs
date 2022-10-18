import { Avatar, Button, List, Tag, message, Breadcrumb, Spin } from "antd"
import React, { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getauthors } from "../../api/authors"
import { getattention } from "../../api/author"
import "./authors.less"
import { useEffect } from "react"
export default function Authors() {
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  const [list, setList] = useState([]) // 列表展示数据
  const [state, setstate] = useState(false)
  // 第一次申请数据(条件：推荐) 10条
  useEffect(() => {
    if (search.get("type") === null) {
      setSearch("type=recommend")
      if (list.length === 0) {
        let resdata = getauthors({ num: 0, type: "recommend" })
        if (resdata !== 0) {
          resdata.then((res) => {
            if (res.msg) {
              setList(res.data)
              setTimeout(() => {
                setstate(true)
              }, 200)
            } else {
              message.error(res.message)
            }
          })
        }
      }
    } else {
      if (list.length === 0) {
        let resdata = getauthors({ num: 0, type: search.get("type") })
        if (resdata !== 0) {
          resdata.then((res) => {
            if (res.msg) {
              setList(res.data)
              setTimeout(() => {
                setstate(true)
              }, 200)
            } else {
              message.error(res.message)
            }
          })
        }
      }
    }
  }, [])
  // 顶部选择条件
  const [sel, setsel] = useState(
    search.get("type") === null ? "recommend" : search.get("type")
  )
  // 处理类型点击事件
  function changsel(str) {
    if (str !== sel) {
      // 申请数据 设置serch
      let resdata = getauthors({ num: 0, type: str })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setList(res.data)
          } else {
            message.error(res.message)
            setList(undefined)
          }
        })
      }
      setSearch(`type=${str}`)
      setsel(str)
    }
  }
  // 处理关注与取消关注事件
  function attentionbtn(n, item) {
    let resdata = getattention({
      type: n === 0 ? "cancel" : "attention",
      attentionid: item.uuid,
    })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          let data = JSON.parse(JSON.stringify(list))
          for (let i in data) {
            if (data[i].uuid === item.uuid) {
              data[i].boolean = !data[i].boolean
            }
          }
          setList(data)
          message.info(n === 0 ? "取消关注成功！" : "关注成功！")
        } else {
          message.error(res.message)
        }
      })
    }
  }
  // 申请更多数据
  const onLoadMore = () => {
    let resdata = getauthors({ num: list.length, type: search.get("type") })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setList((pre) => [...pre, ...res.data])
        } else {
          message.error(res.message)
        }
      })
    }
  }
  const loadMore = (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      {list.length < 10 || list.length % 10 !== 0 ? (
        <Button className="morebtn">已加载所有数据</Button>
      ) : (
        <Button className="morebtn" onClick={onLoadMore}>
          加载更多
        </Button>
      )}
    </div>
  )
  return state ? (
    <div className="author">
      <div className="author-nav">
        <Button
          className={"btn" + (sel === "recommend" ? " sel" : "")}
          onClick={() => changsel("recommend")}
        >
          推荐
        </Button>
        <Button
          className={"btn" + (sel === "backend" ? " sel" : "")}
          onClick={() => changsel("backend")}
        >
          后端
        </Button>
        <Button
          className={"btn" + (sel === "frontend" ? " sel" : "")}
          onClick={() => changsel("frontend")}
        >
          前端
        </Button>
        <Button
          className={"btn" + (sel === "android" ? " sel" : "")}
          onClick={() => changsel("android")}
        >
          Android
        </Button>
        <Button
          className={"btn" + (sel === "ios" ? " sel" : "")}
          onClick={() => changsel("ios")}
        >
          iOS
        </Button>
        <Button
          className={"btn" + (sel === "ai" ? " sel" : "")}
          onClick={() => changsel("ai")}
        >
          人工智能
        </Button>
        <Button
          className={"btn" + (sel === "freebie" ? " sel" : "")}
          onClick={() => changsel("freebie")}
        >
          开发工具
        </Button>
        <Button
          className={"btn" + (sel === "career" ? " sel" : "")}
          onClick={() => changsel("career")}
        >
          代码人生
        </Button>
        <Button
          className={"btn" + (sel === "article" ? " sel" : "")}
          onClick={() => changsel("article")}
        >
          阅读
        </Button>
      </div>
      <div className="main-list">
        <List
          className="author-list"
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          split={false}
          size="large"
          renderItem={(item) => (
            <List.Item
              actions={[
                item.boolean ? (
                  <Button
                    className="atbtn"
                    key="list-loadmore-edit"
                    onClick={() => attentionbtn(0, item)}
                  >
                    取消关注
                  </Button>
                ) : (
                  <Button
                    className="unatbtn"
                    key="list-loadmore-edit"
                    onClick={() => attentionbtn(1, item)}
                  >
                    新增关注
                  </Button>
                ),
              ]}
            >
              <List.Item.Meta
                onClick={() => navigate(`/usershow?id=${item.uuid}`)}
                avatar={<Avatar src={item.imgurl} className="img" />}
                title={<span style={{ fontSize: 25 }}>{item.name}</span>}
                description={
                  <div className="content">
                    <p style={{ marginBottom: 5 }}>
                      方向类型：
                      <Tag color="blue">
                        {item.type === null ? "暂无" : item.type}
                      </Tag>
                    </p>
                    <Breadcrumb>
                      <Breadcrumb.Item title="文章数">
                        <span className="iconfont icon-zuixinwenzhang_huaban">
                          &nbsp;{item.articlenum}
                        </span>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item title="栏目数">
                        <span className="iconfont icon-weimingmingwenjianjia_lanmu">
                          &nbsp;{item.columnnum}
                        </span>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item title="阅读数">
                        <span className="iconfont icon-yueduliang">
                          &nbsp;{item.read}
                        </span>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item title="点赞数">
                        <span className="iconfont icon-good">
                          &nbsp;{item.like}
                        </span>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item
                        title="收藏数"
                        style={{ color: "rgba(0,0,0,.45)" }}
                      >
                        <span className="iconfont icon-favorite">
                          &nbsp;{item.collected}
                        </span>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  ) : (
    <div className="spin">
      <Spin />
    </div>
  )
}
