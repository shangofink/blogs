import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import React from "react"
import "./vive.less"
export default function Loading() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 30,
      }}
      spin
    />
  )
  return (
    <div className="allvive">
      <Spin indicator={antIcon} />
    </div>
  )
}
