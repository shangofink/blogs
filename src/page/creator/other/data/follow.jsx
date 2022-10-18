import { message, Spin } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { getcreatorfollow } from "../../../../api/creator"

export default function Follow() {
  const [data, setdata] = useState({})
  const [state, setstate] = useState(false)
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      let resdata = getcreatorfollow("")
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
              <p>总关注者</p> <p>{data.attentioned}</p>
              <p>较前日--</p>
            </div>
          </li>
          <li>
            <div>
              <p>活跃关注者</p> <p>{data.attentioned}</p>
              <p>较前日--</p>
            </div>
          </li>
          <li>
            <div>
              <p>新增关注者</p> <p>{data.oldnew}</p>
              <p>较前日--</p>
            </div>
          </li>
          <li>
            <div>
              <p>取消关注</p> <p>{data.oldreduce}</p>
              <p>较前日--</p>
            </div>
          </li>
          <li>
            <div>
              <p>净增关注</p>{" "}
              <p>
                {Object.keys(data).length === 0
                  ? 0
                  : parseInt(data.oldnew) - parseInt(data.oldreduce)}
              </p>
              <p>较前日--</p>
            </div>
          </li>
        </ul>
      )}
    </>
  )
}
