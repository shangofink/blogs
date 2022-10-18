import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import React from "react"
import "./vive2.less"
export default function Loading2() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 30,
      }}
      spin
    />
  )
  return (
    <div className="vive">
      <Spin indicator={antIcon} />
    </div>
  )
}
