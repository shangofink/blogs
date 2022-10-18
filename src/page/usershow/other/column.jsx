import { useEffect, useLayoutEffect, useState } from "react"
import { Table, Tag, Space, message, Button, Spin, Modal, Divider } from "antd"
import { useNavigate } from "react-router-dom"
import { timechange } from "../../../utils/gettime"
import { getusershowcolumn } from "../../../api/usershow"
import { getusershowcolumndata } from "../../../api/usershow"
import "./pulice.less"
export default function UserColumn(props) {
  const navigate = useNavigate()
  const [state, setstate] = useState(false)
  const [data, setdata] = useState([])
  // 详情弹窗
  const [particular, setparticular] = useState(false)
  const [title, settitle] = useState(undefined)
  const particularcolumns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "articleid",
      align: "left",
      render: (text) => <h3>{text}</h3>,
    },
    {
      title: "type",
      key: "type",
      align: "center",
      dataIndex: "type",
      width: "15%",
      render: (type) => (
        <Tag color="blue" key={type}>
          {type}
        </Tag>
      ),
    },
    {
      title: "precisetype",
      key: "precisetype",
      align: "center",
      width: "15%",
      dataIndex: "precisetype",
      render: (precisetype) => (
        <Tag color="blue" key={precisetype}>
          {precisetype}
        </Tag>
      ),
    },
  ]
  // 弹窗数据
  const [particulardata, setparticulardata] = useState([])
  // 处理表格点击事件
  function particularbtn(record) {
    // 申请数据
    let resdata = getusershowcolumndata({
      uuid: props.uuid,
      columnid: record.columnid,
    })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          settitle(record.title)
          setparticulardata(res.data)
          setparticular(true)
        } else {
          message.error(res.message)
        }
      })
    }
  }
  // 弹窗表格配置
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
      render: (record) => (
        <Space size="middle">
          <a onClick={() => particularbtn(record)}>详情</a>
        </Space>
      ),
    },
  ]
  // 弹窗关闭，清空数据
  useEffect(() => {
    if (!particular) {
      setparticulardata({})
    }
  }, [particular])

  // 申请初始数据
  useLayoutEffect(() => {
    let resdata = getusershowcolumn({ uuid: props.uuid, num: 0, number: 3 })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setdata(res.data)
          setTimeout(() => {
            setstate(true)
          }, 300)
        } else {
          message.error(res.message)
        }
      })
    }
  }, [])
  // 申请更多数据
  function aladd() {
    let resdata = getusershowcolumn({
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
    <div className="usershow-column">
      <Table
        className="table colum"
        rowKey={(record) => record.columnid}
        columns={columns}
        showHeader={false}
        dataSource={data}
        bordered={false}
        pagination={false}
      />
      {data.length < 3 || (data.length - 3) % 5 !== 0 ? (
        ""
      ) : (
        <Button className="tablebtn" onClick={() => aladd()}>
          加载更多
        </Button>
      )}
      {/* 详情弹出 */}
      <Modal
        className="particular-modal"
        title={
          <Divider orientation="center">
            <h2>{title}</h2>
          </Divider>
        }
        open={particular}
        onCancel={() => setparticular(false)}
        destroyOnClose={true}
        footer={null}
        closable={false}
      >
        <Table
          className="particular-table"
          columns={particularcolumns}
          bordered={false}
          showHeader={false}
          dataSource={particulardata}
          pagination={false}
          scroll={
            document.body.clientHeight * 0.8 >
            Object.keys(particulardata).length * 65
              ? false
              : { y: "60vh" }
          }
          onRow={(record) => {
            return {
              onClick: (event) => {
                navigate(`/exhibition?id=${record.articleid}`)
              },
            }
          }}
        />
      </Modal>
    </div>
  ) : (
    <div className="spin">
      <Spin />
    </div>
  )
}
