import { useEffect, useState } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import "../Customer/Customerhomenav.css";
import { Link } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import axiosInstance from "../../../Constants/Baseurl";
import { useNavigate } from "react-router-dom";
import PostJob from "../../../User/PostJob";
import UserViewprofile from "../../../User/UserProfile/UserViewprofile";
import { imageBaseUrl } from "../../../Constants/Baseurl";

function CustomerHomenav() {
  const custid = localStorage.getItem("custid");
  const [cust, setCust] = useState({});
  const url = imageBaseUrl;
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  // const [openRequests, setOpenRequests] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = (content) => {
    setModalContent(content);
    setShow(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("custid");
    navigate("/login");
  };

  useEffect(() => {
    if (custid === null) {
      navigate("/login");
    }
    if (custid) {
      axiosInstance
        .post(`viewcustbyid/${custid}`)
        .then((res) => {
          console.log(res);
          setCust(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [custid]);

  // const handleRequestsClick = () => {
  //   setOpenRequests(!openRequests);
  // };

  return (
    <div className="container-fluid mx-0 p-0">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary-custom navbar-b px-5">
        <Link
          className="navbar-brand text-light-custom navbar-brand-text d-flex flex-row align-items-center"
          to="#"
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
            <li className="nav-item  me-3 pe-3 m-1">
              <Link className="nav-link text-light-custom" to="/customer-home">
                Home
              </Link>
            </li>



            <li className="nav-item  me-3 pe-3 m-1">
              <Link
                className="nav-link text-light-custom"
                to="/User-viewallworker"
              >
                {" "}
                workers
              </Link>
            </li>

            <li className="nav-item me-3 pe-3 m-1">
              <Link
                className="nav-link text-light-custom"
                onClick={() => handleShow("PostJob")}
              >
                Post Work
              </Link>
            </li>
            <li className="nav-item me-3 pe-3 m-1">
              <Link
                className="nav-link text-light-custom"
                to="/user-view-postjob"
              >
                View Works
              </Link>
            </li>
            <li className="nav-item me-3 pe-3 m-1">
              <Link
                className="nav-link text-light-custom"
                to="/user-view-acceptedworkstatus"
              >
                Accepted Status
              </Link>
            </li>
            <li className="nav-item me-3 pe-3 m-1">
              <Link
                className="nav-link text-light-custom"
                to="/user-post-complaints"
              >
                Complaint
              </Link>
            </li>
            <li className="nav-item me-3 pe-3 m-1">
              <Link
                className="nav-link text-light-custom"
                to="/user-view-complaints"
              >
                View Complaint
              </Link>
            </li>
            <li className="nav-item dropdown m-1 ">
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="dropdown-basic">
                  <img
                    src={`${url}/${cust.image?.filename}`}
                    alt="Manage Requests"
                    className="navbar-imgicon text-light"
                    width="70px"
                    style={{ height: "65px" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleShow("UserViewprofile")}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose} centered>
        <div className="">
          {modalContent === "PostJob" && <PostJob close={handleClose} />}
          {modalContent === "UserViewprofile" && (
            <UserViewprofile close={handleClose} />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default CustomerHomenav;
























