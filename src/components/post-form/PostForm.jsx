import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button, RTE } from "../index"
import blogServices from '../../appwrite/services'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
function PostForm({ post }) {
    const {id}=useParams();
    const isActive = useSelector((state) => state.auth.status);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage,setErrorMessage]=useState("");
    useEffect(() => {
        if (!isActive) {
            navigate("/");
        }
    }, []);
    const { register, handleSubmit, control, watch, setValue, getValues, formState: { errors } } = useForm(
        {
            defaultValues: {
                title: post?.title || '',
                slug: post?.slug || '',
                description: post?.description || '',
                content: post?.content || '',
            }
        }
    )
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const onSubmit = async (data) => {
        // console.log(userData);
        if (post) {
            const file = data.image[0] ? blogServices.uploadFile(data.image[0]) : null
            if (file) {
                blogServices.deleteFile(post.featuredImage);
            }
            const dpPost = await blogServices.updatePost(
                post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            }
            )
            if (dpPost) {
                navigate(`/post/${dpPost.$id}`)
            }
        } else {
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
                        }, 600);
                    }
                } catch (error) {
                    setErrorMessage(error.message);
                    console.log("PostForm :: error",error);
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
                        <Input
                            label="Upload a Featured Image :"
                            type="file"
                            className="post-form my-3"
                            accept="image/png,image/jpg,image/jpeg,image/gif"
                            {...register("image", { required: !post })}
                        />
                        {errors.image && <p style={{ color: "#fd9298" }}>{errors.image.message}</p>}
                        {
                            post && (
                                <div className='my-3'>
                                    <img
                                        src={blogServices.getFilePreview(post.featuredImage)}
                                        alt={post.title}
                                    />
                                </div>
                            )
                        }
                        <p style={{ color: "#fd9298" }}>{`${errorMessage}`}</p>
                        <div className='d-flex justify-content-center'>
                            <Button
                                type="submit"
                                btnName={post ? (!successMessage ? "Update Your Blog" : "Update Successfully") :
                                    (!successMessage ? "Publish Your Blog" : "Blog Created Successfully")}
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