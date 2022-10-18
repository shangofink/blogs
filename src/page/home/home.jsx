import { Button, message, Tag } from "antd"
import { useState } from "react"
import "./home.less"
import HomeMain from "./main/main"
import { ScheduleTwoTone, FundTwoTone } from "@ant-design/icons"
import { useEffect } from "react"
import { getauthor } from "../../api/author"
import { useLocation, useNavigate } from "react-router-dom"
import getsearch from "../../utils/getsearch.js"
import { homegetHours } from "../../utils/gettime"
// 首页展示
function Home(props) {
  const location = useLocation()
  const navigate = useNavigate()
  // 第一级选择
  const [btn, setBtn] = useState(
    getsearch(location.search).type === undefined
      ? "synthesize"
      : getsearch(location.search).type
  )
  function btnclick(n) {
    if (btn !== n) {
      setBtn2("all")
      setBtn(n)
    }
  }
  //  第二级选择
  const data2 = {
    backend: {
      all: "全部",
      java: "java",
      algorithm: "算法",
      python: "Python",
      go: "GO",
      leetcoode: "LeetCode",
      architecture: "架构",
      springboot: "Spring Boot",
      basedata: "数据库",
    },
    frontend: {
      all: "全部",
      javascript: "JavaScript",
      vue: "Vue.js",
      react: "React.js",
      css: "CSS",
      html: "HTML",
      typescript: "TypeScript",
      architecture: "架构",
      algorithm: "算法",
    },
    android: {
      all: "全部",
      android: "Android",
      flutter: "Flutter",
      andrioidjetpack: "Android Jetpack",
      frontend: "前端",
      kotlin: "Kotlin",
      java: "java",
      app: "APP",
      game: "游戏",
      architecture: "架构",
    },
  }
  const [btn2, setBtn2] = useState(
    getsearch(location.search).type2 === undefined
      ? "all"
      : getsearch(location.search).type2
  )
  const el = (
    <div className="HomeMenu">
      <ul className="menu-ul">
        {Object.keys(data2).map((item, index) => {
          if (item === btn) {
            return (
              <div style={{ display: "flex" }} key={index}>
                {Object.keys(data2[item]).map((items, indexs) => {
                  return (
                    <li key={indexs}>
                      {" "}
                      <Button
                        className={"btn" + (btn2 === items ? " sel" : "")}
                        onClick={() => btn2click(items)}
                      >
                        {data2[item][items]}
                      </Button>
                    </li>
                  )
                })}
              </div>
            )
          } else {
            return ""
          }
        })}
      </ul>
    </div>
  )
  function btn2click(n) {
    if (btn2 !== n) {
      setMainSel("like")
      setBtn2(n)
    }
  }
  // 第三级选择
  const [mainsel, setMainSel] = useState(
    getsearch(location.search).type3 === undefined
      ? "like"
      : getsearch(location.search).type3
  )
  function mainbtn(n) {
    if (mainsel !== n) {
      setMainSel(n)
    }
  }
  // 申请者热榜数据
  const [author, setauthor] = useState([])
  useEffect(() => {
    if (author.length === 0) {
      let resdata = getauthor("")
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setauthor(res.data) //uuid,name,imgurl,level,type,
          } else {
            message.error("作者热榜数据获取错误！")
          }
        })
      }
    }
  })
  // 监听选择 响应条件跳转
  useEffect(() => {
    let data = getsearch(location.search)
    if (btn !== data.type || btn2 !== data.type2 || mainsel !== data.type3) {
      navigate(`/home?type=${btn}&type2=${btn2}&type3=${mainsel}`)
    }
  }, [btn, btn2, mainsel])
  return (
    <div className="Home">
      <div className="top-list">
        <Button
          className={"btn" + (btn === "synthesize" ? " sel" : "")}
          onClick={() => btnclick("synthesize")}
        >
          综合
        </Button>
        <Button
          className={"btn" + (btn === "backend" ? " sel" : "")}
          onClick={() => btnclick("backend")}
        >
          后端
        </Button>
        <Button
          className={"btn" + (btn === "frontend" ? " sel" : "")}
          onClick={() => btnclick("frontend")}
        >
          前端
        </Button>
        <Button
          className={"btn" + (btn === "android" ? " sel" : "")}
          onClick={() => btnclick("android")}
        >
          Android
        </Button>
        <Button
          className={"btn" + (btn === "ios" ? " sel" : "")}
          onClick={() => btnclick("ios")}
        >
          ios
        </Button>
        <Button
          className={"btn" + (btn === "人工智能" ? " sel" : "")}
          onClick={() => btnclick("人工智能")}
        >
          人工智能
        </Button>
        <Button
          className={"btn" + (btn === "开发工具" ? " sel" : "")}
          onClick={() => btnclick("开发工具")}
        >
          开发工具
        </Button>
        <Button
          className={"btn" + (btn === "代码人生" ? " sel" : "")}
          onClick={() => btnclick("代码人生")}
        >
          代码人生
        </Button>
        <Button
          className={"btn" + (btn === "阅读" ? " sel" : "")}
          onClick={() => btnclick("阅读")}
        >
          阅读
        </Button>
      </div>
      <div className="main">
        {/* 细致划分 */}
        {btn !== "synthesize" ? el : ""}
        {/*   左侧  */}
        <div className="left">
          <div className="top-sel">
            <Button
              className={
                "top-sel-btn" + (mainsel === "like" ? " main-btn-sel" : "")
              }
              onClick={() => mainbtn("like")}
            >
              推荐
            </Button>
            <Button
              className={
                "top-sel-btn" + (mainsel === "time" ? " main-btn-sel" : "")
              }
              onClick={() => mainbtn("time")}
            >
              最新
            </Button>
            <Button
              className={
                "top-sel-btn" + (mainsel === "read" ? " main-btn-sel" : "")
              }
              onClick={() => mainbtn("read")}
            >
              热榜
            </Button>
          </div>
          <div className="bottom-main">
            <HomeMain></HomeMain>
          </div>
        </div>
        {/* 右侧 */}
        <div className="right">
          <div className="right-top">
            <ScheduleTwoTone
              style={{ fontSize: "50px", color: "#08c", margin: 0 }}
            />
            <div className="main-contant">
              <p>{homegetHours()}</p>
              <p>期待你的每一天</p>
            </div>
            <Button
              className="btn"
              onClick={() => message.info("功能暂未开放！敬请期待！")}
            >
              签到
            </Button>
          </div>
          <div className="right-hot">
            <div className="right-hot-top">
              <FundTwoTone style={{ fontSize: "20px" }} /> <span>作者榜</span>
            </div>
            <div className="right-hot-main">
              <ul>
                {author.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => navigate(`/usershow?id=${item.uuid}`)}
                    >
                      <img className="hot-img" src={item.imgurl} alt="1" />
                      <div>
                        <span>{item.name}</span>
                        <span>LV {item.level}</span>
                        <p>
                          类型：
                          {item.type === null ? (
                            "暂无"
                          ) : (
                            <Tag color="blue">{item.type}</Tag>
                          )}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className="hot-main-bottom">
                <Button
                  className="hot-btn"
                  onClick={() => navigate("/authors?type=recommend")}
                >
                  完整榜单 {">"}
                </Button>
              </div>
            </div>
          </div>
          <div className="right-bottom">
            <div
              className="right-bottom-a"
              onClick={() => {
                message.info("暂未正常设置！遇到问题请使用右下角反馈提交！")
              }}
            >
              <a>
                <span>用户协议</span>
              </a>
              <a>
                <span>隐私政策</span>
              </a>
              <a>
                <span>关于我们</span>
              </a>
              <a>
                <span>友情链接</span>
              </a>
              <a>
                <span>京ICP备xxxxxxx</span>
              </a>
              <a>
                <span>京公网安备xxxxx号</span>
              </a>
            </div>

            <p>版权所有：xxxxxxxxxxxxx</p>
            <p>公司地址：xxxxxxxxxxxxxxxxxxxxx</p>
            <p>公司座机：xxxxxxxxxxxxxxx</p>
            <p>举报邮箱： xxxxxxxxxx</p>
            <p>©2022 xxxxxxxxxxx</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
