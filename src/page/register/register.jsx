import { Button, Checkbox, Col, Form, Input, Row, Select, message } from "antd"
import { getCheckApi } from "../../api/check.js"
import { adduser } from "../../api/register.js"
import { doEncrypt } from "../../utils/sm/sm2"
import { LeftOutlined } from "@ant-design/icons"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./register.less"

export default function Register() {
  const { Option } = Select
  const navigate = useNavigate()
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  }
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
    //   const res = await getCheckApi({'time':time});
    //   setEL(res.imgData)
    //   setcheck(res.check)
    //   setchecktime(time.getTime())
    // }
    const res = await getCheckApi({ time: time })
    setEL(res.imgData)
    setcheck(res.check)
    // setchecktime(time.getTime())
  }

  const [form] = Form.useForm()
  const onFinish = async (values) => {
    var data = values
    if (data.captcha.toLowerCase() === check.toLowerCase()) {
      if (data.intro === undefined) {
        data.intro = "此人很懒，没有留下任何信息。"
      }
      // 请求 判断是否存在账号（个人电话）

      let resdata = adduser({ data: doEncrypt(data) })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            message.success("注册成功！3s后跳转登陆界面！")
            // 注册成功则清除原有的token
            localStorage.removeItem("token")
            setTimeout(function () {
              navigate("/login")
            }, 3000)
          } else {
            message.error(res.message)
          }
        })
      }
    } else {
      message.error("验证码错误！")
    }
  }
  return (
    <div className="Register">
      <div className="form">
        {/*  */}
        <div className="top">
          <Link to="/login">
            <LeftOutlined />
            <span>返回登陆</span>
          </Link>
        </div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          {/* 名称 */}
          <Form.Item
            name="nickname"
            label="账号名称"
            rules={[
              {
                required: true,
                message: "请输入你的名称!",
                whitespace: true,
              },
              {
                type: "string",
                max: 6,
                min: 3,
                message: "名称长度只能是3~6位字符",
              },
            ]}
          >
            <Input placeholder="请输入你的昵称" />
          </Form.Item>
          {/* 密码 */}
          <Form.Item
            name="password"
            label="账号密码"
            rules={[
              {
                required: true,
                message: "请输入你的密码!",
              },
              {
                type: "string",
                max: 12,
                min: 8,
                message: "密码长度为 8~12位",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="请输入你的密码" autoComplete="" />
          </Form.Item>
          {/* 密码 */}
          <Form.Item
            name="confirm"
            label="二次密码"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "请再输入一次密码!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve()
                  }

                  return Promise.reject(new Error("两次密码不一致！"))
                },
              }),
            ]}
          >
            <Input.Password placeholder="请再次输入密码" autoComplete="" />
          </Form.Item>
          {/* 性别 */}
          <Form.Item
            name="sex"
            label="性别"
            rules={[
              {
                required: true,
                message: "请选择你的性别!",
              },
            ]}
          >
            <Select placeholder="选择你的性别">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          {/* 电话 */}
          <Form.Item
            name="photo"
            label="个人电话"
            rules={[
              {
                required: true,
                message: "请输入你的联系电话!",
              },
              {
                type: "string",
                len: 11,
                message: "请输入11位联系电话!",
              },
            ]}
          >
            <Input
              addonBefore=" + 86 "
              placeholder="请输入你的联系电话"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          {/* 邮箱 */}
          <Form.Item
            name="email"
            label="个人邮箱"
            rules={[
              {
                type: "email",
                message: "请输入正确的邮箱格式",
              },
              {
                required: true,
                message: "请输入你的电子邮箱！",
              },
            ]}
          >
            <Input placeholder="请输入你的电子邮箱" />
          </Form.Item>
          {/* 简介 */}
          <Form.Item name="intro" label="个人简介" rules={[]}>
            <Input.TextArea
              showCount
              maxLength={100}
              placeholder="请简单的介绍下个人情况！"
            />
          </Form.Item>
          {/* 验证码 */}
          {/* <Form.Item label="验证码" >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: '请输入验证码!',
                },
                {
                  type:'string',
                  len:4,
                  message:'请输入四位验证码！'
                }
              ]}
            >
              <Input placeholder='请输入你的验证码'/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>获取验证码</Button>
          </Col>
        </Row>
      </Form.Item> */}
          <Form.Item label="验证码">
            <Row gutter={9}>
              <Col span={15}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "请输入验证码!",
                    },
                    {
                      type: "string",
                      len: 4,
                      message: "请输入四位验证码！",
                    },
                  ]}
                >
                  <Input placeholder="请输入你的验证码" />
                </Form.Item>
              </Col>
              <Col span={9}>
                {el === "" ? (
                  <Button onClick={getCheck}>获取验证码</Button>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: el }}
                    style={{
                      width: 100,
                      height: 32,
                      border: "1px solid black",
                    }}
                    onClick={getCheck}
                  />
                )}
              </Col>
            </Row>
          </Form.Item>

          {/* 协议 */}
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("只有同意该协议才能正常注册账号！")
                      ),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              我已阅读并同意 <a href="">《注册协议》</a>
            </Checkbox>
          </Form.Item>
          {/* 注册按钮 */}
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              立即注册
            </Button>
          </Form.Item>
        </Form>
        {/*  */}
      </div>
    </div>
  )
}
