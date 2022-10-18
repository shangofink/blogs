import { message, Spin } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { getcreatordata } from "../../../../../api/creator"

export default function Column() {
  const [data, setdata] = useState({})
  const [state, setstate] = useState(false)
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      let resdata = getcreatordata("")
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setdata(res.data)
            setTimeout(() => {
              setstate(true)
            }, 200)
          } else {
            message.error("未知错误")
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
              <p>总专栏数</p> <p>{data.num}</p>
              <p>较前日--</p>
            </div>
          </li>
          <li>
            <div>
              <p>专栏关注数</p> <p>{data.collect}</p>
              <p>较前日--</p>
            </div>
          </li>
        </ul>
      )}
    </>
  )
}
