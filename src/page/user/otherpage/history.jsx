import { Button, List, message, Skeleton, Tag } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { gethistorychange, getuserhistory } from "../../../api/user"
import "./pulice.less"
import { timechange } from "../../../utils/gettime"
export default function History() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [history, sethistory] = useState([]) //数据项
  const [list, setList] = useState([]) //渲染
  // 初始申请
  useEffect(() => {
    if (history.length === 0) {
      let resdata = getuserhistory({ num: 0, number: 4 })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            if (res.data.length === 0) {
              setLoading(true)
            } else {
              sethistory(res.data)
              setList(res.data)
            }
          } else {
            message.error(res.message)
          }
        })
      }
    }
  }, [history])
  // 申请更多数据
  const onLoadMore = () => {
    setLoading(true)
    //添加占位加载 不修改原来数据
    setList(
      history.concat(
        [...new Array(1)].map(() => ({
          loading: true,
        }))
      )
    )
    let resdata = getuserhistory({ num: history.length, number: 5 })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          let data = res.data
          if (data.length !== 0) {
            for (let i in data) {
              data[i]["loading"] = false
            }
            const newdata = history.concat(data)
            sethistory(newdata)
            setList(newdata)
          } else {
            setList(history)
            setLoading(true)
          }
        } else {
          message.error(res.message)
        }
      })
    }
  }
  const loadMore = !loading ? ( //判断是否展示申请栏
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button className="morebtn" onClick={onLoadMore}>
        加载更多
      </Button>
    </div>
  ) : null
  function btn(n, articleid, time) {
    let resdata = ""
    if (n === 1) {
      resdata = gethistorychange("")
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            sethistory([])
            setList([])
            message.info("删除成功！")
          } else {
            message.error("删除失败！" + res.message)
          }
        })
      }
    } else {
      resdata = gethistorychange({ articleid: articleid, time: time })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            const newdata = history.filter(
              (item) => item.articleid !== articleid && item.time !== time
            )
            sethistory(newdata)
            setList(newdata)
            message.info("删除成功！")
          } else {
            message.error("删除失败！" + res.message)
          }
        })
      }
    }
  }
  return (
    <div className="history">
      {list.length !== 0 ? (
        <Button className="deleteall" onClick={() => btn(1, 0, 0)}>
          清空数据
        </Button>
      ) : (
        ""
      )}

      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        loadMore={loadMore} //加载按钮的样式
        dataSource={list} //数据
        renderItem={(item) => (
          <List.Item className="item">
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<span className="iconfont icon-icon-yuedu"></span>} //展示文章的标签
                title={
                  <a
                    onClick={() => navigate(`/exhibition?id=${item.articleid}`)}
                  >
                    <h2>{item.title}</h2>
                  </a>
                } //文章标题
                description={
                  <>
                    <UserOutlined />
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    <span>{item.name}</span>&nbsp;&nbsp;/&nbsp;&nbsp;
                    <Tag color="blue">{item.type}</Tag>&nbsp;&nbsp;/&nbsp;&nbsp;
                    <Tag color="geekblue">{item.precisetype}</Tag>
                    &nbsp;&nbsp; || 浏览时间 {timechange(item.time)}
                  </>
                } //内容
              />
              <div>
                <Button onClick={() => btn(0, item.articleid, item.time)}>
                  删除记录
                </Button>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}
