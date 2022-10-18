import {
  LikeOutlined,
  MessageOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import { Avatar, Button, List, message, Space, Skeleton } from "antd"
import React, { useEffect } from "react"
import { useState } from "react"
import { getuserdynamic } from "../../../api/user"
import { timechange } from "../../../utils/gettime"
import "./pulice.less"
export default function Dynamic() {
  const [loading, setLoading] = useState(false)
  const [dy, setdy] = useState([])
  const [list, setList] = useState([]) //渲染
  // 申请数据
  useEffect(() => {
    if (dy.length === 0) {
      let resdata = getuserdynamic({ num: 0, number: 2 })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setdy(res.data)
            setList(res.data)
          } else {
            message.error(res.message)
          }
        })
      }
    }
  }, [dy])
  // 申请更多数据
  const onLoadMore = () => {
    setLoading(true)
    setdy(
      dy.concat(
        [...new Array(4)].map(() => ({
          loading: true,
        }))
      )
    )
    let resdata = getuserdynamic({ num: dy.length, number: 5 })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          let data = res.data
          for (let i in data) {
            data[i]["loading"] = false
          }
          const newData = dy.concat(data)
          console.log(newData)
          setdy(newData)
          setList(newData)
        } else {
          message.error(res.message)
        }
      })
    }
  }
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )
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

  function moodsel(mood) {
    switch (mood) {
      case "0":
        return (
          <svg className="all" aria-hidden="true">
            <use className="use" xlinkHref="#icon--happy-"></use>
          </svg>
        )
      case "1":
        return (
          <svg className="all" aria-hidden="true">
            <use xlinkHref="#icon-yiban-copy"></use>
          </svg>
        )
      case "2":
        return (
          <svg className="all" aria-hidden="true">
            <use xlinkHref="#icon-weiqu"></use>
          </svg>
        )
      case "3":
        return (
          <svg className="all" aria-hidden="true">
            <use xlinkHref="#icon-ku-copy"></use>
          </svg>
        )
      case "4":
        return (
          <svg className="all" aria-hidden="true">
            <use xlinkHref="#icon-daku"></use>
          </svg>
        )
      default:
        return ""
    }
  }
  return (
    <div style={{ minHeight: 300 }}>
      <List
        itemLayout="vertical"
        loadMore={loadMore}
        size="large"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            key={item.dynamicid}
            actions={[
              //底部标签
              <IconText
                icon={LikeOutlined}
                text={item.like}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
              <IconText
                icon={ClockCircleOutlined}
                text={timechange(item.time)}
                key="list-vertical-message"
              />,
            ]}
          >
            <Skeleton loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={localStorage.getItem("imgurl")} />}
                title={
                  <div>
                    <p>
                      {item.name} &nbsp;&nbsp; {moodsel(item.mood)}
                    </p>
                  </div>
                }
              />
              <div style={{ marginLeft: 20 }}>{item.content}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}
