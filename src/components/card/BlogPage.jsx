import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import blogServices from '../../appwrite/services';
import Loader from '../Loader/Loader';
import parse from 'html-react-parser';
function BlogPage() {
    const { slug, id } = useParams();
    const [item, setItem] = useState(null);
    const [loading,setLoading] =useState(true);
    useEffect(() => {
        blogServices.getPost({ blogId: id }).then((data) => {
            setItem(data);
            setLoading(false);
        }).catch((error) => {
            console.log("BlogPage :: error", error);
        })
    }, [])
    const parseDate = (date) => {
        console.log(date);
        const dateObject = new Date(date);
        return dateObject.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
    return (
        <>
            {loading ? <Loader/> : item && <div className="container">
                <div className='sk-user-blog-page mt-5'>
                    <div className='sk-user-blog-page-image'>
                        <img src={blogServices.getFilePreview({ fileId: item?.featuredImage })} alt={item?.title} />
                    </div>
                    <div className='p-3 sk-user-blog-page-content'>
                        <p><i>posted by :- {item?.postedBy} ({parseDate(item?.$createdAt)})</i></p>
                        <h1 className='heading'>{item?.title}</h1>
                        <p><span>Description: </span>{item?.description}</p>
                        <div className='mb-2 blog-page-content'>{parse(item?.content)}</div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default BlogPage