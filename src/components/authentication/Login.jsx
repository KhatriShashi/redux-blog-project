import React, { useRef, useState} from 'react'
import { NavLink } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../../features/blog/authSlice';
function Login() {
    const [togglePassword, setTogglePassword] = useState(false);
    const [someError, setSomeError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false)
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate= useNavigate();
    const dispatch=useDispatch();
    const handleLoginForm = (e) => {
        e.preventDefault();
        setSomeError("");
        authService.login({ email: emailRef.current.value, password: passwordRef.current.value })
            .then(
                async ()=>{
                    const userData=await authService.getCurrentUser();
                    if(userData){
                        dispatch(login({userData}));
                        setLoginSuccess((prev)=>!prev);
                        setTimeout(() => {
                            navigate("/");
                        }, 1000);
                    }
                }
            ).catch((error) => {
                if (error) {
                    setSomeError(error);
                }
        })
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
                                id="email"
                                required
                                ref={emailRef}
                            />
                        </div>
                        <div className='sk-login-form-password d-flex align-items-center mt-3'>
                            <input
                                type={togglePassword ? "text" : "password"}
                                placeholder="Password"
                                id="password"
                                required
                                ref={passwordRef}
                            />
                            <button type='button' onClick={() => { setTogglePassword(!togglePassword) }}>
                                {togglePassword ? <i className="ri-eye-off-fill"></i> : <i className="ri-eye-fill"></i>}
                            </button>
                        </div>
                        <div className='mt-1'>
                            <button
                                style={{ border: "none", background: "transparent", color: "#fd9298" }}>Forget Password?
                            </button>
                            <p style={{ color: "#fd9298" }}>{`${someError}`}</p>
                        </div>
                        <div className="sk-login-form-password sk-login-form-btn mt-4"
                            style={{ backgroundColor: loginSuccess ? "#83f3b8" : "#e9d8c2" }}>
                            <input type="submit" value={loginSuccess ? "Login Successfully" : "SIGN IN"} />
                        </div>
                    </form>
                </div>
                <div className='text-center mt-2'>
                    Not a user?
                    <button
                        className='ms-1'
                        style={{ border: "none", background: "transparent", color: "#fd9298" }}
                        onClick={
                            () => {
                                setTimeout(() => {
                                    window.location.href = "/signup"
                                }, 600);
                            }
                        }>
                        SIGN UP
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login