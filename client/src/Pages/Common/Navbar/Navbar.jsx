// import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../../Assets/Mask group.png";
import { Link } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
// import axiosInstance from "../../Constants/Baseurl";
// import Collapse from "@mui/material/Collapse";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
// import { imageBaseUrl } from "../../Constants/Baseurl";

function Navbar() {
  // const custid = localStorage.getItem("custid");
  // const[cust,setCuts]=useState({})
  // const url = imageBaseUrl;

  // useEffect(() => {
  //   if (custid) {
  //     axiosInstance.post(`viewcustbyid/${custid}`)
  //       .then((res) => {
  //         console.log(res);
  //         setCuts(res.data.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [custid]);

  // const handleLogout = () => {
  //   localStorage.removeItem("custid");
  //   window.location.reload();
  // };

  // const [openRequests, setOpenRequests] = useState(false);
  const navigate = useNavigate();

  // const handleRequestsClick = () => {
  //   setOpenRequests(!openRequests);
  // };

  const loginnav = () => {
    navigate("/login");
  };

  const regcust = () => {
    navigate("/user-register");
  };
  const regworker = () => {
    navigate("/worker-register");
  };
  // const regemp = () => {
  //   navigate("/employer-register");
  // };

  return (
    <div className="container-fluid mx-0 p-0">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary-custom navbar-b px-5">
        <Link
          className="navbar-brand text-light-custom navbar-brand-text d-flex flex-row align-items-center"
          to="/"
        >
          <FaBriefcase className="navbar-icon me-2" />
          Quick To Click
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav1"
          aria-controls="navbarNav1"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav1">
          <ul className="navbar-nav ms-auto me-5 navbar-links">
            <li className="nav-item m-1">
              <Link className="nav-link text-light-custom" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item m-1">
              <Link className="nav-link text-light-custom" to="/aboutus">
                About Us
              </Link>
            </li>
            {/* <li className="nav-item m-1">
              <Link className="nav-link text-light-custom" to="#">Gallery</Link>
            </li> */}
            <li className="nav-item m-1">
              <Link className="nav-link text-light-custom" to="/alljobs">
                Jobs
              </Link>
            </li>
            {/* <li className="nav-item m-1">
              <Link className="nav-link text-light-custom" to="#">Contact Us</Link>
            </li> */}
            <li className="nav-item dropdown m-1">
              {/* <Link className="nav-link dropdown-toggle text-light-custom d-flex align-items-center" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={custid && cust.image && cust.image.filename ? `${url}/${cust.image.filename}` : logo} alt='user' className="me-2 navbar-imgicon" width="70px" height="70px" />              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {!custid ? (
                  <>
                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                    <li><Link className="dropdown-item" to="/user-register">Customer Registration</Link></li>
                    <li><Link className="dropdown-item" to="/worker-register">Worker Registration</Link></li>
                    <li><Link className="dropdown-item" to="/employer-register">Employer Registration</Link></li>
                  </>
                ) : (
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                )}
              </ul> */}

              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="dropdown-basic">
                  <img
                    src={logo}
                    alt="Manage Requests"
                    className="navbar-imgicon"
                    width="70px"
                    height="70px"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={loginnav}>Login</Dropdown.Item>
                  <Dropdown.Item onClick={regcust}>
                    Customer Registration
                  </Dropdown.Item>
                  <Dropdown.Item onClick={regworker}>
                    Worker Registration
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
