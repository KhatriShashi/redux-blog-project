import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import blogServices from '../../appwrite/services';
import parse from 'html-react-parser';
function BlogPage() {
    const { slug, id } = useParams();
    const [item,setItem] = useState(null);
    useEffect(() => {
        blogServices.getPost({ blogId: id }).then((data) => {
            setItem(data);
        }).catch((error) => {
            console.log("BlogPage :: error", error);
        })
    },[])
    return (
        <>
            { item && <div className="container">
                <div className='sk-user-blog-page mt-5'>
                    <div className='sk-user-blog-page-image'>
                        <img src={blogServices.getFilePreview({ fileId: item?.featuredImage })} alt={item?.title} />
                    </div>
                    <div className='p-3 sk-user-blog-page-content'>
                        <h1 className='heading'>{item?.title}</h1>
                        <p><span>Description: </span>{item?.description}</p>
                        <div className='mb-2'>{parse(item?.content)}</div>
                    </div>
                </div>
            </div>
}
        </>
    )
}

export default BlogPage