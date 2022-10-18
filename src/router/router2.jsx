import {
  useRoutes,
  Navigate,
  useLocation,
  useSearchParams,
} from "react-router-dom"
import { Suspense, lazy } from "react"
import Loading from "../vive/vive"
import Loading2 from "../vive/view/vive2"
import { message } from "antd"
import TypeSearch from "../page/search/type/type"
import Usershow from "../page/usershow/useshow"
const Login = lazy(() => import("../page/login/login"))
const Register = lazy(() => import("../page/register/register"))
const Home = lazy(() => import("../page/home/home.jsx"))
const Authors = lazy(() => import("../page/authors/authors"))
const Userpage = lazy(() => import("../page/user/userpage"))
const UserSetting = lazy(() => import("../page/user/usersetting/usersetting"))
const Profile = lazy(() =>
  import("../page/user/usersetting/children/profile/profile")
)
const Account = lazy(() =>
  import("../page/user/usersetting/children/account/account")
)
const Resume = lazy(() =>
  import("../page/user/usersetting/children/resume/resume")
)
const Block = lazy(() =>
  import("../page/user/usersetting/children/block/block")
)
const Creator = lazy(() => import("../page/creator/creator"))
const CreatorHome = lazy(() => import("../page/creator/other/home/home.jsx"))
const ContentArticle = lazy(() =>
  import("../page/creator/other/content/article")
)
const ContentColum = lazy(() => import("../page/creator/other/content/colum"))
const ContentPin = lazy(() => import("../page/creator/other/content/pin"))
const Data = lazy(() => import("../page/creator/other/data/data.jsx"))
const Article = lazy(() => import("../page/creator/other/data/article/article"))
const Column = lazy(() => import("../page/creator/other/data/colum/colum"))
const Follow = lazy(() => import("../page/creator/other/data/follow"))
const Edit = lazy(() => import("../page/edit/edit"))
const Editchange = lazy(() => import("../page/edit/editchange.jsx"))
const Exhibition = lazy(() => import("../page/exhibition/exhibition.jsx"))
const Event = lazy(() => import("../page/creator/other/event/event"))
const ArticleSearch = lazy(() =>
  import("../page/search/articlesearch/articlesearch")
)
const UserSearch = lazy(() => import("../page/search/usersearch/usersearch"))
const UsershowSearch = lazy(() => import("../page/usershow/other/search"))

