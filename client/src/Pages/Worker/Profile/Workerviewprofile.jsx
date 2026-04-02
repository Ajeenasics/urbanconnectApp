import React, { useEffect, useState } from "react";
import img from "../../../Assets/Firefly 20240130134039 1.png";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import axiosInstance from "../../Constants/Baseurl";
import { imageBaseUrl } from "../../Constants/Baseurl";

function Workerviewprofile({ close }) {
  const workerid = localStorage.getItem("workerid");
  const url = imageBaseUrl;

  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    workertype: "",
    address: "",
    location: "",
    city: "",
    // state:'',
    contact: "",
    email: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axiosInstance
      .post(`viewworkerbyid/${workerid}`)
      .then((result) => {
        console.log(result);
        setUser(result.data.data);
        setFormData({
          name: result.data.data.name,
          workertype: result.data.data.workertype,
          address: result.data.data.address,
          location: result.data.data.location,
          city: result.data.data.city,
          // state:result.data.data.state,
          contact: result.data.data.contact,
          email: result.data.data.email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [workerid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.workertype) newErrors.workertype = "Worker type is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.location) newErrors.location = "Location is required";
    // if (!formData.state) newErrors.state = "state is required";

    // const phonePattern = /^\d{10,}$/;
    const phonePattern = /^\d{10}$/;
    if (!formData.contact) {
      newErrors.contact = "Phone number is required";
    } else if (!phonePattern.test(formData.contact)) {
      newErrors.contact =
        "Phone number must be at least 10 digits and non-negative";
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("workertype", formData.workertype);
    updatedData.append("address", formData.address);
    updatedData.append("location", formData.location);
    updatedData.append("city", formData.city);
    // updatedData.append('state', formData.state);
    updatedData.append("contact", formData.contact);
    updatedData.append("email", formData.email);
    if (image) {
      updatedData.append("image", image);
    }

    axiosInstance
      .post(`updateworkerprofile/${workerid}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(result);
        if (result.data.status === 200) {
          setUser(result.data.data);
          setEditMode(false);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user-profileviewmain">
      <div className="user-profileviewmaincontent-inside">
        <Container className="user-info-container">
          <div className=" ri-arrow-go-back-line" onClick={close} />
          <div className="user-profileviewimage">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : `${url}/${user.image?.filename}`
              }
              width="100px"
              height="100px"
              alt="User"
            />
          </div>
          <Form>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Name
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {editMode ? (
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    isInvalid={!!errors.name}
                  />
                ) : (
                  user?.name
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Worker Type
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                <Form.Control
                  type="text"
                  name="workertype"
                  value={formData.workertype}
                  onChange={handleInputChange}
                  isInvalid={!!errors.workertype}
                  disabled
                />

                <Form.Control.Feedback type="invalid">
                  {errors.workertype}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Address
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {editMode ? (
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    isInvalid={!!errors.address}
                  />
                ) : (
                  user?.address
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Location
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {editMode ? (
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    isInvalid={!!errors.location}
                  />
                ) : (
                  user?.location
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.location}
                </Form.Control.Feedback>
              </Col>
            </Row>

            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                City
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {editMode ? (
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    isInvalid={!!errors.city}
                  />
                ) : (
                  user?.city
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Col>
            </Row>
            {/* <Row className="user-info-row">
                    <Col className="user-info-label" md={4}>State</Col>
                    <Col className='user-info-coln' md={1}>:</Col>
                    <Col className="user-info-value" md={7}>
                        {editMode ? (
                            <Form.Control
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                isInvalid={!!errors.state}
                            />
                        ) : (
                            user?.state
                        )}
                        <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                    </Col>
                </Row> */}

            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Contact Number
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {editMode ? (
                  <Form.Control
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    isInvalid={!!errors.contact}
                  />
                ) : (
                  user?.contact
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.contact}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Email
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {editMode ? (
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    isInvalid={!!errors.email}
                  />
                ) : (
                  user?.email
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>
            </Row>
            {editMode && (
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Profile Image
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </Col>
              </Row>
            )}
            <Row className="user-profilebottm-button">
              <Col>
                {!editMode ? (
                  <Button
                    type="button"
                    className="user-profilebottm-end"
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button
                      type="button"
                      className="user-profilebottm-end"
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      className="user-profilebottm-end"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default Workerviewprofile;
