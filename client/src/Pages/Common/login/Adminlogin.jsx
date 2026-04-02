import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FiEye, FiEyeOff } from "react-icons/fi";
// import Navbar from '../Navbar/Navbar';
import logo from '../../../Assets/unnamed.png';
import './Login.css';
// import axiosInstance from '../../Constants/Baseurl';
import { toast } from 'react-toastify';
import Adminloginnav from '../Navbar/AdminNav/Adminloginnav';
import { useNavigate } from 'react-router-dom';

function Adminlogin() {
    // const [errors, setErrors] = useState({});
    // const [submitted, setSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        username: "",
        password: ""
    });
const navigate=useNavigate()
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const changefn = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const correctEmail = "Admin@gmail.com";
    const correctPassword = "Admin@123";

    const submitfn = (e) => {
        e.preventDefault();
        if (correctEmail === data.username) {
            if (correctPassword === data.password) {
                toast.success("Login Successfully");
                navigate("/admin-dashboard")
                localStorage.setItem("adminid",1)
            } else {
                toast.error("Password Error");
            }
        } else {
            toast.error("Username Error");
        }
    };

    return (
        <>
            <Adminloginnav />
            <div className="user-register-bg">
                <Container>
                    <div className="user-login-container m-5">
                        <div className="user-register-header d-flex">
                            <img src={logo} alt='logo' height={40} className='img-fluid' />
                            <h3 className='text-white p-3'>Admin Login</h3>
                        </div>
                        <Form onSubmit={submitfn}>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="email" className='text-white'>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="email"
                                            name="username"
                                            value={data.username}
                                            onChange={changefn}
                                            placeholder="Enter name"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3 position-relative">
                                        <Form.Label htmlFor="password" className='text-white'>Password</Form.Label>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={data.password}
                                            onChange={changefn}
                                            placeholder="Enter Password"
                                            required
                                        />
                                        <div className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className='d-flex justify-content-center'>
                                <Button type="submit" className="d-flex align-self-center user-register-button px-5 py-2 border-0 rounded-4 ">
                                    Sign In
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <g clipPath="url(#clip0_3_212)">
                                            <path d="M10.5216 9.27079L8.31929 11.4731M13.1643 11.9135L10.962 14.1158M9.64066 18.9609C7.43838 21.1631 5.23609 20.7227 3.47426 18.9609C1.71243 17.199 1.27197 14.9967 3.47426 12.7944L6.117 10.1517L12.2834 16.3181L9.64066 18.9609ZM13.1643 3.10439C15.3666 0.902098 17.5689 1.34256 19.3316 3.10439C21.0943 4.86621 21.533 7.0685 19.3316 9.27079L16.6889 11.9135L10.5216 5.74713L13.1643 3.10439Z" stroke="white" strokeWidth="1.0842" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3_212">
                                                <rect width="21.142" height="21.142" fill="white" transform="translate(0.831543 0.461609)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Adminlogin;
