import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
function Login() {
    const [togglePassword, setTogglePassword] = useState(false);
    const handleLoginForm = (e) => {
        e.preventDefault();
        console.log("hello");
    }
    return (
        <div className='sk-login'>
            <div className='sk-login-container'>
                <div className='mt-3 d-flex justify-content-between align-items-center' style={{ color: "white" }}>
                    <h6>SIGN IN</h6>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "active" : ""} style={{ color: "white" }}>
                        <i className="ri-home-4-fill me-2"></i>Home
                    </NavLink>
                </div>
                <div className="sk-login-form pt-3">
                    <form action="" onSubmit={handleLoginForm}>
                        <div className='sk-login-form-password'>
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                            />
                        </div>
                        <div className='sk-login-form-password d-flex align-items-center mt-3'>
                            <input
                                type={togglePassword ? "text" : "password"}
                                placeholder="Password"
                                required />
                            <button onClick={() => { setTogglePassword(!togglePassword) }}>
                                {togglePassword ? <i className="ri-eye-off-fill"></i> : <i className="ri-eye-fill"></i>}
                            </button>
                        </div>
                        <div className='mt-1'>
                            <button 
                            style={{border:"none",background:"transparent",color:"#fd9298"}}>Forget Password?
                            </button>
                        </div>
                        <div className="sk-login-form-password sk-login-form-btn mt-5" style={{ backgroundColor: "#e9d8c2" }}>
                            <input type="submit" value="SIGN IN" />
                        </div>
                        <div className='text-center mt-2'>
                            Not a user?
                            <button 
                                style={{border:"none",background:"transparent",color:"#fd9298"}}
                                onClick={
                                    ()=>{
                                        setTimeout(() => {
                                            window.location.href="/signup"
                                        }, 600);
                                    }
                                }>
                                SIGN UP
                            </button> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login