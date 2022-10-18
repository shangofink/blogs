import "./resume.less"
import { UploadOutlined } from "@ant-design/icons"
import { Button, message, Upload } from "antd"
export default function Resume() {
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList)
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  return (
    <div className="Resume">
      <div className="resume-top">
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>简历管理</span>
        <div>
          <span>仅支持pdf格式，文件大小需小于10M</span>
          {/* <Upload {...props}>
            <Button className='up-btn' icon={<UploadOutlined />}>上传简历</Button>
          </Upload> */}
          <Button
            className="up-btn"
            icon={<UploadOutlined />}
            onClick={() => message.info("功能暂未开放！敬请期待！")}
          >
            上传简历
          </Button>
        </div>
      </div>
      <div className="resume-main"></div>
    </div>
  )
}
