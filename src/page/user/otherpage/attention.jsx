import { Button, List, Skeleton, message, Avatar } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { getuserattention } from "../../../api/user"
import { getattention } from "../../../api/author"
import "./pulice.less"
export default function Attention() {
  const [loading, setLoading] = useState(false)
  const [attention, setattention] = useState([]) //数据项
  const [list, setList] = useState([]) //渲染
  // 初始申请
  useEffect(() => {
    if (attention.length === 0) {
      let resdata = getuserattention({ num: 0, number: 2 })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            if (res.data.length !== 0) {
              setLoading(false)
            } else {
              setLoading(true)
            }
            setattention(res.data)
            setList(res.data)
          } else {
            message.error(res.message)
          }
        })
      }
    }
  }, [attention])
  // 申请更多数据
  const onLoadMore = () => {
    setLoading(true)
    let resdata = getuserattention({ num: attention.length, number: 5 })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          let data = res.data
          for (let i in data) {
            data[i]["loading"] = false
          }
          if (data.length < 5) setLoading(true)
          const newdata = attention.concat(data)
          setattention(newdata)
          setList(newdata)
        } else {
          message.error(res.message)
        }
      })
    }
  }
  const loadMore = !loading ? (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      {list.length < 2 || (list.length - 2) % 5 !== 0 ? (
        ""
      ) : (
        <Button className="morebtn" onClick={onLoadMore}>
          加载更多
        </Button>
      )}
    </div>
  ) : null
  function attentionbtn(uuid) {
    let resdata = getattention({ type: "cancel", attentionid: uuid })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          const newdata = attention.filter((item) => item.uuid !== uuid)
          setattention(newdata)
          setList(newdata)
          message.info("取消关注成功")
        } else {
          message.error(res.message)
        }
      })
    }
  }
  return (
    <>
      <List
        className="demo-loadmore-list attention"
        itemLayout="horizontal"
        loadMore={loadMore} //加载按钮的样式
        dataSource={list} //数据
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.imgurl} />} //展示文章的标签
                title={<h2>{item.name}</h2>} //文章标题
                description={
                  <p>
                    点赞：{item.like} 收藏:{item.collect} 阅读:{item.read}
                  </p>
                } //内容
              />
              <div>
                <Button
                  className="cancel"
                  onClick={() => attentionbtn(item.uuid)}
                >
                  取消关注
                </Button>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  )
}
