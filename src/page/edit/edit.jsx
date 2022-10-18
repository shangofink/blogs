// 编辑 / 视图
import "./edit.less"
import { Editor } from "@bytemd/react"
import gfm from "@bytemd/plugin-gfm"
import highlight from "@bytemd/plugin-highlight-ssr"
import mediumZoom from "@bytemd/plugin-medium-zoom"
import gemoji from "@bytemd/plugin-gemoji"
import zhHans from "bytemd/lib/locales/zh_Hans.json" // 引入中文包
import "bytemd/dist/index.min.css" // 引入基础css
import "juejin-markdown-themes/dist/juejin.min.css" // 掘金同款样式
import { useEffect, useState } from "react"
import { Button, Input, message, Modal, Select } from "antd"
import { useNavigate } from "react-router-dom"
import { editpost, draftpost } from "../../api/edit/edit"
import { gettime } from "../../utils/gettime"

const plugins = [gfm(), gemoji(), highlight(), mediumZoom()]
const { Option } = Select
const provinceData = ["type", "backend", "frontend", "android"]
const cityData = {
  type: ["precisetype"],
  backend: [
    "java",
    "algorithm",
    "python",
    "go",
    "leetcoode",
    "architecture",
    "springboot",
    "basedata",
  ],
  frontend: [
    "javascript",
    "vue",
    "react",
    "css",
    "html",
    "typescript",
    "architecture",
    "algorithm",
  ],
  android: [
    "android",
    "flutter",
    "andrioidjetpack",
    "frontend",
    "kotlin",
    "java",
    "app",
    "game",
    "architecture",
  ],
}
export default function Edit2() {
  const navigate = useNavigate()
  const [value, setValue] = useState("")
  const [title, settitle] = useState("")

  const [openone, setopenone] = useState(false)
  const [opentwo, setopentwo] = useState(false)
  // const [openthree, setopenthree] = useState(false)  // 退出弹窗

  // 监听页面关闭
  useEffect(() => {
    window.onbeforeunload = function (e) {
      e.preventDefault()
      e.returnValue = ""
    }
    return () => {
      window.removeEventListener("onbeforeunload")
    }
  }, [])
  const handleOkone = () => {
    let obj = {}
    obj["title"] = title
    obj["value"] = value
    obj["time"] = gettime()
    obj["type"] = type
    obj["precisetype"] = secondCity
    let resdata = editpost(obj)
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setopenone(false)
          setValue("")
          settitle("")
          message.info("发布成功！2s秒后返回创作中心！")
          setTimeout(() => {
            navigate("/creator/home?type=time")
          }, 1500)
        } else {
          setopenone(false)
          message.error(res.message)
        }
      })
    }
  }
  const handleOktwo = () => {
    let obj = {}
    obj["title"] = title
    obj["value"] = value
    obj["time"] = gettime()
    obj["type"] = type === "type" ? undefined : type
    obj["precisetype"] = secondCity === "precisetype" ? undefined : secondCity
    let resdata = draftpost(obj)
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setopenone(false)
          setValue("")
          settitle("")
          message.info("保存成功！2s秒后返回创作中心！")
          setTimeout(() => {
            navigate("/creator/content/article?type=draft")
          }, 1500)
        } else {
          setopenone(false)
          message.error(res.message)
        }
      })
    }
  }
  // const handleOkthree = () => {
  //   navigate(-1, { replace: false })
  // }

  function btn(n) {
    if (n === 0) {
      if (title === "" || value === "") {
        message.warn("标题、内容不能为空！")
      } else {
        if (type === "type") {
          message.warn("请选择标签和类别！")
        } else {
          setopenone(true)
        }
      }
    } else if (n === 1) {
      if (title === "") {
        message.warn("标题不能为空！")
      } else {
        setopentwo(true)
      }
    } else if (n === 2) {
      if (title === "" && value === "") navigate(-1)
      else {
        // setopenthree(true)
        navigate(-1, { replace: false })
      }
    }
  }
  const [type, settype] = useState("type")
  const [cities, setCities] = useState(cityData[provinceData[0]])
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0])
  const handleProvinceChange = (value) => {
    settype(value)
    setCities(cityData[value])
    setSecondCity(cityData[value][0])
  }
  const onSecondCityChange = (value) => {
    setSecondCity(value)
  }
  const el = (
    <>
      <Select
        defaultValue={provinceData[0]}
        style={{
          width: 120,
          marginLeft: 10,
        }}
        onChange={handleProvinceChange}
      >
        {provinceData.map((province) => (
          <Option key={province}>{province}</Option>
        ))}
      </Select>
      <Select
        style={{
          width: 120,
          marginLeft: 10,
        }}
        value={secondCity}
        onChange={onSecondCityChange}
      >
        {cities.map((city) => (
          <Option key={city}>{city}</Option>
        ))}
      </Select>
    </>
  )
  return (
    <div className="edit">
      <div className="edit-top">
        <Input
          value={title}
          bordered={false}
          maxLength={30}
          size="large"
          showCount
          placeholder="请输入文章标题..."
          onChange={(e) => settitle(e.target.value)}
        ></Input>
        <div className="type">
          <span
            title="标签"
            className="iconfont icon-biaoqian1"
            style={{ color: "rgb(48, 121, 190)", fontSize: 20 }}
          ></span>
          {el}
        </div>
        <div className="right">
          <Button
            className="topbtn"
            type="primary"
            shape="round"
            onClick={() => btn(0)}
          >
            发布文章
          </Button>
          <Button
            className="topbtn"
            type="primary"
            shape="round"
            onClick={() => btn(1)}
          >
            存草稿
          </Button>
          <Button
            className="topbtn"
            type="primary"
            shape="round"
            onClick={() => btn(2)}
          >
            退出编辑
          </Button>
          <img src={localStorage.getItem("imgurl")} alt="" />
        </div>
      </div>
      <div className="page-wrap">
        <Editor
          className="ed"
          highlight
          // 语言
          locale={zhHans}
          // 内部的值
          value={value}
          // 插件
          plugins={plugins}
          // 动态修改值
          onChange={(v) => setValue(v)}
        />
      </div>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
          >
            发布文章
          </div>
        }
        open={openone}
        onOk={handleOkone}
        onCancel={() => setopenone(false)}
        cancelText="取消"
        okText="确认发布"
      >
        <div>
          <p>是否确认发布文章？</p>
        </div>
      </Modal>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
          >
            保存草稿箱
          </div>
        }
        open={opentwo}
        onOk={handleOktwo}
        onCancel={() => setopentwo(false)}
        cancelText="取消"
        okText="确认保存"
      >
        <div>
          <p>是否将文章保存在草稿箱？</p>
        </div>
      </Modal>
      {/* <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
          >
            退出编辑
          </div>
        }
        open={openthree}
        onOk={handleOkthree}
        onCancel={() => setopenthree(false)}
        cancelText="取消"
        okText="确认退出"
      >
        <div>
          <p>注意！退出编辑将清空所有数据！</p>
        </div>
      </Modal> */}
    </div>
  )
}
