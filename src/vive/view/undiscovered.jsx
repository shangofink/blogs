import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

export default function Undiscovered() {
  const navigate = useNavigate()
  return (
    <Result
      style={{ width: "100vw", height: "90vh" }}
      status="404"
      // title="500"
      subTitle="抱歉，请求的页面不存在！"
      extra={
        <Button
          type="primary"
          style={{ borderRadius: 5 }}
          onClick={() => navigate("/home", { replace: false })}
        >
          返回 首页
        </Button>
      }
    />
  )
}
