import { message, Spin } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { getcreatorhome } from "../../../../../api/creator"

export default function Article() {
  const [state, setstate] = useState(false)
  const [data, setdata] = useState({})
  useEffect(() => {
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
  }, [data])
  return (
    <>
      {!state ? (
        <div
          className="spin"
          style={{
            minHeight: 480,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin></Spin>
        </div>
      ) : (
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
      )}
    </>
  )
}
