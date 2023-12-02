import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css'
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import authService from './appwrite/auth';
import { login, logout } from './features/blog/authSlice';
import { Navbar, Footer } from './components/index.js';
import blogServices from './appwrite/services.js';
import { userAllBlog,allActiveBlog} from './features/blog/blogSlice.js'
import Loader from './components/Loader/Loader.jsx';
function App() {
  const dispatch = useDispatch();
  const [Loading,setLoading]=useState(true);
  useEffect(() => {

    blogServices.getAllActivePost().then(
      (data) => {
        if (data) {
          setLoading(false);
          dispatch(allActiveBlog(data.documents));
        }
      }
    ).catch((error) => {
        console.log("Fetching All Active Blog :: error", error);
      })

    authService.getCurrentUser().then(
      (userData) => {
        if (userData) {
          dispatch(login({ userData }))
          const userId = userData.$id;
          return blogServices.getUserAllPost({ userId: userId });
        } else {
          dispatch(logout());
          return Promise.resolve();
        }
      }
    ).then((data) => {
      if (data) {
        dispatch(userAllBlog(data.documents));
      }
    })
      .catch(
        (error) => {
          console.log("Get Current User & blog data :: error", error);
        }
      )
  }, [dispatch]);
  return (
    <>
      <Navbar />
      
      {
        !Loading ? <Outlet /> : <Loader/>
      }
      <Footer />
    </>
  )
}

export default App;
