import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/LandingPages/HomePage'
import AboutPage from './pages/LandingPages/AboutPage'
import ArticleListPage from './pages/LandingPages/ArticleListPage'
import ArticlePage from './pages/LandingPages/ArticlePage'
import NotFoundPage from './pages/NotFoundPage'
import AuthLayout from './layouts/AuthLayout'
import DashLayout from './layouts/DashLayout'
import SignInpage from './pages/AuthPages/SignInPage'
import SignUpPage from './pages/AuthPages/SignUpPage'
import DashboardPage from './pages/DashboardPages/DashboardPage'
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage'
import ReportsPage from './pages/DashboardPages/ReportsPage'
import UsersPage from './pages/DashboardPages/UsersPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'articles', element: <ArticleListPage /> },
      { path: 'articles/:name', element: <ArticlePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  }, 
  {
    path: "auth/", 
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "signin",
        element: <SignInpage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      }
    ],
  },
  {
    path: "dashboard/",
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "articles",
        element: <DashArticleListPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      }
    ],
  }
]
)

function App() {
  return <RouterProvider router={router} />
}

export default App
