import { useEffect, useState } from "react";
import "../Navbar.css";
// import logo from "../../../../Assets/Mask group.png";
import { Link } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import axiosInstance from "../../../Constants/Baseurl";
// import Collapse from "@mui/material/Collapse";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useNavigate } from "react-router-dom";
import { Dropdown, Modal } from "react-bootstrap";
import Empviewprofile from "../../../Employer/Profile/Empviewprofile";
import EmpPostJob from "../../../Employer/EmpPostJob/EmpPostJob";
import { imageBaseUrl } from "../../../Constants/Baseurl";

function Employernav() {
  const employer = localStorage.getItem("employer");
  const [cust, setCuts] = useState({});
  const url = imageBaseUrl;
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  // const [openRequests, setOpenRequests] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (content) => {
    setModalContent(content);
    setShow(true);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (employer === null) {
      navigate("/");
    }
    if (employer) {
      axiosInstance
        .post(`viewempbyid/${employer}`)
        .then((res) => {
          console.log(res);
          setCuts(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [employer]);

  const handleLogout = () => {
    localStorage.removeItem("employer");
    window.location.reload();
  };

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
            <li className="nav-item me-3 m-1">
              <Link className="nav-link text-light-custom" to="/employer-home">
                Home
              </Link>
            </li>
            <li className="nav-item me-3 pe-3 m-1">
              <Link
                className="nav-link text-light-custom"
                to="#"
                onClick={() => handleShow("EmpPostJob")}
              >
                Post Jobs
              </Link>
            </li>
            <li className="nav-item me-3 pe-3 m-1">
              <Link
                className="nav-link text-light-custom"
                to="/employer-view-postjob"
              >
                View Jobs
              </Link>
            </li>
            <li className="nav-item me-3 pe-3 m-1">
              <Link
                className="nav-link text-light-custom"
                to="/employer-view-interviewstatus"
              >
                Interview Status
              </Link>
            </li>
            {/* <li className="nav-item m-1">
            <Link className="nav-link text-light-custom" to="#">About Us</Link>
          </li>
          
          <li className="nav-item m-1">
            <Link className="nav-link text-light-custom" to="#">Gallery</Link>
          </li> */}
            {/* <li className="nav-item m-1">
            <Link className="nav-link text-light-custom" to="">Jobs</Link>
          </li> */}
            {/* <li className="nav-item m-1">
            <Link className="nav-link text-light-custom" to="#">Contact Us</Link>
          </li> */}
            <li className="nav-item dropdown m-1">
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="dropdown-basic">
                  <img
                    src={`${url}/${cust?.image?.filename}`}
                    alt="Manage Requests"
                    className="navbar-imgicon"
                    width="70px"
                    height="70px"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleShow("EmpViewProfile")}>
                    Profile{" "}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>
      <Modal show={show} onHide={handleClose} centered>
        <div className="">
          {modalContent === "EmpViewProfile" && (
            <Empviewprofile close={handleClose} />
          )}
          {modalContent === "EmpPostJob" && <EmpPostJob close={handleClose} />}
        </div>
      </Modal>
    </div>
  );
}

export default Employernav;
