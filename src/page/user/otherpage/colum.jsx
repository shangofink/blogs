import { Table, Tag, Space, message, Button } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getusercolum } from "../../../api/user"
import { timechange } from "../../../utils/gettime"
import "./pulice.less"
export default function Colum() {
  const [colum, setcolum] = useState([])
  const navigate = useNavigate()
  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: "200px",
      render: (text) => <h3>{text}</h3>,
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: "80px",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "文章数",
      dataIndex: "number",
      key: "number",
      align: "center",
      width: "80px",
      render: (number) => <>{number} 篇</>,
    },
    {
      title: "time",
      dataIndex: "time",
      key: "time",
      align: "center",
      width: "150px",
      render: (text) => timechange(text),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: "180px",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/creator/content/column`)}>查看</a>
        </Space>
      ),
    },
  ]
  // 申请数据
  useEffect(() => {
    if (colum.length === 0) {
      let resdata = getusercolum({ num: 0, number: 4 })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setcolum(res.data)
          } else {
            message.error(res.message)
          }
        })
      }
    }
  }, [colum])
  // 申请更多数据
  function aladd() {
    let resdata = getusercolum({ num: colum.length, number: 5 })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setcolum(colum.concat(res.data))
        } else {
          message.error(res.message)
        }
      })
    }
  }
  return (
    <>
      <Table
        className="table colum"
        rowKey={(record) => record.columnid}
        columns={columns}
        showHeader={false}
        dataSource={colum}
        bordered={false}
        pagination={false}
      />
      {colum.length < 4 || (colum.length - 4) % 5 !== 0 ? (
        ""
      ) : (
        <Button className="tablebtn" onClick={() => aladd()}>
          加载更多
        </Button>
      )}
    </>
  )
}
