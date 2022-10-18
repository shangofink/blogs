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
import { useState, useEffect } from "react"
import { Button, Input, message, Modal, Select } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { editpost2, draftpost2, editchange } from "../../api/edit/edit"
import { gettime } from "../../utils/gettime"
import getsearch from "../../utils/getsearch"
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
export default function Editchange() {
  const navigate = useNavigate()
  const location = useLocation()
  const [value, setValue] = useState("")
  const [title, settitle] = useState("")
  const [openone, setopenone] = useState(false)
  const [opentwo, setopentwo] = useState(false)
  const [openthree, setopenthree] = useState(false)

  const [type, settype] = useState("type")
  const [cities, setCities] = useState(cityData[provinceData[0]])
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0])
  useEffect(() => {
    let search = getsearch(location.search)
    if (search !== "") {
      //跳转 修改 id 方式 向草稿箱申请数据
      let resdata = editchange({ articleid: search.id })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setValue(res.data.content)
            settitle(res.data.title)
            settype(res.data.type === null ? "type" : res.data.type)
            setCities(
              res.data.type === null
                ? cityData[provinceData[0]]
                : cityData[res.data.type] //
            )
            setSecondCity(
              res.data.precisetype === null
                ? cityData[provinceData[0]][0]
                : res.data.precisetype
            )
          } else {
            message.error("申请数据出错！准备跳转首页")
            setTimeout(
              () => navigate("/home?type=synthesize&type2=all&type3=like"),
              1000
            )
          }
        })
      }
    } else {
      message.error("缺少标识！准备跳转首页")
      setTimeout(
        () => navigate("/home?type=synthesize&type2=all&type3=like"),
        1000
      )
    }
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
    obj["articleid"] = getsearch(location.search).id
    let resdata = editpost2(obj)
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
    obj["type"] = type
    obj["precisetype"] = secondCity
    obj["articleid"] = getsearch(location.search).id
    let resdata = draftpost2(obj)
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
  const handleOkthree = () => {
    navigate(-1)
  }
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
        setopenthree(true)
      }
    }
  }
  const handleProvinceChange = (value) => {
    settype(value)
    setCities(cityData[value])
    setSecondCity(cityData[value][0])
  }
  const el = (
    <>
      <Select
        // defaultValue={type}
        value={type}
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
        onChange={(value) => setSecondCity(value)}
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
          value={title === "" ? undefined : title}
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
        visible={opentwo}
        onOk={handleOktwo}
        onCancel={() => setopentwo(false)}
        cancelText="取消"
        okText="确认保存"
      >
        <div>
          <p>是否将修改继续保存在草稿箱？</p>
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
          <p>注意！退出将不保留任何修改！</p>
        </div>
      </Modal>
    </div>
  )
}
