import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"
export default function Error() {
  const navigate = useNavigate()
  return (
    <Result
      style={{ width: "100vw", height: "90vh" }}
      status="500"
      // title="500"
      subTitle="抱歉，服务器发生错误！"
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
