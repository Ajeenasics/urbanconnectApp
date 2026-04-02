import  { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import logo from '../../../Assets/unnamed.png';
import './Login.css';
import axiosInstance from '../../Constants/Baseurl';
import { toast } from 'react-toastify';

function Login() {

  const navigate=useNavigate()
    const [formData, setFormData] = useState({
      userCategory: '',
      email: '',
      password: '',
    });
  console.log(formData);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const validate = () => {
      let formErrors = {};
      if (!formData.userCategory) formErrors.userCategory = 'User Category is required';
      if (!formData.email) formErrors.email = 'email is required';
      if (!formData.password) formErrors.password = 'Password is required';
      return formErrors;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formErrors = validate();
      if (Object.keys(formErrors).length === 0) {
        // setSubmitted(true);
        setErrors({});
        let apiEndpoint;
        if (formData.userCategory === 'Customer') {
          apiEndpoint = '/logincust';
        } else if (formData.userCategory === 'Worker') {
          apiEndpoint = '/loginworker';
        } else if (formData.userCategory === 'Employer') {
          apiEndpoint = '/emplogin';
        }

        axiosInstance.post(apiEndpoint, { email: formData.email, password: formData.password })
          .then(response => {
            console.log(response);
            if(response.data.status===200){
              toast.success("Login Successfully")
              
              if (formData.userCategory === 'Customer') {
                localStorage.setItem("custid",response.data.id)
                navigate("/customer-home");
              } else if (formData.userCategory === 'Worker') {
                localStorage.setItem("workerid",response.data.id)
                localStorage.setItem("workertype",response.data.workertype)
                 navigate("/worker-home");
              } else if (formData.userCategory === 'Employer') {
                localStorage.setItem("employer",response.data.id)
                navigate("/employer-home");
              }
            }  
            else if(response.data.status===403){
              toast.warn(response.data.msg)
            } 
             
            else{
              toast.warn(response.data.message)
            }
            if (response.data.success) {
              setSubmitted(true);
            } else {
              setErrors({ form: 'Login failed, please try again.' });
              setSubmitted(false);
            }
          })
          .catch(error => {
            setErrors({ form: 'An error occurred, please try again later.' });
            setSubmitted(false);
          });
      }      else {
        setErrors(formErrors);
        setSubmitted(false);
      }
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <>
        <Navbar />
        <div className="user-register-bg">
          <Container>
            <div className="user-login-container m-5">
              <div className="user-register-header d-flex">
                <img src={logo} alt='logo' height={40} className='img-fluid'/>
                <h3 className='text-white  p-3'>Login</h3>
              </div>
              {submitted && <Alert variant="success">Form submitted successfully!</Alert>}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="userCategory" className='text-white'>User Category</Form.Label>
                      <Form.Control
                        as="select"
                        id="userCategory"
                        name="userCategory"
                        value={formData.userCategory}
                        onChange={handleChange}
                        isInvalid={!!errors.userCategory}
                      >
                        <option value="" disabled className='text-secondary'> User Category</option>
                        <option value="Customer">Customer</option>
                        <option value="Worker">Worker</option>
                        
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">{errors.userCategory}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="email" className='text-white'>Email</Form.Label>
                      <Form.Control
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        placeholder="Enter Email"
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        placeholder="Enter Your Password"
                      />
                      <div className="password-toggle-icon" onClick={togglePasswordVisibility}>
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </div>
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-start mb-3">
                  <Link to="/forgot-password" className='text-white'>Forgot Password?</Link>
                </div>
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
                <div className="register-link mt-3 text-center ">
                  <Link to="/user-register" className='fw-bolder text-dark text-decoration-none'><span className='text-white'>Don't have an account?</span> Register Now!!!</Link>
                </div>
              </Form>
            </div>
          </Container>
        </div>
      </>
    )
}

export default Login;
