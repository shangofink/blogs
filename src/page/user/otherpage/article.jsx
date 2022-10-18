import { Table, Tag, message, Space, Button } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getuserarticle } from "../../../api/user"
import { timechange } from "../../../utils/gettime"
import "./pulice.less"
export default function Article() {
  const [al, setal] = useState([])
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
      title: "precisetype",
      dataIndex: "precisetype",
      key: "precisetype",
      align: "center",
      width: "80px",
      render: (precisetype) => <Tag color="geekblue">{precisetype}</Tag>,
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
          <a onClick={() => navigate(`/exhibition?id=${record.articleid}`)}>
            查看
          </a>
        </Space>
      ),
    },
  ]
  // 申请数据
  useEffect(() => {
    if (al.length === 0) {
      let resdata = getuserarticle({ num: 0, number: 3 })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setal(res.data)
          } else {
            message.error(res.message)
          }
        })
      }
    }
  }, [al])
  // 申请更多数据
  function aladd() {
    let resdata = getuserarticle({ num: al.length, number: 5 })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setal(al.concat(res.data))
        } else {
          message.error(res.message)
        }
      })
    }
  }
  return (
    <div className="table article">
      <Table
        rowKey={(record) => record.articleid}
        columns={columns}
        showHeader={false}
        dataSource={al}
        bordered={false}
        pagination={false}
      />
      {al.length < 3 || (al.length - 3) % 5 !== 0 ? (
        ""
      ) : (
        <Button className="tablebtn" onClick={() => aladd()}>
          加载更多
        </Button>
      )}
    </div>
  )
}
