import { Table, Tag, message, Space, Button } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getuserread } from "../../../api/user"
import { timechange } from "../../../utils/gettime"
export default function Pin() {
  const [pin, setpin] = useState([])
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
      render: (_, { tags }) => <Tag color="blue">{tags}</Tag>,
    },
    {
      title: "precisetype",
      dataIndex: "precisetype",
      key: "precisetype",
      align: "center",
      width: "80px",
      render: (_, { tags }) => <Tag color="geekblue">{tags}</Tag>,
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
    if (pin === null) {
      let resdata = getuserread({ num: 0, number: 4 })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setpin(res.data)
          } else {
            message.error(res.message)
          }
        })
      }
    }
  }, [pin])
  // 申请更多数据
  function pinadd() {
    let resdata = getuserread({ num: pin.length, number: 5 })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setpin(pin.concat(res.data))
        } else {
          message.error(res.message)
        }
      })
    }
  }
  return (
    <>
      <Table
        className="table pin"
        rowKey={(record) => record.articleid}
        columns={columns}
        showHeader={false}
        dataSource={pin}
        bordered={false}
        pagination={false}
      />
      {pin.length < 4 || (pin.length - 4) % 5 !== 0 ? (
        ""
      ) : (
        <Button className="tablebtn" onClick={() => pinadd()}>
          加载更多
        </Button>
      )}
    </>
  )
}
