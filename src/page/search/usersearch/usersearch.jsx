import {
  message,
  List,
  Button,
  Avatar,
  Tag,
  Breadcrumb,
  Divider,
} from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import "./usersearch.less"
import { getusersearch } from "../../../api/search.js"
import { getattention } from "../../../api/author"
export default function UserSearch() {
  const [search, setSearch] = useSearchParams()

  const navigate = useNavigate()
  const [showdata, setshowdata] = useState([])
  const [state, setstate] = useState(false)
  const [str, setstr] = useState(undefined)
  // 初始化数据
  useEffect(() => {
    let name = search.get("search")
    if (
      name === null ||
      name === undefined ||
      name.length < 2 ||
      name.length > 10
    ) {
      message.error("搜索字段出现错误，将返回首页！")
      setTimeout(() => {
        navigate("/home", { replace: false })
      }, 1000)
    } else {
      let resdata = getusersearch({ name: name, num: 0, number: 10 })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setshowdata(res.data)
            setstr(name)
            setTimeout(() => {
              setstate(true)
            }, 200)
          } else {
            message.error("数据请求错误！" + res.message)
          }
        })
      }
    }
  }, [])
  function loadMore() {
    let name = search.get("search")
    let resdata = getusersearch({
      name: name,
      num: showdata.length,
      number: 10,
    })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setshowdata(res.data)
          setstr(name)
          setTimeout(() => {
            setstate(true)
          }, 200)
        } else {
          message.error("数据请求错误！" + res.message)
        }
      })
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
          let data = JSON.parse(JSON.stringify(showdata))
          for (let i in data) {
            if (data[i].uuid === item.uuid) {
              data[i].boolean = !data[i].boolean
            }
          }
          setshowdata(data)
          message.info(n === 0 ? "取消关注成功！" : "关注成功！")
        } else {
          message.error(res.message)
        }
      })
    }
  }
  return (
    <div style={{ paddingBottom: 10 }}>
      <div className="usersearch">
        <div className="main-list">
          <div className="top">
            <span style={{ fontStyle: "italic" }}>当前搜索条目：</span>
            {str}
            <Divider style={{ maginBottom: "10px" }} />
          </div>
          <List
            className="author-list"
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={showdata}
            split={false}
            size="large"
            renderItem={(item) => (
              <List.Item
                onClick={() => navigate(`/usershow?id=${item.uuid}`)}
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
    </div>
  )
}
