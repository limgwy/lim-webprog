import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import ArticlePages from "./pages/ArticlePage.jsx";
import HomePage from "./pages/HomePage.jsx";

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <About />,
      },{
        path: 'articles',
        element: <ArticlePages />,
      },
    ]
  }
];

const router = createBrowserRouter(routes);

function App(){
  return( 
    <>
    <RouterProvider rouute={router} />
    </>
  );
}

export default App;