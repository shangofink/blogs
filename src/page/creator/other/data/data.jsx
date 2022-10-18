import { Button } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { getoldtimestring } from "../../../../utils/gettime"
import "./data.less"
export default function Data() {
  const [btn, setBtn] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const el = (
    <div className="data-top">
      <div>
        <Button
          className={"btn" + (btn === "article" ? " sel" : "")}
          onClick={() => btnClick("article")}
        >
          文章数据
        </Button>
        <Button
          className={"btn" + (btn === "column" ? " sel" : "")}
          onClick={() => btnClick("column")}
        >
          专栏数据
        </Button>
        <Button
          className={"btn" + (btn === "pin" ? " sel" : "")}
          onClick={() => btnClick("pin")}
        >
          沸点数据
        </Button>
      </div>
      <span style={{ color: "rgb(153, 148, 148)" }}>
        最后 {getoldtimestring()} 的数据表现
      </span>
    </div>
  )
  const el2 = (
    <div className="data-top">
      <div>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>专栏总览</span>
      </div>
      <span style={{ color: "rgb(153, 148, 148)" }}>
        最后 {getoldtimestring()} 的数据表现
      </span>
    </div>
  )
  useEffect(() => {
    if (location.pathname.match("article") && btn !== "article")
      setBtn("article")
    else if (location.pathname.match("column") && btn !== "column")
      setBtn("column")
    else if (location.pathname.match("pin") && btn !== "pin") setBtn("pin")
  }, [location.pathname, btn])
  function btnClick(n) {
    switch (n) {
      case "article":
        if (btn !== "article") navigate("/creator/data/content/article")
        break
      case "column":
        if (btn !== "column") navigate("/creator/data/content/column")
        break
      case "pin":
        if (btn !== "pin") navigate("/creator/data/content/pin")
        break
      default:
        break
    }
  }
  return (
    <div className="Data">
      {location.pathname.match("follow") ? el2 : el}
      <div className="data-main">
        <Outlet />
      </div>
    </div>
  )
}
