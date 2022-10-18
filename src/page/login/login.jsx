import { Button, Form, Input, message } from "antd"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCheckApi } from "../../api/check.js"
import "./login.less"
import Img from "../../img/posts.png"
import { postlogin } from "../../api/login.js"
import { useEffect } from "react"
import { doEncrypt } from "../../utils/sm/sm2"
export default function Login(props) {
  const navigate = useNavigate()
  async function tokenlogin() {
    const res = await postlogin()
    return res
  }
  useEffect(() => {
    var token = localStorage.getItem("token")
    if (token !== null) {
      let resdata = tokenlogin("")
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            message.info("登陆成功！2s后跳转首页")
            setTimeout(function () {
              navigate("/home?type=synthesize&type2=all&type3=like")
            }, 2000)
          } else {
            message.info("登陆过期！请重新登陆！")
            localStorage.removeItem("token")
          }
        })
      }
    }
  })
  // 扫码登陆
  const oneselect = (
    <div className="oneselect">
      <img className="loginimg" src={Img} alt=""></img>
    </div>
  )
  // 验证码
  // const [checktime,setchecktime]=useState(0)
  const [el, setEL] = useState("")
  const [check, setcheck] = useState("")
  // 获取验证码,60s间隔
  async function getCheck(e) {
    const time = new Date()
    // var timed=(time.getTime()-checktime)/1000
    // if(timed<60){
    //   message.error('请于'+Number((60-timed)).toFixed(0)+'秒后再获取验证码');
    //   return
    // }else{

    // }
    const res = await getCheckApi({ time: time })
    setEL(res.imgData)
    setcheck(res.check)
    // setchecktime(time.getTime())
  }
  // 验证账号密码
  const onFinish = async (values) => {
    if (values.captcha.toUpperCase() === check.toUpperCase()) {
      // 验证密码
      let data = {
        username: values.username,
        password: values.password,
        remember: values.remember,
      }
      let resdata = postlogin(doEncrypt(data))
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            // 存储token,imgurl到localstorage中
            localStorage.setItem("token", res.token)
            localStorage.setItem("imgurl", res.imgurl)
            message.info("登陆成功！2s后跳转首页")
            setTimeout(function () {
              props.props.setimgurl(res.imgurl)
              navigate("/home")
            }, 1500)
          } else {
            message.error("账号与密码错误！请重新输入！")
          }
        })
      }
    } else {
      message.error("验证码错误！")
    }
  }

  return (
    <div className="Login">
      <div className="main">
        <span className="title">欢迎你</span>

        <Form
          name="normal_login"
          className="login-form"
          size="middle"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            validateFirst={true}
            validateTrigger={["onSubmit"]}
            hasFeedback
            validateStatus=""
            rules={[
              {
                required: true,
                message: "请输入你的账号",
              },
              {
                type: "string",
                len: 11,
                message: "账号长度为十一位",
              },
            ]}
          >
            <Input
              className="username"
              placeholder="请输入用户名"
              bordered={false}
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            validateFirst={true}
            validateTrigger={["onSubmit"]}
            rules={[
              {
                required: true,
                message: "请输入你的密码",
              },
              {
                type: "string",
                max: 12,
                min: 8,
                message: "密码长度为 8~12位",
              },
            ]}
          >
            <Input
              className="username"
              placeholder="请输入密码"
              bordered={false}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="captcha"
            validateFirst={true}
            validateTrigger={["onSubmit"]}
            rules={[
              {
                required: true,
                message: "请输入你的验证码",
              },
              {
                type: "string",
                max: 4,
                min: 4,
                message: "验证码为四位字符",
              },
            ]}
          >
            <div className="checkdiv">
              <Input
                className="check"
                placeholder="四位验证码"
                bordered={false}
                prefix={<UserOutlined />}
              />
              {el === "" ? (
                <div className="checkbtn">
                  <Button onClick={getCheck}>获取验证码</Button>
                </div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: el }}
                  style={{
                    width: 100,
                    height: 40,
                    borderRadius: "40px",
                    marginLeft: 10,
                    backgroundColor: "#fff",
                    border: "1px solid rgba(215, 212, 212, 0.2)",
                  }}
                  onClick={getCheck}
                />
              )}
            </div>
          </Form.Item>

          <Form.Item>
            <div className="bottom">
              <Button
                type="primary"
                shape="round"
                style={{ width: 140, marginBottom: 10, height: 40 }}
                htmlType="submit"
              >
                登陆
              </Button>
              <Button
                type="primary"
                shape="round"
                style={{ marginLeft: 20, width: 140, height: 40 }}
                onClick={() => navigate("/register")}
              >
                注册
              </Button>
            </div>
          </Form.Item>
        </Form>
        <div className="sel">
          <a>忘记密码</a>
        </div>
      </div>
    </div>
  )
}
