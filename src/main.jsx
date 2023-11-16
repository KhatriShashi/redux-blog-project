import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import './index.css'
import store from "./app/store.js"
import { Login,SignUp,YourBlog,Home,BlogPage} from './components/index.js'
import PostForm from './components/post-form/PostForm.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/add-new-blog/:id?",
        element:<PostForm/>,
        exact:true
      },
      {
        path:"/your-blogs",
        element:<YourBlog/>,
        exact:true
      },
      {
        path:`/blog-details/:slug/:id`,
        element:<BlogPage/>,
        exact:true
      }
    ]
  },
  {
    path:"/login",
    element:<Login/>,
  },
  {
    path:"/signup",
    element:<SignUp/>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
