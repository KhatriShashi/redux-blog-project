import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { logout } from '../../features/blog/authSlice';
import logo from '../../assets/Images/logo.png';
import { Button } from '../index.js'
function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const isLoggedIn = useSelector((state) => state.auth.status);
    const user = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signInRef = useRef();
    const signUpRef = useRef();
    const logoutRef = useRef();
    const handleLoginClick = () => {
        setTimeout(() => {
            navigate('/login');
        }, 600);
    };
    const handleSignUpClick = () => {
        setTimeout(() => {
            navigate('/signup');
        }, 600);
    };
    const LogOut = () => {
        authService.logout().then((res) => {
            if (res) {
                dispatch(logout());
                setTimeout(() => {
                    navigate('/');
                }, 600);
            }
        }).catch((error) => {
            console.log("Navbar LogOut :: error", error);
        })
    }
    const linkObj=[
        {
            isLoggedIn:true,
            to:"/",
            name: "Home",
            className:`({ isActive }) => isActive ? "active" : ""`,
            children:<i className="ri-home-4-fill me-2"></i>,
            onClick:()=>(setShowMenu((prev)=>!prev))
        },
        {
            isLoggedIn:isLoggedIn,
            to:"/add-new-blog",
            name: "Add New Blog",
            className:`({ isActive }) => isActive ? "active" : ""`,
            children:<i className="ri-quill-pen-fill me-2"></i>,
            onClick:()=>(setShowMenu((prev)=>!prev))
        },
        {
            isLoggedIn:isLoggedIn,
            to:"/your-blogs",
            name: "Your Blogs",
            className:`({ isActive }) => isActive ? "active" : ""`,
            children:<i className="ri-article-fill me-2"></i>,
            onClick:()=>(setShowMenu((prev)=>!prev))
        }
    ]
    const btnObj = [
        {
            isLoggedIn:!isLoggedIn,
            btnName: "Sign In",
            onClick: handleLoginClick,
            children: <i className="ri-login-box-fill me-2"></i>,
            type: "button",
            className: "",
            ref: signInRef
        },
        {
            isLoggedIn:!isLoggedIn,
            btnName: "Sign Up",
            onClick: handleSignUpClick,
            children: <i className="ri-user-add-fill me-2"></i>,
            type: "button",
            className: "",
            ref: signUpRef
        },
        {
            isLoggedIn:isLoggedIn,
            btnName: "Logout",
            onClick: LogOut,
            children: <i className="ri-logout-box-fill me-2"></i>,
            type: "button",
            className: "mt-2",
            ref: logoutRef
        },
    ]
    return (
        <>
            <div className='sk-navbar shadow-sm pt-3 pb-3'>
                <div className="sk-navbar-brand d-flex align-items-center justify-content-between">
                    <img src={logo} alt="logo" />
                    <div className='d-flex align-items-center'>
                        {
                            isLoggedIn &&
                            <div className='navbar-profile d-none d-md-flex d-lg-flex align-items-center me-2'>
                                <h6>{user.name}</h6>
                                <i className="ri-user-fill ms-1"></i>
                            </div>
                        }
                        <div className='sk-navbar-toggle pe-lg-5 pe-3' onClick={
                            () => {
                                setShowMenu((prev) => !prev)
                            }
                        }>
                            <i className="ri-menu-3-line"></i>
                        </div>
                    </div>
                </div>
                <div className={`sk-navbar-offcanvas shadow-sm ${showMenu ? 'active' : " "}`}>
                    <div className="sk-navbar-offcanvas-content p-3">
                        <div className="sk-offcanvas-close" onClick={() => {
                            setShowMenu((prev) => !prev);
                        }}>
                            <i className="ri-close-circle-fill"></i>
                        </div>
                        {isLoggedIn &&
                            <div className='navbar-profile d-flex align-items-center mt-4 ps-0'>
                                <i className="ri-user-fill me-1"></i>
                                <h6>{user.name}</h6>
                            </div>
                        }
                        <div className="sk-offcanvas-menu mt-2">
                            <ul className='ps-0'>
                                {
                                    linkObj.map((item)=>(
                                        item.isLoggedIn && <li className='my-1' key={item.name}>
                                            <NavLink to={item.to} className={item.className}
                                            onClick={item.onClick}
                                            >
                                                {item.children}{item.name}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                                {
                                    btnObj.map((item) => (
                                        item.isLoggedIn && <li className='my-2' key={item.btnName}>
                                            <Button
                                                btnName={item.btnName}
                                                onClick={item.onClick}
                                                children={item.children}
                                                type={item.type}
                                                className={item.className}
                                                ref={item.ref}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar