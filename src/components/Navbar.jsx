import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
function Navbar() {
    const [showMenu,setShowMenu]=useState(false);

    const handleLoginClick = () => {
        setTimeout(() => {
          window.location.href = '/login';
        }, 600);
      };
      const handleSignUpClick = () => {
        setTimeout(() => {
          window.location.href = '/signup';
        }, 600);
      };
    return (
        <>
            <div className='sk-navbar shadow-sm pt-2 pb-2'>
                <div className="sk-navbar-brand d-flex align-items-center justify-content-between">
                    <h1 className='ps-lg-5 ps-3' style={{fontWeight:500}}>Blogio</h1>
                    <div className='sk-navbar-toggle pe-lg-5 pe-3' onClick={ 
                        ()=>{
                            setShowMenu((prev)=>!prev)
                        }
                    }>
                        <i className="ri-menu-3-line"></i>
                    </div>
                </div>
                <div className={`sk-navbar-offcanvas shadow-sm ${showMenu ? 'active' : " " }`}>
                    <div className="sk-navbar-offcanvas-content p-3">
                        <div className="sk-offcanvas-close" onClick={()=>{
                            setShowMenu((prev)=>!prev);
                        }}>
                           <i className="ri-close-circle-fill"></i>
                        </div>
                        <div className="sk-offcanvas-menu mt-4">
                            <ul className='ps-0'>
                                <li className='my-1'>
                                    <NavLink 
                                        to="/" 
                                        className={({ isActive}) =>isActive ? "active" : ""}>
                                        <i className="ri-home-4-fill me-2"></i>Home
                                    </NavLink>
                                </li>
                                <li className='my-1'>
                                    <button onClick={handleLoginClick}>
                                        <i className="ri-login-box-fill me-2"></i>Login
                                    </button>
                                </li>
                                <li className='my-1'>
                                    <NavLink to="signup"><i className="ri-user-add-fill me-2"></i>Sign Up</NavLink>
                                </li>
                                <button className='mt-3'><i className="ri-logout-box-fill"></i> Logout</button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar