import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import logo from '../../../Assets/unnamed.png';
import './ForgotPassword.css';
import axiosInstance from '../../Constants/Baseurl';
import { toast } from 'react-toastify';

function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: '',
    });

    const [errors, setErrors] = useState({});
    // const [submitted, setSubmitted] = useState(false);
    // const [showPassword, setShowPassword] = useState(false);

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = () => {
        let formErrors = {};
        if (!formData.email) formErrors.email = 'Email is required';
        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            axiosInstance.post(`forgotPWDsentMail`,formData)
              .then((res)=>{
                console.log(res);
                if(res.data.status===200){
                 alert("Password reset email has been sent to your  email.Please check your mail")
                 window.location.reload()
                //   navigate("/login")
                }
                else if(res.data.status===500){
                    toast.info("Enter your Registered MailId")
                }
        
            // setSubmitted(true);
            setErrors({});
              })
            // Handle form submission (e.g., send data to backend)
        } else {
            setErrors(formErrors);
            // setSubmitted(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="user-register-bg">
                <Container>
                    <div className="user-forgot-container m-5 mb-0">
                        <div className="user-register-header d-flex mb-0">
                            <img src={logo} alt='logo' className='align-self-center me-2' height={'70'}/>
                            <h3 className='text-white p-5 ps-0'>Forgot Password</h3>
                        </div> 
                        {/* {submitted && <Alert variant="success">Please check your mail!</Alert>} */}
                        <Form onSubmit={handleSubmit} className='d-flex flex-column '>
                            <Row className='m-0'>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="email" className='text-white'>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                            placeholder="Enter Registered Email"
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            {/* <Row className='m-0'>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="newPassword" className='text-white'>New Password</Form.Label>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            id="newPassword"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            isInvalid={!!errors.newPassword}
                                            placeholder="Enter New Password"
                                        />
                                        <div className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </div>
                                        <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row> */}
                            {/* <Row className='m-0'>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="confirmPassword" className='text-white'>Confirm Password</Form.Label>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            isInvalid={!!errors.confirmPassword}
                                            placeholder="Confirm New Password"
                                        />
                                        <div className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </div>
                                        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row> */}
                            <div className='d-flex justify-content-start mx-5 '>
                                <Button type="submit" className="d-flex border-0 align-self-center user-register-button px-5 py-2 rounded-4 ms-5">
                                    Submit
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
                           
                            <div className="login-link mt-3 align-self-end ">
                                {/* <Link to="/login" className='fw-bolder text-dark text-decoration-none'><span className='text-white'>Back to Login</span></Link> */}
                            </div>
                        </Form>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default ForgotPassword;
