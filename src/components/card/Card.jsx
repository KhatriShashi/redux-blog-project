import React, { useRef } from 'react'
import blogServices from '../../appwrite/services';
import { Link, useNavigate } from 'react-router-dom';
import { Button,PostForm } from '../index'
function Card({ data }) {
     const updateButtonRef=useRef();
     const navigate=useNavigate();
     function updateButton(id){
        navigate(`/add-new-blog/${id}`);
     }
    const truncate = (content, maxLength) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = content;
        let textContent = tempElement.textContent || tempElement.innerText;
        let truncatedText = textContent.length > maxLength
            ? textContent.substring(0, maxLength) + '...'
            : textContent;
        tempElement.innerHTML = truncatedText;
        return tempElement.innerHTML;
    }
    return (
        <>
            <div className="container">
                <div className="row g-2">
                    {
                        data.map((item) => (
                            <div className="col-sm-12 col-md-6 col-lg-4" key={item.$id}>
                                <div className='card sk-card shadow-sm'>
                                    <Link to={`/your-blogs/${item.slug}/${item.$id}`}>

                                        <div className='card-img-section'>
                                            <img src={blogServices.getFilePreview({ fileId: item.featuredImage })} alt={item.title} />
                                        </div>
                                        <div className='px-3 pt-2 sk-card-content'>
                                            <h1>{item.title}</h1>
                                            <p className='mb-1'>{truncate(item.content, 150)}</p>
                                        </div>
                                    </Link>

                                    <div className='px-3 pb-3'>
                                        <span className='blog-page-status'>Status:-{item.status === "inactive" ? "In Review" : "Active"}</span>
                                        <div className='mt-1 d-flex justify-content-between'>
                                            <Button
                                                btnName="Update"
                                                type="button"
                                                className="post-form submit-btn"
                                                onClick={()=>updateButton(item.$id)}
                                                ref={updateButtonRef}
                                                style={{backgroundColor:"black",color:"white",padding:"5px 10px"}}
                                            />
                                            <Button
                                                btnName="Delete"
                                                type="button"
                                                className="post-form submit-btn"
                                                onClick={()=>updateButton(item.$id)}
                                                ref={updateButtonRef}
                                                style={{backgroundColor:"#fd9298",color:"white",padding:"5px 10px"}}
                                            />
                                        </div>
                                        
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Card