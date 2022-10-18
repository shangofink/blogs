import {
  LikeOutlined,
  MessageOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import { Button, List, Avatar, Skeleton, Space, message } from "antd"
import React, { useLayoutEffect, useState } from "react"
import { getusershowdynamic } from "../../../api/usershow"
import { timechange } from "../../../utils/gettime"
import "./pulice.less"
export default function UserDynamic(props) {
  const [data, setdata] = useState([])
  const [state, setstate] = useState(false)
  useLayoutEffect(() => {
    let resdata = getusershowdynamic({ uuid: props.uuid, num: 0, number: 1 })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setdata(res.data)
          setTimeout(() => {
            setstate(true)
          }, 200)
        } else {
        }
      })
    }
  }, [])
  const onLoadMore = () => {
    let resdata = getusershowdynamic({
      uuid: props.uuid,
      num: data.length,
      number: 5,
    })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setdata((pre) => [...pre, ...res.data])
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
      {data.length < 1 || (data.length - 1) % 5 !== 0 ? (
        <Button className="morebtn">已加载全部数据</Button>
      ) : (
        <Button className="morebtn" onClick={onLoadMore}>
          加载更多
        </Button>
      )}
    </div>
  )

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )
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
    <div className="usershow-dynamic" style={{ minHeight: 180 }}>
      <List
        itemLayout="vertical"
        loadMore={loadMore}
        size="large"
        dataSource={data}
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
                text="0"
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
                avatar={
                  <Avatar
                    style={{ width: 50, height: 50 }}
                    src={localStorage.getItem("imgurl")}
                  />
                }
                title={
                  <div style={{ display: "flex", marginLeft: 10 }}>
                    <p style={{ fontSize: 25 }}>
                      {item.name} &nbsp;&nbsp; {moodsel(item.mood)}{" "}
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