// 处理错误
const Undiscovered = lazy(() => import("../vive/view/undiscovered"))
const Error = lazy(() => import("../vive/view/error"))
// 路由表
export default function Index(props) {
  const location = useLocation()
  const [search, setSearch] = useSearchParams()
  let rules = [
    {
      path: "/",
      auth: true,
      element: <Navigate to="/home" />,
    },
    {
      path: "/login",
      auth: true,
      element: (
        <Suspense fallback={<Loading2 />}>
          <Login props={props.data}></Login>
        </Suspense>
      ),
    },
    {
      path: "/register",
      auth: true,
      element: (
        <Suspense fallback={<Loading2 />}>
          <Register></Register>
        </Suspense>
      ),
    },
    {
      path: "/home",
      auth: false,

      element: (
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/authors",
      auth: false,
      element: (
        <Suspense fallback={<Loading />}>
          <Authors />
        </Suspense>
      ),
    },
    {
      path: "/user",
      auth: false,
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<Loading />}>
              <Userpage props={props.data} />
            </Suspense>
          ),
        },
        {
          path: "setting",
          element: (
            <Suspense fallback={<Loading />}>
              <UserSetting props={props.data}></UserSetting>
            </Suspense>
          ),
          children: [
            {
              path: "",
              element: <Navigate to="/user/setting/profile"></Navigate>,
            },
            {
              path: "profile",
              element: (
                <Suspense fallback={<Loading />}>
                  <Profile props={props.data}></Profile>
                </Suspense>
              ),
            },
            {
              path: "account",
              element: (
                <Suspense fallback={<Loading />}>
                  <Account></Account>
                </Suspense>
              ),
            },
            {
              path: "resume",
              element: (
                <Suspense fallback={<Loading />}>
                  <Resume></Resume>
                </Suspense>
              ),
            },
            {
              path: "block",
              element: (
                <Suspense fallback={<Loading />}>
                  <Block></Block>
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/creator",
      auth: true,
      element: (
        <Suspense fallback={<Loading />}>
          <Creator></Creator>
        </Suspense>
      ),
      children: [
        { path: "", element: <Navigate to="/creator/home"></Navigate> },
        {
          path: "home",
          element: (
            <Suspense fallback={<Loading2 />}>
              <CreatorHome></CreatorHome>
            </Suspense>
          ),
        },
        {
          path: "content",
          element: <Navigate to="/creator/content/article"></Navigate>,
        },
        {
          path: "content/article",
          element: (
            <Suspense fallback={<Loading2 />}>
              <ContentArticle></ContentArticle>
            </Suspense>
          ),
        },
        {
          path: "content/column",
          element: (
            <Suspense fallback={<Loading2 />}>
              <ContentColum></ContentColum>
            </Suspense>
          ),
        },
        {
          path: "content/pins",
          element: (
            <Suspense fallback={<Loading2 />}>
              <ContentPin></ContentPin>
            </Suspense>
          ),
        },
        {
          path: "data",
          element: <Navigate to="/creator/data/content/article"></Navigate>,
        },
        {
          path: "data/content",
          element: (
            <Suspense fallback={<Loading2 />}>
              <Data></Data>
            </Suspense>
          ),
          children: [
            {
              path: "article",
              element: (
                <Suspense fallback={<Loading2 />}>
                  <Article />
                </Suspense>
              ),
            },
            {
              path: "column",
              element: (
                <Suspense fallback={<Loading2 />}>
                  <Column />
                </Suspense>
              ),
            },
            { path: "pin", element: 3 },
            {
              path: "follow",
              element: (
                <Suspense fallback={<Loading2 />}>
                  <Follow />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "event",
          element: <Navigate to="/creator/event/article"></Navigate>,
        },
        {
          path: "event/article",
          element: (
            <Suspense fallback={<Loading2 />}>
              <Event></Event>
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/edit",
      auth: true,
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<Loading2 />}>
              <Edit />
            </Suspense>
          ),
        },
        {
          path: "change",
          element: (
            <Suspense fallback={<Loading2 />}>
              <Editchange />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/exhibition",
      auth: true,
      element: (
        <Suspense fallback={<Loading />}>
          <Exhibition />
        </Suspense>
      ),
    },
    {
      path: "/articlesearch",
      auth: true,
      element: (
        <Suspense fallback={<Loading />}>
          <ArticleSearch key={search.get("search")} />
        </Suspense>
      ),
    },
    {
      path: "/usersearch",
      auth: true,
      element: (
        <Suspense fallback={<Loading />}>
          <UserSearch key={search.get("search")} />
        </Suspense>
      ),
    },
    {
      path: "/typesearch",
      auth: true,
      element: (
        <Suspense fallback={<Loading />}>
          <TypeSearch key={search.get("search")} />
        </Suspense>
      ),
    },
    {
      path: "/usershow",
      auth: true,
      element: (
        <Suspense fallback={<Loading />}>
          <Usershow />
        </Suspense>
      ),
      children: [
        {
          path: "search",
          element: (
            <Suspense fallback={<Loading />}>
              <UsershowSearch key={search.get("search")} />
            </Suspense>
          ),
        },
      ],
    },
    // 服务器错误
    {
      path: "error",
      auth: true,
      element: (
        <Suspense fallback={<Loading />}>
          <Error />
        </Suspense>
      ),
    },
    // 处理后端404界面
    {
      path: "undiscovered",
      auth: true,
      element: (
        <Suspense fallback={<Loading />}>
          <Undiscovered />
        </Suspense>
      ),
    },
  ]
  const error = {
    path: "*",
    auth: true,
    element: (
      <Suspense fallback={<Loading />}>
        <Undiscovered />
      </Suspense>
    ),
  } // 处理 前端未匹配路由的404界面
  const generateRouter = (rules, pathname) => {
    let result = null
    let str = ""
    if (pathname === "/") {
      str = pathname
    } else {
      let s = pathname.slice(1).indexOf("/")
      if (s === -1) {
        str = pathname
      } else {
        str = pathname.slice(0, s + 1)
      }
    }

    for (let i in rules) {
      if (rules[i].path === str) {
        result = rules[i]
        break
      }
    }
    if (result === null) {
      return [error]
    } else {
      if (result.auth) {
        return [result, error]
      } else {
        if (
          localStorage.getItem("token") === "" ||
          localStorage.getItem("token") === undefined ||
          localStorage.getItem("token") === null ||
          localStorage.getItem("token") === "null"
        ) {
          message.warn("登陆过期，请重新登陆！")
          localStorage.clear()
          return [
            { path: pathname, auth: true, element: <Navigate to="/login" /> },
            error,
          ]
        } else {
          return [result, error]
        }
      }
    }
  }

  return useRoutes(generateRouter(rules, location.pathname))
}
