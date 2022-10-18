import "./account.less"
import { Button, Input, message, Modal } from "antd"
import { useEffect } from "react"
import { getuserdata2, getchange, getlogout } from "../../../../../api/user"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { doDecrypt, doEncrypt } from "../../../../../utils/sm/sm2"
export default function Account() {
  const navigate = useNavigate()
  const [data, setdata] = useState("")
  useEffect(() => {
    if (data === "") {
      let resdata = getuserdata2("")
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            let smdata = doDecrypt(res.data)
            setdata(smdata[0])
          } else {
            message.error("未知错误")
          }
        })
      }
    }
  }, [data])
  const unensureEl = (
    <>
      <span className="dataspan">未绑定</span>
      <Button onClick={btn}>绑定</Button>
    </>
  )
  const [sel, setsel] = useState(0)
  const Pass = () => {
    const [newpa, setnewpa] = useState(undefined)
    const [oldpa, setoldpa] = useState(undefined)
    const handleOk = () => {
      if (newpa === undefined || oldpa === undefined) {
        message.warn("密码填写不能为空")
      } else {
        // 申请数据
        let doEncryptdata = doEncrypt({ old: oldpa, new: newpa })
        let resdata = getchange({ data: doEncryptdata })
        if (resdata !== 0) {
          resdata.then((res) => {
            if (res.msg) {
              message.info("修改成功")
              setTimeout(() => {
                setsel(0)
              }, 1000)
            } else {
              message.error(res.message)
            }
          })
        }
      }
    }
    const handleCancel = (e) => {
      setsel(0)
    }
    return (
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
          >
            修改密码
          </div>
        }
        visible={true}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确认修改"
      >
        <div style={{ textAlign: "center" }}>
          <span>旧密码：</span>
          <Input.Password
            style={{ width: 300 }}
            placeholder="input password"
            onChange={(e) => setoldpa(e.target.value)}
          />
          <p></p>
          <span>新密码：</span>
          <Input.Password
            style={{ width: 300 }}
            placeholder="input password"
            onChange={(e) => setnewpa(e.target.value)}
          />
        </div>
      </Modal>
    )
  }
  const Logout = () => {
    const [user, setuser] = useState(undefined)
    const [password, setpa] = useState(undefined)
    const handleOk = () => {
      if (user === undefined || password === undefined) {
        message.warn("账号密码填写不能为空")
      } else {
        let doEncryptdata = doEncrypt({ user: user, password: password })
        let resdata = getlogout({ data: doEncryptdata })
        if (resdata !== 0) {
          resdata.then((res) => {
            if (res.msg) {
              message.info("注销成功！2s后跳转登陆界面")
              localStorage.clear()
              setTimeout(() => {
                navigate("/login")
              }, 1000)
            } else {
              message.error(res.message)
            }
          })
        }
      }
    }
    const handleCancel = (e) => {
      setsel(0)
    }
    return (
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
          >
            注销账号
          </div>
        }
        visible={true}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确认修改"
      >
        <div style={{ textAlign: "center" }}>
          <span>账号：</span>
          <Input
            style={{ width: 300 }}
            placeholder="input username"
            onChange={(e) => setuser(e.target.value)}
          />
          <p></p>
          <span>密码：</span>
          <Input.Password
            style={{ width: 300 }}
            placeholder="input password"
            onChange={(e) => setpa(e.target.value)}
          />
        </div>
      </Modal>
    )
  }
  // 决定哪个显示
  function btn(str) {
    switch (str) {
      case "change":
        setsel(1)
        break
      case "logout":
        setsel(2)
        break
      default:
        break
    }
  }
  return (
    <div className="Account">
      <span style={{ fontWeight: "bold", fontSize: "20px" }}>账号设置</span>
      <ul style={{ listStyle: "none", marginTop: "10px" }}>
        <li>
          <span className="spantwo">手机</span>
          {data.photo === null ? (
            unensureEl
          ) : (
            <>
              <span className="dataspan">{data.photo}</span>
              <span style={{ color: "#eee" }}>已绑定</span>
            </>
          )}
        </li>
        <li>
          <span className="spantwo">微信</span>
          {data.weichat === null ? (
            unensureEl
          ) : (
            <>
              <span className="dataspan">{data.weichat}</span>
              <Button onClick={() => btn}>解绑</Button>
            </>
          )}
        </li>
        <li>
          <span className="spanfour">新浪微博</span>
          {data.xinlang === null ? (
            unensureEl
          ) : (
            <>
              <span className="dataspan">{data.xinlang}</span>
              <Button onClick={() => btn}>解绑</Button>
            </>
          )}
        </li>
        <li>
          <span style={{ marginRight: "82px" }}>GitHub</span>
          {data.github === null ? (
            unensureEl
          ) : (
            <>
              <span className="dataspan">{data.github}</span>
              <Button onClick={() => btn}>解绑</Button>
            </>
          )}
        </li>
        <li>
          <span className="spantwo">密码</span>
          <>
            <span className="dataspan">**********</span>
            <Button onClick={() => btn("change")}>修改</Button>
          </>
        </li>
        <li>
          <span className="spanfour">账号注销</span>
          {data.uuid === null ? (
            unensureEl
          ) : (
            <>
              <span className="dataspan">{data.uuid}</span>
              <Button onClick={() => btn("logout")}>注销</Button>
            </>
          )}
        </li>
      </ul>
      {sel === 1 ? <Pass /> : ""}
      {sel === 2 ? <Logout /> : ""}
    </div>
  )
}
