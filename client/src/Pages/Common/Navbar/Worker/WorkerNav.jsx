import { useEffect, useState } from "react";
import { Dropdown, Modal, } from "react-bootstrap";
import "../Customer/Customerhomenav.css";
import { Link } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Constants/Baseurl";
import Workerviewprofile from "../../../Worker/Profile/Workerviewprofile";
import { imageBaseUrl } from "../../../Constants/Baseurl";

function WorkerNav() {
  const [show, setShow] = useState(false);

  // const [openRequests, setOpenRequests] = useState(false);
  const navigate = useNavigate();
  const [worker, setWorker] = useState({});
  const workerid = localStorage.getItem("workerid");
  const url = imageBaseUrl;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (workerid === null) {
      navigate("/login");
    }
    if (workerid) {
      axiosInstance
        .post(`viewworkerbyid/${workerid}`)
        .then((res) => {
          console.log(res);
          setWorker(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [workerid]);

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
            <li className="nav-item me-3 m-1">
              <Link className="nav-link text-light-custom" to="/worker-home">
                Home
              </Link>
            </li>

            <li className="nav-item m-1 me-3">
              <Link className="nav-link text-light-custom" to="/worker-custreq">
                Service Request
              </Link>
            </li>
            <li className="nav-item m-1 me-3  ">
              <Link
                className="nav-link text-light-custom"
                to="/worker-reqacceptstatus"
              >
                Accepted status
              </Link>
            </li>
            <li className="nav-item m-1 me-3  ">
              <Link
                className="nav-link text-light-custom"
                to="/worker-paymentstatus"
              >
                Payment status
              </Link>
            </li>

            <li className="nav-item m-1 me-3">
              <Link
                className="nav-link text-light-custom"
                to="/worker-post-complaint"
              >
                Complaint
              </Link>
            </li>
            <li className="nav-item m-1 me-3">
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  className="nav-link text-light-custom"
                  id="dropdown-requests"
                >
                  View Complaints
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/worker-view-cust-complaintlist">
                    Customer Complaints
                  </Dropdown.Item>
                  {/* <Dropdown.Item as={Link} to="/worker-empjobreq">Employer Complaints</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li className="nav-item dropdown m-1">
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="dropdown-basic">
                  <img
                    src={`${url}/${worker?.image?.filename}`}
                    alt="Manage Requests"
                    className="navbar-imgicon"
                    width="70px"
                    height="70px"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleShow}>Profile </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => {
                      localStorage.removeItem("workerid");
                      navigate("/");
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>
      <Modal show={show} onHide={handleClose} centered>
        <div className="">
          <Workerviewprofile close={handleClose} />
        </div>
      </Modal>
    </div>
  );
}

export default WorkerNav;





























