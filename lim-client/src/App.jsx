import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/LandingPages/HomePage'
import AboutPage from './pages/LandingPages/AboutPage'
import ArticleListPage from './pages/LandingPages/ArticleListPage'
import ArticlePage from './pages/LandingPages/ArticlePage'
import NotFoundPage from './pages/NotFoundPage'
import AuthLayout from './layouts/AuthLayout'
import SignInpage from './pages/AuthPages/SignInPage'
import SignUpPage from './pages/AuthPages/SignUpPage'

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
]
)

function App() {
  return <RouterProvider router={router} />
}

export default App
