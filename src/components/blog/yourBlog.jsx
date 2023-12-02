import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import blogServices from '../../appwrite/services';
import { userAllBlog } from '../../features/blog/blogSlice'
import Card from '../card/Card';
import Loader from '../Loader/Loader';
function YourBlog() {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const blogData = useSelector((state) => state.blog.articles);
  useEffect(() => {
    if (userData) {
      const userId = userData.$id;
        blogServices.getUserAllPost({ userId: userId }).then(
          (data) => {
            dispatch(userAllBlog(data.documents));
            setLoading(false);
          }
        ).catch((error) => {
          console.log("Your Blog", error);
        })
    }
  }, [isLoggedIn,dispatch])

  return (
    <>
      {loading ? <Loader/> :
        <div className='sk-your-blog'>
          <h1 className='mt-2 mb-5 text-center'>My Creative Corner</h1>
          {blogData && <Card data={blogData} />}
        </div>
      }
    </>
  )
}

export default YourBlog