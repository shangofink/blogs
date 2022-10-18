import { Table, Tag, message, Space, Button, Spin } from "antd"
import { useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getusershowarticle } from "../../../api/usershow"
import { timechange } from "../../../utils/gettime"
export default function UserArticle(props) {
  const navigate = useNavigate()
  const [data, setdata] = useState([])
  const [state, setstate] = useState(false)
  useLayoutEffect(() => {
    let resdata = getusershowarticle({ uuid: props.uuid, num: 0, number: 2 })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setdata(res.data)
          setTimeout(() => {
            setstate(true)
          }, 200)
        } else {
          message.error(res.message)
        }
      })
    }
  }, [])
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
  function aladd() {
    let resdata = getusershowarticle({
      uuid: props.uuid,
      num: data.length,
      number: 5,
    })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setdata(data.concat(res.data))
        } else {
          message.error(res.message)
        }
      })
    }
  }
  return state ? (
    <div className="usershow-article">
      <Table
        rowKey={(record) => record.articleid}
        columns={columns}
        showHeader={false}
        dataSource={data}
        bordered={false}
        pagination={false}
      />
      {data.length < 2 || (data.length - 2) % 5 !== 0 ? (
        <Button className="tablebtn">已加载全部数据</Button>
      ) : (
        <Button className="tablebtn" onClick={() => aladd()}>
          加载更多
        </Button>
      )}
    </div>
  ) : (
    <div className="spin">
      <Spin />
    </div>
  )
}
