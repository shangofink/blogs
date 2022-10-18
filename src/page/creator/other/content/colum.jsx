import {
  Button,
  message,
  Space,
  Table,
  Popconfirm,
  Modal,
  Radio,
  Input,
  Tag,
  Transfer,
  Spin,
  Divider,
} from "antd"
import { useEffect, useState } from "react"
import "./colum.less"
import {
  getcreatorcontent,
  datadelete,
  postcolum,
  getdeletecolum,
  getcolumarticle,
  postchangecolum,
  getcolumparticular,
} from "../../../../api/creator"
import { gettime, timechange2 } from "../../../../utils/gettime"
import { useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function ContentColum() {
  const navigate = useNavigate()
  const [state, setstate] = useState(false)
  const [data, setdata] = useState([])
  const [current, setcurrent] = useState(1)
  useLayoutEffect(() => {
    if (data.length === 0) {
      let resdata = getcreatorcontent(
        { type: "time", num: 0 },
        "/creator/content/colum"
      )
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setdata(res.data)
            setTimeout(() => {
              setstate(true)
            }, 200)
          } else {
            message.error("未知错误")
          }
        })
      }
    }
  }, [data])
  function columndelete(record) {
    let resdata = datadelete({ type: "column", columnid: record.columnid })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setdata(data.filter((item) => item.columnid !== record.columnid))
          message.info("删除成功")
        } else {
          message.error("删除失败" + res.message)
        }
      })
    }
  }
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

  const [particulardata, setparticulardata] = useState({})
  useEffect(() => {
    if (!particular && Object.keys(particulardata).length !== 0) {
      setparticulardata({})
    }
  }, [particular])

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: "250px",
    },
    {
      title: "分类",
      key: "type",
      dataIndex: "type",
      align: "center",
      width: "200px",
      render: (type) => <Tag color={"blue"}>{type}</Tag>,
    },
    {
      title: "文章数",
      dataIndex: "number",
      key: "number",
      align: "center",
      width: "80px",
    },
    {
      title: "收藏数",
      dataIndex: "collected",
      key: "collected",
      align: "center",
      width: "80px",
    },
    {
      title: "创建时间",
      dataIndex: "time",
      key: "time",
      align: "center",
      render: (time) => <>{timechange2(time)}</>,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      width: "150px",
      render: (record) => {
        let data = record
        return (
          <Space size="middle">
            <a onClick={() => getparticulardata(record)}>详细</a>
            <a
              onClick={() =>
                tablebtn(0, record.columnid, record.title, record.type)
              }
            >
              修改
            </a>
            <Popconfirm
              title="你是否确认删除选中?"
              onConfirm={() => columndelete(data)}
              okText="确认删除"
              cancelText="取消"
            >
              <a
              // onClick={() =>
              //   tablebtn(1, record.columnid, record.title, record.type)
              // }
              >
                删除
              </a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  // 详情事件
  function getparticulardata(record) {
    let resdata = getcolumparticular({ columnid: record.columnid })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setparticular(true)
          settitle(record.title)
          setparticulardata(res.data)
        } else {
          setparticular(true)
          settitle(record.title)
        }
      })
    }
  }
  // 处理表格
  const [selid, setselid] = useState() //标识选中
  function tablebtn(n, columnid, title, type) {
    if (n === 0) {
      let resdata = getcolumarticle({ columnid: columnid }) //申请所有文章 已选文章 data:[[{all}],[{sel}]] id(key),title(title)
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setMockData(res.data[0])
            let arr = []
            for (let i in res.data[1]) {
              arr.push(res.data[1][i].articleid)
            }
            setinput2(title)
            setValue(type)
            setTargetKeys(arr)
            setselid(columnid)
            setchangeshow(true)
          } else {
            message.error("文章数据申请出错！" + res.message)
          }
        })
      }
    } else if (n === 1) {
      let resdata = getdeletecolum({ columnid: columnid })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setdata(data.filter((item) => item.columnid !== columnid))
            message.info("删除成功")
          } else {
            message.error("删除失败！" + res.message)
          }
        })
      }
    }
  }
  // 创建专栏弹窗
  const [open, setopen] = useState(false)
  const handleOktwo = () => {
    let obj = {
      title: input,
      type: value,
      time: gettime(),
    }
    let resdata = postcolum(obj)
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          let resdata = getcreatorcontent(
            { type: "time", num: 0 },
            "/creator/content/colum"
          )
          if (resdata !== 0) {
            resdata.then((res) => {
              if (res.msg) {
                setdata(res.data)
              } else {
                message.error("未知错误")
              }
            })
          }
          message.info("创建成功！")
        } else {
          message.error("创建失败！" + res.message)
        }
      })
    }
    setopen(false)
  }
  // 监听弹窗变化，恢复默认
  useLayoutEffect(() => {
    if (!open) {
      setValue("backend")
      setinput(undefined)
    }
  }, [open])
  const [value, setValue] = useState("backend")
  const [input, setinput] = useState()
  // 修改
  const [changeshow, setchangeshow] = useState(false)
  const handleOk = () => {
    let obj = {}
    obj["content"] = targetKeys.join(",")
    obj["columnid"] = selid
    obj["title"] = input2
    obj["time"] = gettime()
    obj["number"] = targetKeys.length
    obj["type"] = value
    let resdata = postchangecolum(obj)
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          message.info("修改成功！")
          setchangeshow(false)
        } else {
          message.error("文章数据申请出错！" + res.message)
        }
      })
    }
  }
  const [input2, setinput2] = useState()
  // 穿梭框
  const [mockData, setMockData] = useState([]) //左数据
  const [targetKeys, setTargetKeys] = useState([]) //右边数据
  // 生成左右两边数据
  const filterOption = (inputValue, option) => {
    if (option.title.match(inputValue)) return true
    else return false
  }
  const handleSearch = (dir, value) => {}
  return (
    <div className="Content-article">
      <div className="content-article-top">
        <div>
          <Button className={"btn" + " topsel"}> 专栏总览</Button>
        </div>
        <Button
          className="addbtn"
          onClick={() => setopen(true)}
          style={{ borderRadius: 5 }}
        >
          <span
            className="iconfont icon-add"
            style={{ fontSize: 14, color: "rgb(153, 148, 148)" }}
          >
            创建专栏
          </span>
        </Button>
      </div>
      {state ? (
        <div className="content-article-main">
          <div className="colum-table">
            <Table
              rowKey={(record) => record.columnid}
              columns={columns}
              dataSource={data}
              pagination={{
                current: current, //当前页码
                pageSize: 6, // 每页数据条数
                showTotal: () => <span>总共{data.length}条</span>,
                total: data.length, // 总条数
                onChange: (page) => {
                  setcurrent(page)
                }, //改变页码的函数
                hideOnSinglePage: false,
                showSizeChanger: false,
                defaultCurrent: false,
              }}
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "76.5vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin />
        </div>
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

      {/* 创建 */}
      <Modal
        className="colum-model"
        title="专栏创建"
        open={open}
        onOk={handleOktwo}
        okText="立即创建"
        onCancel={() => setopen(false)}
        destroyOnClose={true}
        transitionName=""
        maskTransitionName=""
        style={{ top: 50 }}
      >
        <div className="colum">
          <p>创建者：123</p>
          <div className="title">
            <span>标题：</span>
            <Input
              maxLength={15}
              showCount
              allowClear
              placeholder="请输入专栏标题"
              onChange={(e) => setinput(e.target.value)}
            />
          </div>
          <div className="type">
            <span className="spantype">类型：</span>
            <div className="select">
              <Radio.Group
                onChange={(e) => setValue(e.target.value)}
                value={value}
              >
                <Radio value={"backend"}>
                  <Tag color="blue">backend</Tag>
                </Radio>
                <Radio value={"frontend"}>
                  <Tag color="geekblue">frontend</Tag>
                </Radio>
                <Radio value={"android"}>
                  <Tag color="purple">android</Tag>
                </Radio>
                <Radio value={"ios"}>
                  <Tag color="gold">ios</Tag>
                </Radio>
                <Radio value={"AI"}>
                  <Tag color="magenta">AI</Tag>
                </Radio>
              </Radio.Group>
            </div>
          </div>
          <div></div>
        </div>
      </Modal>
      {/* 修改 */}
      <Modal
        className="change-colum"
        title="修改专栏"
        open={changeshow}
        onOk={handleOk}
        okText="确认修改"
        cancelText="取消修改"
        onCancel={() => setchangeshow(false)}
        width={700}
        destroyOnClose={true}
        style={{ top: 50 }}
      >
        <div>
          <p>创建者：123</p>
          <div className="title">
            <span>标题：</span>
            <Input
              defaultValue={input2}
              maxLength={15}
              showCount
              allowClear
              placeholder="Basic usage"
              onChange={(e) => setinput2(e.target.value)}
            />
          </div>
          <div className="type">
            <span className="spantype">类型：</span>
            <div className="select">
              <Radio.Group
                onChange={(e) => setValue(e.target.value)}
                value={value}
              >
                <Radio value={"backend"}>
                  <Tag color="blue">backend</Tag>
                </Radio>
                <Radio value={"frontend"}>
                  <Tag color="geekblue">frontend</Tag>
                </Radio>
                <Radio value={"android"}>
                  <Tag color="purple">android</Tag>
                </Radio>
                <Radio value={"ios"}>
                  <Tag color="gold">ios</Tag>
                </Radio>
                <Radio value={"AI"}>
                  <Tag color="magenta">AI</Tag>
                </Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="changearticle">
            <div>文章加入与移除：</div>
            <Transfer
              listStyle={{
                width: 250,
                height: 300,
                marginTop: 10,
                marginLeft: 20,
              }}
              rowKey={(record) => record.articleid}
              locale={{
                itemUnit: "项",
                itemsUnit: "项",
                searchPlaceholder: "标题",
              }}
              showSelectAll={false}
              operations={["加入", "移除"]}
              titles={["未选文章", "已选文章"]}
              dataSource={mockData} //左数据
              showSearch //展示搜索栏
              filterOption={filterOption}
              targetKeys={targetKeys} //右数据
              onChange={(newTargetKeys) => setTargetKeys(newTargetKeys)} //左右移动时触发
              onSearch={handleSearch} //搜索框内容改变的时
              render={(item) => item.title} //以title为属性渲染（dataSource里面数据）
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
