import { Form, Input, Button, Upload, message, Select } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { useEffect } from "react"
import { useState } from "react"
import "./profile.less"
import { getuserperson, postuserperson } from "../../../../../api/user"
import { imgupload } from "../../../../../api/imgurl"
import { gettime } from "../../../../../utils/gettime"
import { doDecrypt, doEncrypt } from "../../../../../utils/sm/sm2"
const { Option } = Select
function Profile(props) {
  // 用户数据
  const location = localStorage.getItem("token")
  const [data, setdata] = useState({})
  const [form] = Form.useForm()
  const [imgurl, setimgurl] = useState(localStorage.getItem("imgurl"))
  const [filedata, setfd] = useState(undefined)
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      getuserperson("").then((res) => {
        if (res.msg) {
          let resdata = doDecrypt(res.data)
          setdata(resdata[0])
          form.setFieldsValue(resdata[0])
        } else {
          message.error("未知错误")
        }
      })
    }
    if (filedata !== undefined) {
      var fr = new FileReader()
      fr.readAsDataURL(filedata)
      fr.onload = function (e) {
        setimgurl(e.target.result)
      }
    }
  }, [data, filedata, form])
  function onFinish(values) {
    let fmdata = JSON.parse(JSON.stringify(values))
    if (fmdata["type"] === undefined) {
      fmdata["type"] = null
    }
    postuserperson(doEncrypt(fmdata)).then((res) => {
      if (res.msg) {
        message.info("修改成功")
        setbtn("btn")
      }
    })
  }
  const [btn, setbtn] = useState("btn")
  function onValuesChange() {
    if (JSON.stringify(data) !== JSON.stringify(form.getFieldValue())) {
      setbtn("")
    } else {
      setbtn("btn")
    }
  }
  function reset() {
    form.resetFields()
    setbtn("btn")
  }
  // 加解密
  // const getBase64 = (img, callback) => {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // };
  // 图片上传前
  function beforeUpload(file) {
    if (
      !(
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      )
    ) {
      message.error("You can only upload JPG/PNG/JPG file!")
      return false
    }
    if (!(file.size / 1024 / 1024 < 5)) {
      message.error("Image must smaller than 5MB!")
      return false
    }
    setfd(file)
    return false
  }
  function handleChange(info) {}
  function btnimg(n) {
    if (n === 0) {
      // 上传
      const formData = new FormData()
      formData.append("file", filedata)
      let resdata = imgupload(formData)
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            localStorage.setItem("imgurl", res.imgurl)
            message.info("修改成功！")
            setfd(undefined)
            props.props.setimgurl(res.imgurl + `?${gettime()}`)
          }
        })
      }
    } else {
      // 返回
      setfd(undefined)
      setimgurl(localStorage.getItem("imgurl"))
    }
  }

  return (
    <div className="Profile">
      <div className="profile-left">
        <span className="userdata">个人资料</span>
        <Form
          className="profile-from"
          form={form}
          initialValues={data}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            label="用户名称"
            name="name"
            rules={[{ min: 3, max: 5, message: "用户名必须为3~5位" }]}
          >
            <Input showCount maxLength={20} placeholder={data.name} />
          </Form.Item>

          <Form.Item name="type" label="个人类型">
            <Select placeholder="选择你的个人类型方向" allowClear>
              <Option value="Backend">Backend</Option>
              <Option value="Frontend">Frontend</Option>
              <Option value="Android">Android</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="个人职位"
            name="job"
            rules={[{ max: 50, message: "请填写你的职位" }]}
          >
            <Input showCount maxLength={50} placeholder="请填写你的职位" />
          </Form.Item>
          <Form.Item
            label="就职公司"
            name="company"
            rules={[{ max: 50, message: "请填写你的公司" }]}
          >
            <Input showCount maxLength={50} placeholder="请填写你的公司" />
          </Form.Item>
          <Form.Item
            label="个人主页"
            name="page"
            rules={[{ max: 100, message: "请填写你的个人主页" }]}
          >
            <Input showCount maxLength={100} placeholder="请填写你的个人主页" />
          </Form.Item>
          <Form.Item
            label="个人简介"
            name="intro"
            rules={[{ max: 100, message: "请填写你的个人简介" }]}
          >
            <TextArea
              rows={5}
              showCount
              maxLength={100}
              placeholder="请填写你的个人简介"
            />
          </Form.Item>
          <Form.Item className="profile-form-btn">
            <Button className={btn} type="primary" htmlType="submit">
              保存修改
            </Button>
            <span style={{ display: "inline-block", width: "100px" }}></span>
            <Button
              className={btn}
              type="primary"
              htmlType="button"
              onClick={reset}
            >
              立即重置
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="profile-right">
        <Upload
          name="file"
          listType="picture"
          className="avatar-uploader"
          showUploadList={false}
          action="http://localhost:3100/imgurl/uploadImage"
          beforeUpload={beforeUpload}
          onChange={handleChange}
          headers={{
            token: location,
          }}
        >
          <img src={imgurl} alt="avatar"></img>
        </Upload>
        <p style={{ fontWeight: "bold" }}>我 的 头 像</p>
        {filedata === undefined ? (
          ""
        ) : (
          <>
            <Button type="primary" className="btnimg" onClick={() => btnimg(0)}>
              保存
            </Button>
            <Button type="primary" className="btnimg" onClick={() => btnimg(1)}>
              取消
            </Button>
          </>
        )}
        <p style={{ width: "150px" }}>
          支持 jpg、png、jpeg 格式大小 5M 以内的图片
        </p>
      </div>
    </div>
  )
}
export default Profile
