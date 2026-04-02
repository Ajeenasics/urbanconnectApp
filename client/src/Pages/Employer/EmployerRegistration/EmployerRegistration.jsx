import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FiEdit2, FiEye, FiEyeOff } from "react-icons/fi";
import Navbar from "../../Common/Navbar/Navbar";
import "./EmployerRegistration.css";
import logo from "../../../Assets/unnamed.png";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";

function EmployerRegistration() {
  const [formData, setFormData] = useState({
    employerId: "",
    name: "",
    address: "",
    location: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  // const [submitted, setSubmitted] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  // console.log(formData);

  // const handleImageUpload = (e) => {
  //   setProfileImage(URL.createObjectURL(e.target.files[0]));
  // };

  const validate = () => {
    let formErrors = {};
    if (!formData.name) {
      formErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      formErrors.name = "Name must contain only letters and spaces";
    }
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.location) formErrors.location = "Location is required";
    if (!formData.contact) {
      formErrors.contact = "Contact Number is required";
    } else if (!/^[1-9]\d{9}$/.test(formData.contact)) {
      formErrors.contact = "Contact Number must be 10 digits";
    }
    if (parseInt(formData.contact, 10) <= 0) {
      formErrors.contact = "Contact Number must be greater than zero";
    }
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      formErrors.email = "Email is invalid";
    }
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.image) formErrors.image = "Image is required";
    if (formData.password && formData.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters long";
    } else if (formData.password && !/\d/.test(formData.password)) {
      formErrors.password = "Password must contain at least one digit";
    } else if (formData.password && !/[a-zA-Z]/.test(formData.password)) {
      formErrors.password = "Password must contain at least one letter";
    }
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";

    // New fields validation
    if (!formData.employerId) {
      formErrors.employerId = "Employer ID is required";
    }

    return formErrors;
  };
console.log(formData);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted"); 
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      try {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });

        const res = await axiosInstance.post(`/employerreg`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res);
        if (res.data.status === 200) {
          toast.success("Registered Successfully");
          setSubmitted(true);
          setErrors({});
          navigate("/login");
        }
        else{
          toast.error(res.data.msg)
        }

      } catch (error) {
        toast.warn(error.response.data.msg);
        console.error("Error submitting form data:", error);
        setErrors({
          server: "Error submitting form data. Please try again later.",
        });
        setSubmitted(false);
      }
    } else {
      setErrors(formErrors);
      setSubmitted(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedFormats = ["image/jpeg", "image/png", "image/svg+xml"];

    if (allowedFormats.includes(file.type)) {
      setProfileImage(URL.createObjectURL(file));
      handleChange(e); 
    } else {
      setErrors({
        ...errors,
        image: "Only JPG, PNG, and SVG formats are allowed.",
      });
      e.target.value = null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="user-register-bg">
        <Container>
          <div className="user-register-container">
            <div className="user-register-header d-flex justify-content-center">
              <img src={logo} alt="logo" height={40} className="img-fluid" />
              <h3 className="text-white text-center align-self-center p-3">
                Employer Registration
              </h3>
            </div>
            {/* {submitted && (
              <Alert variant="success">Form submitted successfully!</Alert>
            )} */}
            <Form onSubmit={handleSubmit}>
              <div className="user-register-icon justify-content-left">
                <div className="icon-bg border border-light">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="profile"
                      className="rounded-circle"
                      width="60"
                    />
                  ) : (
                    <FaRegUser size={80} color="white" className="p-3" />
                  )}
                  <label className="upload-icon">
                    <FiEdit2 />
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      className={errors.image ? "is-invalid" : ""}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{
                        paddingBottom: "50px",
                        width: "200px",
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      {errors.image}
                    </Form.Control.Feedback>
                  </label>
                </div>
              </div>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="employerId" className="text-white">
                      Employer ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="employerId"
                      name="employerId"
                      value={formData.employerId}
                      onChange={handleChange}
                      isInvalid={!!errors.employerId}
                      placeholder="Enter Employer ID"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      {errors.employerId}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="name" className="text-white">
                      Employer Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      placeholder="Enter Employer Name"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="address" className="text-white">
                      Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                      placeholder="Enter Address"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="location" className="text-white">
                      Location
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      isInvalid={!!errors.location}
                      placeholder="Enter Location"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      {errors.location}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="contact" className="text-white">
                      Contact Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      isInvalid={!!errors.contact}
                      placeholder="Enter Contact Number"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      {errors.contact}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="email" className="text-white">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      placeholder="Enter Email Address"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label htmlFor="password" className="text-white">
                      Password
                    </Form.Label>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      placeholder="Enter Password"
                    />
                    <div
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                    >
                      {errors.password ? '': showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                    <Form.Control.Feedback
                      type="invalid"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label
                      htmlFor="confirmPassword"
                      className="text-white"
                    >
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                      placeholder="Enter Confirm Password"
                    />
                    <div
                      className="password-toggle-icon"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {errors.password ? '': showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                    <Form.Control.Feedback
                      type="invalid"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    width: "200px",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Submit
                </Button>
              </div>
              {errors.server && (
                <Alert variant="danger" className="mt-3">
                  {errors.server}
                </Alert>
              )}
            </Form>
            <p className="text-white">
              Already Registered?{" "}
              <Link
                to="/login"
                className="fw-bold"
                style={{
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                Sign In
              </Link>
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}

export default EmployerRegistration;
