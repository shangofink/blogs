import {
  Button,
  message,
  Empty,
  Space,
  Table,
  Popconfirm,
  Tag,
  Modal,
  Spin,
  Input,
  Divider,
} from "antd"
import { SearchOutlined } from "@ant-design/icons"
import Highlighter from "react-highlight-words"
import { useRef, useState } from "react"
import "./article.less"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import {
  getcreatorcontent,
  datadelete,
  getdustbin,
  dustbinchange,
  articlerecall,
} from "../../../../api/creator"
import { getarticle } from "../../../../api/showarticle"
import { timechange2 } from "../../../../utils/gettime"
import { Viewer } from "@bytemd/react"
import gfm from "@bytemd/plugin-gfm"
import highlight from "@bytemd/plugin-highlight-ssr"
import mediumZoom from "@bytemd/plugin-medium-zoom"
import gemoji from "@bytemd/plugin-gemoji"
import "bytemd/dist/index.min.css" // 引入基础css
import "juejin-markdown-themes/dist/juejin.min.css" // 掘金同款样式
export default function ContentArticle() {
  const [search, setSearch] = useSearchParams()
  const navigate = useNavigate()
  const [state, setstate] = useState(false) // 判断初始申请数据是否已经成功
  const [btn, setBtn] = useState(
    search.get("type") === null ? "article" : search.get("type")
  ) // 顶部按钮
  // 展示数据
  const [data, setdata] = useState([])
  const [datacurrent, setdatacurrent] = useState(1) // 判断数据变化
  // 缓存的数据
  const [alldata, setalldata] = useState([])
  // 草稿箱数据
  const [draftdata, setdfdata] = useState([])
  // 二级选择按钮
  const [btn2, setBtn2] = useState(
    search.get("state") === undefined ? "all" : search.get("state")
  )
  // 监听search变化，重置btn2
  useEffect(() => {
    let state = search.get("state")
    if (state !== btn2) {
      setBtn2(state)
    }
  }, [search.get("state")])
  // 第一次申请数据
  function axiosdata() {
    setTimeout(() => {
      setstate(true)
    }, 200)
  }
  // 构建时申请数据的
  useEffect(() => {
    if (
      search.get("type") === null ||
      (search.get("type") === "article" && search.get("state") === null)
    ) {
      navigate("/creator/content/article?type=article&state=all")
    } else {
      if (search.get("type") === "article") {
        if (alldata.length === 0) {
          let resdata = getcreatorcontent(
            { type: "article", state: search.get("state"), num: 0 },
            "/creator/content/article"
          )
          if (resdata !== 0) {
            resdata.then((res) => {
              if (res.msg) {
                setalldata(res.data)
                setdata(res.data)
                axiosdata()
              } else {
                message.error("未知错误")
              }
            })
          }
        }
      } else if (search.get("type") === "draft") {
        if (draftdata.length === 0) {
          let resdata = getcreatorcontent(
            { type: "draft", num: 0 },
            "/creator/content/article"
          )
          if (resdata !== 0) {
            resdata.then((res) => {
              if (res.msg) {
                setdfdata(res.data)
                setdata(res.data)
                axiosdata()
              } else {
                message.error("未知错误")
              }
            })
          }
        }
      }
    }
  }, [])
  // 监听btn跳转
  useEffect(() => {
    if (btn === "article") {
      if (alldata.length !== 0) {
        setdata(alldata)
      } else {
        let resdata = getcreatorcontent(
          { type: "article", state: search.get("state"), num: 0 },
          "/creator/content/article"
        )
        if (resdata !== 0) {
          resdata.then((res) => {
            if (res.msg) {
              setalldata(res.data)
              setdata(res.data)
              axiosdata()
            } else {
              message.error("未知错误")
            }
          })
        }
      }
    } else if (btn === "draft") {
      if (draftdata.length !== 0) {
        setdata(draftdata)
      } else {
        let resdata = getcreatorcontent(
          { type: "draft", num: 0 },
          "/creator/content/article"
        )
        if (resdata !== 0) {
          resdata.then((res) => {
            if (res.msg) {
              setdfdata(res.data)
              setdata(res.data)
              axiosdata()
            } else {
              message.error("未知错误")
            }
          })
        }
      }
    }
  }, [btn])
  // 监听btn2跳转
  useEffect(() => {
    if (alldata.length === 0) return
    switch (btn2) {
      case "all":
        setdata(alldata)
        break
      case "0":
        setdata(alldata.filter((item) => item.state === "发布成功"))
        break
      case "1":
        setdata(alldata.filter((item) => item.state === "审核中"))
        break
      case "2":
        setdata(alldata.filter((item) => item.state === "审核失败"))
        break
      default:
        break
    }
  }, [btn2])
  // 一级选择
  function fn(str) {
    if (str !== search.get("type") && str === "article") {
      setBtn(str)
      navigate(`/creator/content/article?type=article&state=all`)
    } else if (str !== search.get("type") && str === "draft") {
      setBtn(str)
      navigate(`/creator/content/article?type=draft`)
    }
  }
  // 二级选择
  function fn2(str) {
    if (str !== search.get("state")) {
      navigate(`/creator/content/article?type=article&state=${str}`)
      setBtn2(str)
    }
  }
  // 处理点击删除
  function tabledelete(n, record) {
    if (n === 0) {
      let resdata = datadelete({ type: "article", articleid: record.articleid })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setdata(data.filter((item) => item.articleid !== record.articleid))
            setalldata(
              alldata.filter((item) => item.articleid !== record.articleid)
            )
            message.info("删除成功")
          } else {
            message.error("删除失败！" + res, message)
          }
        })
      }
    } else {
      let resdata = datadelete({ type: "draft", articleid: record.articleid })
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setdata(data.filter((item) => item.articleid !== record.articleid))
            setdfdata(
              draftdata.filter((item) => item.articleid !== record.articleid)
            )
            message.info("删除成功")
          } else {
            message.error("删除失败！" + res, message)
          }
        })
      }
    }
  }
  // 处理文章撤回 articlerecall
  function recall(id) {
    let resdata = articlerecall({ articleid: id })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setdata(data.filter((item) => item.articleid !== id))
          setalldata(alldata.filter((item) => item.articleid !== id))
          message.info("已经撤回到草稿箱！")
        } else {
          message.error("撤回失败！" + res.message)
        }
      })
    }
  }
  // 响应文章预览
  function arpreview(record) {
    // 申请数据
    let resdata = getarticle({ articleid: record.articleid })
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          setpreview(true)
          setValue(res.data.content)
          settitle(record.title)
        } else {
          message.error(res.message + "文章数据申请错误！")
        }
      })
    }
    // 修改state
  }
  // 表格过滤器
  const [searchText, setSearchText] = useState("")
  const [searchedColumn, setSearchedColumn] = useState("")
  const searchInput = useRef(null)
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = (clearFilters, confirm) => {
    clearFilters()
    handleSearch("", confirm, "")
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            查找
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            清空
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  })
  // 文章表格配置
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: "150px",
      // ellipsis: true,
      ...getColumnSearchProps("title"),
    },
    {
      title: "分类",
      key: "type",
      dataIndex: "type",
      align: "center",
      width: "70px",
      render: (_, { type }) => <Tag color={"blue"}>{type}</Tag>,
    },
    {
      title: "类型",
      key: "precisetype",
      dataIndex: "precisetype",
      align: "center",
      width: "80px",
      render: (precisetype) => <Tag color={"geekblue"}>{precisetype}</Tag>,
    },
    {
      title: "阅读",
      dataIndex: "read",
      key: "read",
      align: "center",
      width: "80px",
      sorter: (a, b) => a.read - b.read,
    },
    {
      title: "点赞",
      dataIndex: "like",
      key: "like",
      align: "center",
      width: "80px",
      sorter: (a, b) => a.like - b.like,
    },
    {
      title: "收藏",
      dataIndex: "collect",
      key: "collect",
      align: "center",
      width: "80px",
      sorter: (a, b) => a.like - b.like,
    },
    {
      title: "状态",
      dataIndex: "state",
      key: "state",
      align: "center",
      width: "90px",
    },
    {
      title: "提交时间",
      dataIndex: "time",
      key: "time",
      align: "center",
      width: "120px",
      render: (text) => timechange2(text),
      sorter: (a, b) => a.time - b.time,
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
            {record.state === "审核中" || record.state === "审核失败" ? (
              <a onClick={() => arpreview(record)}>预览</a>
            ) : (
              <a onClick={() => navigate(`/exhibition?id=${record.articleid}`)}>
                查看
              </a>
            )}
            <a onClick={() => recall(record.articleid)}>撤回</a>
            <Popconfirm
              title="你是否确认删除选中?"
              onConfirm={() => tabledelete(0, data)}
              okText="确认删除"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]
  // 草稿箱表格配置
  const columns2 = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      align: "center",
      ...getColumnSearchProps("title"),
    },
    {
      title: "分类",
      key: "type",
      dataIndex: "type",
      align: "center",
      width: "200px",
      render: (_, { type }) => <Tag color={"blue"}>{type}</Tag>,
    },
    {
      title: "类型",
      key: "precisetype",
      dataIndex: "precisetype",
      align: "center",
      width: "80px",
      render: (precisetype) => <Tag color={"geekblue"}>{precisetype}</Tag>,
    },
    {
      title: "最后提交时间",
      dataIndex: "time",
      key: "time",
      align: "center",
      width: "200px",
      render: (time) => timechange2(time),
      sorter: (a, b) => a.time - b.time,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      width: "200px",
      render: (record) => {
        let data = record
        return (
          <Space size="middle">
            <a onClick={() => navigate(`/edit/change?id=${record.articleid}`)}>
              修改
            </a>
            <Popconfirm
              title="你是否确认删除选中?"
              onConfirm={() => tabledelete(1, data)}
              okText="确认删除"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]
  // EL
  const topel = (
    <div className="content-article-main">
      <Button
        className={"btn" + (btn2 === "all" ? " sel" : "")}
        onClick={() => fn2("all")}
      >
        全部
      </Button>
      <Button
        className={"btn" + (btn2 === "0" ? " sel" : "")}
        onClick={() => fn2("0")}
      >
        已发布
      </Button>
      <Button
        className={"btn" + (btn2 === "1" ? " sel" : "")}
        onClick={() => fn2("1")}
      >
        审核中
      </Button>
      <Button
        className={"btn" + (btn2 === "2" ? " sel" : "")}
        onClick={() => fn2("2")}
      >
        审核失败
      </Button>
    </div>
  )
  const nodata = (
    <div style={{ minHeight: 475, height: "68vh", paddingTop: "10%" }}>
      <Empty description="暂 无 数 据" />
    </div>
  )
  const articleata = (
    <div className="table">
      <Table
        size="small"
        rowKey={(record) => record.articleid}
        pagination={{
          current: datacurrent, //当前页码
          pageSize: 6, // 每页数据条数
          showTotal: () => <span>总共{data.length}条</span>,
          total: data.length, // 总条数
          onChange: (page) => {
            setdatacurrent(page)
          }, //改变页码的函数
          hideOnSinglePage: false,
          showSizeChanger: false,
          defaultCurrent: false,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  )
  const dfdata = (
    <div className="draft-table">
      <Table
        rowKey={(record) => record.articleid}
        size="small"
        pagination={{
          current: datacurrent, //当前页码
          pageSize: 6, // 每页数据条数
          showTotal: () => <span>总共{data.length}条</span>,
          total: data.length, // 总条数
          onChange: (page) => {
            setdatacurrent(page)
          }, //改变页码的函数
          hideOnSinglePage: false,
          showSizeChanger: false,
          defaultCurrent: false,
        }}
        columns={columns2}
        dataSource={draftdata}
      />
    </div>
  )
  // 垃圾箱配置
  const dustbincolumns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      align: "center",
      render: (title) => <h3>{title}</h3>,
      ...getColumnSearchProps("title"),
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      width: 110,
      align: "center",
      render: (_, { type }) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "分类",
      dataIndex: "precisetype",
      key: "precisetype",
      align: "center",
      width: 110,
      render: (_, { precisetype }) => <Tag color="geekblue">{precisetype}</Tag>,
    },
    {
      title: "删除时间",
      dataIndex: "deletetime",
      key: "deletetime",
      align: "center",
      width: 110,
      render: (deletetime) => <>{timechange2(deletetime)}</>,
      sorter: (a, b) => a.deletetime - b.deletetime,
    },
    {
      title: "过期时间",
      dataIndex: "timeout",
      key: "timeout",
      align: "center",
      width: 110,
      sorter: (a, b) => a.timeout - b.timeout,
      render: (timeout) => <>{timechange2(timeout)}</>,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      width: 110,
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="你是否确认恢复该文章?"
            onConfirm={() => duchange(0, record.articleid)}
            okText="确认恢复"
            cancelText="取消恢复"
          >
            <a>复原</a>
          </Popconfirm>
          <Popconfirm
            title="你是否确认彻底删除该文章?"
            onConfirm={() => duchange(1, record.articleid)}
            okText="确认删除"
            cancelText="取消删除"
          >
            <a>移除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  // 元数据
  const [dbindata, setdbindata] = useState([])
  const [current, setcurrent] = useState(1)
  // 点击时申请数据
  function dubtn() {
    setIsModalOpen(true)
    if (dbindata.length === 0) {
      let resdata = getdustbin("")
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setdbindata(res.data)
          } else {
            message.error(res.message)
          }
        })
      }
    }
  }
  // 响应删除与复原
  function duchange(n, id) {
    let resdata = 0
    if (n === 0) {
      resdata = dustbinchange({ articleid: id, sel: 0 })
    } else if (n === 1) {
      resdata = dustbinchange({ articleid: id, sel: 1 })
    }
    if (resdata !== 0) {
      resdata.then((res) => {
        if (res.msg) {
          message.info(n === 0 ? "恢复成功！" : "彻底删除成功！")
          setdbindata(dbindata.filter((item) => item.articleid !== id))
        } else {
          message.error(
            (n === 0 ? "恢复失败！" : "彻底删除失败！") + res.message
          )
        }
      })
    }
  }
  // 提供刷新响应
  function refresh() {
    setstate(false)
    if (search.get("type") === "article") {
      let resdata = getcreatorcontent(
        { type: "article", state: search.get("state"), num: 0 },
        "/creator/content/article"
      )
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setalldata(res.data)
            setdata(res.data)
            axiosdata()
          } else {
            message.error("未知错误")
          }
        })
      }
    } else if (search.get("type") === "draft") {
      let resdata = getcreatorcontent(
        { type: "draft", num: 0 },
        "/creator/content/article"
      )
      if (resdata !== 0) {
        resdata.then((res) => {
          if (res.msg) {
            setdfdata(res.data)
            setdata(res.data)
            axiosdata()
          } else {
            message.error("未知错误")
          }
        })
      }
    }
  }
  // 垃圾箱弹出框
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 预览弹出框
  const [preview, setpreview] = useState(false)
  const plugins = [gfm(), gemoji(), mediumZoom(), highlight()]
  const [value, setValue] = useState(undefined)
  const [title, settitle] = useState(undefined)
  return (
    <div className="Content-article">
      <div className="content-article-top">
        <div>
          <Button
            className={"btn" + (btn === "article" ? " topsel" : "")}
            onClick={() => {
              fn("article")
            }}
          >
            文章总览
          </Button>
          <Button
            className={"btn" + (btn === "draft" ? " topsel" : "")}
            onClick={() => {
              fn("draft")
            }}
          >
            草稿箱
          </Button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <a onClick={() => dubtn()}>
            <span
              style={{
                fontSize: 30,
                color: "rgb(48, 121, 190)",
              }}
              className="iconfont icon-lajixiang"
            ></span>
          </a>
          <a title="刷新数据" onClick={() => refresh()}>
            <svg
              className="icon"
              aria-hidden="true"
              style={{ width: 25, height: 25, marginTop: 5, marginLeft: 10 }}
            >
              <use xlinkHref="#icon-shuaxin"></use>
            </svg>
          </a>
        </div>
      </div>
      {state ? (
        btn === "article" ? (
          <div className="content-right-main">
            {topel}
            {data.length === 0 ? nodata : articleata}
          </div>
        ) : (
          dfdata
        )
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
      {/* 垃圾箱 */}
      <Modal
        className="dustbin"
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
          >
            <h3>垃圾箱</h3>
          </div>
        }
        open={isModalOpen}
        width={800}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose={true}
      >
        <div className="dutable">
          <Table
            columns={dustbincolumns}
            dataSource={dbindata}
            pagination={{
              current: current, //当前页码
              pageSize: 4, // 每页数据条数
              showTotal: () => <span>总共{dbindata.length}条</span>,
              total: dbindata.length, // 总条数
              onChange: (page, pageSize) => {
                setcurrent(page)
              }, //改变页码的函数
              hideOnSinglePage: false,
              showSizeChanger: false,
              defaultCurrent: false,
            }}
          />
        </div>
      </Modal>
      {/* 审核中/审核失败的预览 */}
      <Modal
        className="preview-modal"
        closable={false}
        title={
          <Divider plain>
            <span style={{ fontSize: 25 }}>{title}</span>
          </Divider>
        }
        open={preview}
        width={800}
        footer={null}
        onCancel={() => setpreview(false)}
        destroyOnClose={true}
        centered={true}
      >
        <div className="viewer">
          <Viewer value={value} plugins={plugins} />
        </div>
      </Modal>
    </div>
  )
}
