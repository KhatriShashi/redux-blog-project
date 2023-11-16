import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button, RTE } from "../index"
import blogServices from '../../appwrite/services'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
function PostForm({ post }) {
    const { id } = useParams();
    const isActive = useSelector((state) => state.auth.status);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [updating, setUpdating] = useState(false);
    const [creating, setCreating] = useState(false);
    const [blogData, setBlogData] = useState(null);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    useEffect(() => {
        if (id) {
            blogServices.getPost({ blogId: id }).then(
                (item) => {
                    setBlogData(item);
                }
            ).catch((error) => {
                console.log("Post Form Fetching Data :: error", error);
            })
        }
    }, [id]);
    const { register, handleSubmit, control, watch, setValue, getValues, formState: { errors } } = useForm()
    useEffect(() => {
        setValue("title", blogData?.title || '');
        setValue("slug", blogData?.slug || '');
        setValue("description", blogData?.description || '');
        setValue("content", blogData?.content || '');
    }, [blogData, setValue, id]);


    const onSubmit = async (data) => {
        if (id) {
            try {
                // Upload file
                setUpdating(true);
                const file = data.image[0] ? await blogServices.uploadFile(data.image[0]) : null;
                if (file) {
                    await blogServices.deleteFile(blogData.featuredImage);
                }
                const dpPost = await blogServices.updatePost({
                    blogId: id,
                    ...data,
                    status: "inactive",
                    featuredImage: file ? file.$id : blogData.featuredImage
                });

                if (dpPost) {
                    // Update state and navigate only if the operations are successful
                    setSuccessMessage((prev) => !prev);
                    setTimeout(() => {
                        navigate(`/your-blogs`);
                    }, 500)
                }
            } catch (error) {
                // Handle errors (e.g., log, setErrorMessage, show user-friendly message)
                setUpdating(false);
                console.error("Error updating post:", error);
                setErrorMessage("An error occurred while updating the post.");
            }
        } else {
            setCreating(true);
            const file = await blogServices.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                try {
                    const dpPost = await blogServices.createPost({
                        ...data,
                        status: "inactive",
                        userId: userData.$id,
                        postedBy: userData.name,
                    })
                    if (dpPost) {
                        //  navigate(`/post/${dpPost.$id}`);
                        setSuccessMessage((prev) => !prev);
                        setTimeout(() => {
                            navigate('/your-blogs');
                        }, 500);
                    }
                } catch (error) {
                    setCreating(false);
                    setErrorMessage(error.message);
                    console.log("PostForm :: error", error);
                }
            }
        }


    }
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')
        }
        return ''
    }, [])
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        })
        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue]);
    return (
        <>
            <Container className='mt-4'>
                <div className='post-form'>
                    <h1 className='mb-3'>{post ? "The World Awaits: Update Your Blog" : "The World Awaits: Create Your Blog"}</h1>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Input
                            label="Title :"
                            placeholder="Share Your Thoughts: Add a Title"
                            className="sk-login-form post-form my-3"
                            {
                            ...register("title", {
                                required: true
                            })
                            }
                        />
                        {errors.title && <p style={{ color: "#fd9298" }}>{errors.title.message}</p>}
                        <Input
                            label="Slug :"
                            placeholder="Your Blog Post's Unique Web ID"
                            className="sk-login-form post-form my-3"
                            readOnly
                            {
                            ...register("slug", {
                                required: true
                            })
                            }
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), {
                                    shouldValidate: true
                                })
                            }}
                        />
                        {errors.slug && <p style={{ color: "#fd9298" }}>{errors.slug.message}</p>}
                        <Input
                            label="Description :"
                            placeholder="Introduce Your Post with a Description"
                            className="sk-login-form post-form my-3"
                            {
                            ...register("description", {
                                required: true
                            })
                            }
                        />
                        {errors.description && <p style={{ color: "#fd9298" }}>{errors.description.message}</p>}
                        <RTE
                            label="Write Your Thoughts Here :"
                            className='post-form'
                            name="content"
                            control={control}
                            defaultValue={getValues("content")}
                            required
                        />
                        {errors.content && <p style={{ color: "#fd9298" }}>{errors.content.message}</p>}
                        {
                            blogData && (
                                <div>
                                    <span>Image Preview:-</span>
                                    <div className='my-3 sk-post-form-preview-image'>
                                        <img
                                            src={blogServices.getFilePreview({ fileId: blogData.featuredImage })}
                                            alt={blogData.title}
                                        />
                                    </div>
                                </div>
                            )
                        }
                        <Input
                            label="Upload a Featured Image :"
                            type="file"
                            className="post-form my-3"
                            accept="image/png,image/jpg,image/jpeg,image/gif"
                            {...register("image", { required: id ? false : true })}
                        />
                        {errors.image && <p style={{ color: "#fd9298" }}>{errors.image.message}</p>}
                        <p style={{ color: "#fd9298" }}>{`${errorMessage}`}</p>
                        <div className='d-flex justify-content-center'>
                            <Button
                                type="submit"
                                btnName={id ? (!successMessage ? (!updating ? "Update Your Blog" : "Updating...") : "Update Successfully") :
                                    (!successMessage ? (!creating ? "Publish Your Blog" : "Uploading...") : "Blog Created Successfully")}
                                className="submit-btn my-2"
                                style={{
                                    backgroundColor: successMessage ? "#83f3b8" : "#000000",
                                    color: successMessage ? "#000000" : "#ffffff"
                                }}
                            />
                        </div>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default PostForm