import  { useEffect, useState } from "react";
import "./UserViewprofile.css";
// import img from "../../../Assets/Firefly 20240130134039 1.png";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import axiosInstance from "../../Constants/Baseurl";
import { imageBaseUrl } from "../../Constants/Baseurl";

function UserViewprofile({ close }) {
  const custid = localStorage.getItem("custid");
  const url = imageBaseUrl;

  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    housename: "",
    city: "",
    phone: "",
    email: "",
    state: "",
    district: "",
    pincode: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
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

  // const states = [
  //   "Andhra Pradesh",
  //   "Karnataka",
  //   "Kerala",
  //   "Tamil Nadu",
  //   "Tripura",
  // ];
  useEffect(() => {
    axiosInstance
      .post(`viewcustbyid/${custid}`)
      .then((result) => {
        setUser(result.data.data);
        setFormData({
          name: result.data.data.name,
          housename: result.data.data.housename,
          city: result.data.data.city,
          phone: result.data.data.phone,
          email: result.data.data.email,
          state: result.data.data.state,
          district: result.data.data.district,
          pincode: result.data.data.pincode,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [custid]);

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
    if (!formData.housename) newErrors.housename = "House name is required";
    if (!formData.city) newErrors.city = "City is required";

    // const phonePattern = /^\d{10,}$/;
    const phonePattern = /^\d{10}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone =
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
    updatedData.append("housename", formData.housename);
    updatedData.append("city", formData.city);
    updatedData.append("phone", formData.phone);
    updatedData.append("email", formData.email);
    updatedData.append("state", formData.state);
    updatedData.append("district", formData.district);
    updatedData.append("pincode", formData.pincode);

    if (image) {
      updatedData.append("image", image);
    }

    axiosInstance
      .post(`updatecustprofile/${custid}`, updatedData, {
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
                House Name
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {editMode ? (
                  <Form.Control
                    type="text"
                    name="housename"
                    value={formData.housename}
                    onChange={handleInputChange}
                    isInvalid={!!errors.housename}
                  />
                ) : (
                  user?.housename
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.housename}
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    isInvalid={!!errors.phone}
                  />
                ) : (
                  user?.phone
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                State
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {editMode ? (
                  <Form.Select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    {Object.keys(districtsByState).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Form.Select>
                ) : (
                  user?.state
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Disctrict
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {editMode ? (
                  <Form.Select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                  >
                    <option value="">Select District</option>
                    {(districtsByState[formData.state] || []).map(
                      (district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      )
                    )}
                  </Form.Select>
                ) : (
                  user?.district
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.district}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Pincode
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {editMode ? (
                  <Form.Control
                    type="number"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    isInvalid={!!errors.pincode}
                  />
                ) : (
                  user?.pincode
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.pincode}
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

export default UserViewprofile;
