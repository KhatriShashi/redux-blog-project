import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login } from '../../features/blog/authSlice';
function SignUp() {
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [someError, setSomeError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const handleSignUpForm = async (e) => {
        e.preventDefault();
        setSomeError("");
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setSomeError("password & confirm password not matched");
        } else {
            try {
                const user=await authService.createAccount({
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    username: userRef.current.value
                })
                if(user){
                    console.log(user);
                    const userData=await authService.getCurrentUser();
                    if(userData){
                        dispatch(login({userData}));
                    }
                    setSuccessMessage((prev)=>!prev);
                    setTimeout(() => {
                        navigate("/");
                    }, 500);
                }
                
            } catch (error) {
                setSomeError(error);
            }
        }
    }
    return (
        <div className='sk-login'>
            <div className='sk-login-container' style={{ height: "500px" }}>
                <div className='mt-3 d-flex justify-content-between align-items-center' style={{ color: "white" }}>
                    <h6>SIGN UP</h6>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "active" : ""} style={{ color: "white" }}>
                        <i className="ri-home-4-fill me-2"></i>Home
                    </NavLink>
                </div>
                <div className="sk-login-form pt-3">
                    <form action="" onSubmit={handleSignUpForm}>
                        <div className='sk-login-form-password'>
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                ref={userRef}
                            />
                        </div>
                        <div className='sk-login-form-password mt-3'>
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                ref={emailRef}
                            />
                        </div>
                        <div className='sk-login-form-password d-flex align-items-center mt-3'>
                            <input
                                type={togglePassword ? "text" : "password"}
                                placeholder="Password"
                                minLength={8}
                                ref={passwordRef}
                                required />
                            <button type='button'
                                onClick={() => { setTogglePassword(!togglePassword) }}>
                                {togglePassword ? <i className="ri-eye-off-fill"></i> : <i className="ri-eye-fill"></i>}
                            </button>
                        </div>
                        <div className='sk-login-form-password d-flex align-items-center mt-3'>
                            <input
                                type={toggleConfirmPassword ? "text" : "password"}
                                minLength={8}
                                placeholder="Confirm Password"
                                ref={confirmPasswordRef}
                                required />
                            <button type='button'
                                onClick={() => { setToggleConfirmPassword(!toggleConfirmPassword) }}>
                                {toggleConfirmPassword ? <i className="ri-eye-off-fill"></i> : <i className="ri-eye-fill"></i>}
                            </button>
                        </div>
                        <p style={{ color: "#fd9298" }}>
                            {`${someError}`}
                        </p>
                        <div
                            className="sk-login-form-password sk-login-form-btn mt-4"
                            style={{ backgroundColor: successMessage ? "#83f3b8" : "#e9d8c2" }}>
                            <input type="submit" value={successMessage ? "SIGN UP Successfully" : "SIGN UP"} />
                        </div>
                    </form>
                </div>
                <div className='text-center mt-2'>
                    Already a user?
                    <button
                        style={{ border: "none", background: "transparent", color: "#fd9298" }}
                        onClick={
                            () => {
                                setTimeout(() => {
                                    window.location.href = "/login"
                                }, 600);
                            }
                        }>
                        SIGN IN
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUp