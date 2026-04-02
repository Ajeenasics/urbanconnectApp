import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FiEdit2, FiEye, FiEyeOff } from "react-icons/fi";
import Navbar from "../../Common/Navbar/Navbar";
import "./User_Register.css";
import logo from "../../../Assets/unnamed.png";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";

function User_Register() {
  const [formData, setFormData] = useState({
    name: "",
    houseName: "",
    pinCode: "",
    city: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
    state: "",
    district: "",
  });

  const [errors, setErrors] = useState({});
  // const [submitted, setSubmitted] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,

  //   }));
  // };
  const districtsByState = {
    Kerala: [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kollam",
      "Kottayam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad",
    ],
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Ariyalur",
      "Chengalpattu",

      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kallakurichi",
      "Kancheepuram",
      "Kanniyakumari",
      "Karur",
      "Krishnagiri",

      "Mayiladuthurai",
      "Nagapattinam",
      "Namakkal",
      "Nilgiris",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Ranipet",
      "Salem",
      "Sivagangai",
      "Tenkasi",
      "Thanjavur",
      "Theni",
      "Thoothukudi",
      "Tiruchirappalli",
      "Tirunelveli",
      "Tirupattur",
      "Tiruppur",
      "Tiruvallur",
      "Tiruvannamalai",
      "Tiruvarur",
      "Vellore",
      "Viluppuram",
      "Virudhunagar",
    ],
    Karnataka: [
      "Bengaluru",
      "Mysuru",
      "Mangaluru",
      "Hubballi",
      "Bagalkot",
      "Ballari",
      "Belagavi",

      "Bidar",
      "Chamarajanagar",
      "Chikkaballapur",
      "Chikkamagaluru",
      "Chitradurga",
      "Davanagere",
      "Dharwad",
      "Gadag",
      "Hassan",
      "Haveri",
      ,
      "Kalaburagi",
      "Kodagu",
      "Kolar",

      "Mandya",
      "Raichur",
      "Ramanagara",
      "Shivamogga",
      "Tumakuru",
      "Udupi",

      "Vijayapura",
      "Yadgir",
      "Vijayanagara",
    ],
    "Andhra Pradesh": [
      "Anakapalli",
      "Ananthapuramu",
      "Annamayya",
      "Bapatla",
      "Chittoor",
      "East Godavari",
      "Eluru",
      "Guntur",
      "Kakinada",
      "Konaseema",
      "Krishna",
      "Kurnool",
      "Manyam",
      "Nandyal",
      "NTR",
      "Palnadu",
      "Parvathipuram Manyam",
      "Prakasam",

      "Tirupati",
      ,
      "Visakhapatnam",
      "Vizianagaram",
    ],
    Tripura: [
      "Dhalai",
      "Gomati",
      "Khowai",
      " North Tripura",
      "Sepahijala",
      "South Tripura",
      "Unakoti",
      "West Tripura",
    ],
  };

  const states = [
    "Andhra Pradesh",
    "Karnataka",
    "Kerala",
    "Tamil Nadu",
    "Tripura",
  ];

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
  console.log(formData);

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
    if (!formData.houseName) formErrors.houseName = "House Name is required";
    if (!formData.pinCode) {
      formErrors.pinCode = "Pin Code is required";
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      formErrors.pinCode = "Pin Code must be a 6 digits";
    }
    if (!formData.city) {
      formErrors.city = "City is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.city)) {
      formErrors.city = "City must contain only letters and spaces";
    }
    if (!formData.state) {
      formErrors.state = "state is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.city)) {
      formErrors.state = "state must contain only letters and spaces";
    }
    if (!formData.contactNumber) {
      formErrors.contactNumber = "Contact Number is required";
    } else if (!/^[1-9]\d{9}$/.test(formData.contactNumber)) {
      formErrors.contactNumber = "Contact Number must be 10 digits";
    }
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      formErrors.email = "Email is invalid";
    }
    if (!formData.district) formErrors.district = "District is required";
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

    return formErrors;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      axiosInstance
        .post(`registercust`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            toast.success("Registered Successfully");
            navigate("/login");
          } else {
            toast.warn(res.data.msg);
          }
          // else{
          //   console.log(res.response.data.msg+"hia");

          // }
          // setSubmitted(true);
          setErrors({});
        })
        .catch((error) => {
          toast.warn(error.response.data.msg);

          // Handle error response from the server
          console.error("Error submitting form data:", error);
          setErrors({
            server: "Error submitting form data. Please try again later.",
          });
          // setSubmitted(false);
        });

      // Handle form submission (e.g., send data to backend)
    } else {
      setErrors(formErrors);
      // setSubmitted(false);
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
      handleChange(e); // Call handleChange to update form data
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
              <h3 className="text-white text-center align-self-center p-3 ">
                Customer Registration
              </h3>
            </div>
            {/* <div className="user-register-icon justify-content-left">
              <div className="icon-bg border border-light">
                {profileImage ? (
                  <img src={profileImage} alt="profile" className="rounded-circle" width="60" />
                ) : (
                  <FaRegUser size={80}  ='white' className='p-3'/>
                )}
                <label className="upload-icon">
                  <FiEdit2 />
                  <input type="file" name='image' onChange={handleFileChange} />
                </label>
              </div>
            </div> */}
            {/* {submitted && <Alert variant="success">Form submitted successfully!</Alert>} */}
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
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="name" className="text-white">
                      Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      placeholder="Enter Name"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="houseName" className="text-white">
                      House Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="houseName"
                      name="houseName"
                      value={formData.houseName}
                      onChange={handleChange}
                      isInvalid={!!errors.houseName}
                      placeholder="Enter House Name"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      {errors.houseName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="pinCode" className="text-white">
                      Pin Code
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="pinCode"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      isInvalid={!!errors.pinCode}
                      placeholder="Enter Pin Code"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      {errors.pinCode}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="city" className="text-white">
                      City
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      isInvalid={!!errors.city}
                      placeholder="Enter City"
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="contactNumber" className="text-white">
                      Contact Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      isInvalid={!!errors.contactNumber}
                      placeholder="Enter Contact Number"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      {errors.contactNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="state" className="text-white">
                      State
                    </Form.Label>
                    <Form.Select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      isInvalid={!!errors.state}
                    >
                      <option value="">Select State</option>
                      {states.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">District</Form.Label>
                    <Form.Select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      isInvalid={!!errors.district}
                      disabled={!formData.state}
                    >
                      <option value="">Select District</option>
                      {formData.state &&
                        districtsByState[formData.state]?.map(
                          (district, index) => (
                            <option key={index} value={district}>
                              {district}
                            </option>
                          )
                        )}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.district}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="email" className="text-white">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      placeholder="Enter Email Address"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
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
                      {errors.password ? (
                        ""
                      ) : showPassword ? (
                        <FiEyeOff />
                      ) : (
                        <FiEye />
                      )}
                    </div>
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
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
                      placeholder="Confirm Password"
                    />
                    <div
                      className="password-toggle-icon"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className="d-flex align-self-center user-register-button px-5 py-2 border-0 rounded-4"
                >
                  Register
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_3_212)">
                      <path
                        d="M10.5216 9.27079L8.31929 11.4731M13.1643 11.9135L10.962 14.1158M9.64066 18.9609C7.43838 21.1631 5.23609 20.7227 3.47426 18.9609C1.71243 17.199 1.27197 14.9967 3.47426 12.7944L6.117 10.1517L12.2834 16.3181L9.64066 18.9609ZM13.1643 3.10439C15.3666 0.902098 17.5689 1.34256 19.3316 3.10439C21.0943 4.86621 21.533 7.0685 19.3316 9.27079L16.6889 11.9135L10.5216 5.74713L13.1643 3.10439Z"
                        stroke="white"
                        strokeWidth="1.0842"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3_212">
                        <rect
                          width="21.142"
                          height="21.142"
                          fill="white"
                          transform="translate(0.831543 0.461609)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Button>
              </div>
              <div className="login-link mt-3 text-center">
                <Link to="/login" className="fw-bolder text-dark">
                  <span className="text-white">Already have an account?</span>{" "}
                  <span className="user_reg_login">Log In!!!</span>
                </Link>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
}

export default User_Register;
