import "./nav.less"
import { Button } from "antd/lib/radio"
import "antd/dist/antd.min.css"
import Img from "../../img/logo512.png"
import { useState } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import Search from "antd/lib/input/Search"
import { Dropdown, Menu, Input, Select, message } from "antd"
const { Option } = Select
function Nav(props) {
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  const homeel = (
    <div className="list">
      <button
        className={"btn" + (index === 0 ? " btnclick" : "")}
        onClick={() => btn(0)}
      >
        首页
      </button>
    </div>
  )
  // 选择框与搜索框的值
  const [value, setvalue] = useState("article")
  const [hint, sethint] = useState("请输入文章标题")
  function selchange(value) {
    switch (value) {
      case "article":
        if (hint !== "请输入文章标题") {
          sethint("请输入文章标题")
        }
        break
      case "user":
        if (hint !== "请输入用户名") {
          sethint("请输入用户名")
        }
        break
      case "type":
        if (hint !== "请输入文章类型") {
          sethint("请输入文章类型")
        }
        break
    }
    setvalue(value)
  }
  function topsearch(searchvalue) {
    if (
      searchvalue === "" ||
      searchvalue === undefined ||
      searchvalue.length < 2 ||
      searchvalue.length > 10
    ) {
      message.warn("搜索内容不能为空并且不能少于两个字符或者超过10个字符！")
    } else {
      navigate(`/${value + "search"}?search=${searchvalue}`)
    }
  }
  const el = (
    <>
      <Select
        value={value}
        onChange={(value) => selchange(value)}
        className="select"
      >
        <Option value="article">文章</Option>
        <Option value="user">用户</Option>
        <Option value="type">类别</Option>
      </Select>
      <Search
        className="search"
        placeholder={hint}
        maxLength="10"
        onSearch={(value) => topsearch(value)}
        enterButton
      />

      <Button
        size="large"
        className="createbtn"
        onClick={() => navigate("/creator/home?type=time")}
      >
        创作中心
      </Button>
    </>
  )
  const creatorel = (
    <span style={{ color: "blue", fontSize: "18px" }}>创造者中心</span>
  )
  const menu = (
    <Menu
      style={{ width: "200px", textAlign: "center" }}
      items={[
        {
          key: "写文章",
          label: <Link to="/edit">写文章</Link>,
        },
        { type: "divider" },
        {
          key: "草稿箱",
          label: <Link to="/creator/content/article?type=draft">草稿箱</Link>,
        },
        { type: "divider" },
        {
          key: "个人中心",
          label: <Link to="/user?type=dynamic">个人中心</Link>,
        },
        { type: "divider" },
        {
          key: "3",
          label: <Link to="/creator/home?type=time">创作中心</Link>,
        },
        { type: "divider" },
        {
          key: "浏览记录",
          label: <Link to="/user?type=history">浏览记录</Link>,
        },
        { type: "divider" },
        {
          key: "我的收藏",
          label: <Link to="/user?type=collect">我的收藏</Link>,
        },
        { type: "divider" },
        {
          key: "退出登陆",
          label: <a onClick={() => menubtn()}>退出登陆</a>,
        },
        { type: "divider" },
      ]}
    />
  )
  function menubtn() {
    localStorage.clear()
    navigate("/login")
  }
  function btn(a) {
    switch (a) {
      case 0:
        setIndex(0)
        navigate("/home")
        break
      case 1:
        setIndex(1)
        break
      case 2:
        setIndex(2)
        break
      case 3:
        setIndex(3)
        break
      case 4:
        setIndex(4)
        break
      default:
    }
  }
  return (
    <div className="nav-top">
      <div className="left">
        <div className="logo">
          <a
            onClick={() =>
              navigate("/home?type=synthesize&type2=all&type3=like")
            }
          >
            <img src={Img} alt=""></img>
          </a>
        </div>
        {location.pathname.match("creator") ? creatorel : homeel}
      </div>

      <div className="right">
        {location.pathname.match("creator") ? "" : el}

        <Dropdown overlay={menu} placement="bottom" arrow="true">
          <img
            src={
              props.props.imgurl === undefined
                ? localStorage.getItem("imgurl")
                : props.props.imgurl
            }
            alt=""
            className="img"
          ></img>
        </Dropdown>

        {localStorage.getItem("token") === null ? (
          <Button
            size="large"
            className="login"
            onClick={() => navigate("/login")}
          >
            未登录
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
export default Nav
