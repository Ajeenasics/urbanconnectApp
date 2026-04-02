import { useState } from "react";
import "../Dashboard/AdminSidebar.css";
import dashlogo from "../../../Assets/dashlogo.png";
import homelogo from "../../../Assets/home.png";
import user from "../../../Assets/user.png";
import req from "../../../Assets/managereq.png";
import complaints from "../../../Assets/complaints.png";
import logout from "../../../Assets/logout.png";
import Collapse from "@mui/material/Collapse";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const [openRequests, setOpenRequests] = useState(false);
  const [openUsers, setOpenusers] = useState(false)
  const [openComplaints, setOpenComplaints] = useState(false)

  const navigate = useNavigate()

  const handleRequestsClick = () => {
    setOpenRequests(!openRequests);
  };
  const handleusersClick = () => {
    setOpenusers(!openUsers);
  };

  const handleComplaintsClick = () => {
    setOpenComplaints(!openComplaints);
  }

  const confirmLogout = () => {
    localStorage.removeItem("adminid");
    navigate("/admin-login")
  };


  return (
    <div className="admindash-sidebarmain">
      <Link to="/admin-dashboard" style={{ textDecoration: "none" }}>
        <div className="admindash-buttonshape">
          <img src={dashlogo} alt="Dashboard" />
          <span>Dashboard</span>
        </div></Link>
      <div className="admindash-icons">
        <Link to="/admin-dashboard" style={{ textDecoration: "none" }}>
          <div>
            <img src={homelogo} alt="Home" />
            <span>Home</span>
          </div></Link>
        {/* <div>
            <img src={notification} alt="Notification" />
            <span>Notification</span>
          </div> */}
        <br />
        <div onClick={handleusersClick} style={{ cursor: "pointer", display: "flex", alignItems: "center" }} >
          <img src={user} alt="Manage Users" />
          <span>Manage Users</span>
          {openUsers ? <ArrowDropUpIcon style={{ color: "white" }} /> : <ArrowDropDownIcon style={{ color: "white" }} />}
        </div>
        <Collapse in={openUsers}>
          <div className="dropdown-content">
            <Link to="/admin-viewallcust" style={{ textDecoration: "none" }}> <div className="dropdown-item ri-checkbox-blank-line"> View Customers</div></Link>
            {/* <Link to="/admin-viewallemp" style={{textDecoration:"none"}}>  <div className="dropdown-item ri-checkbox-blank-line"> View Employer</div></Link> */}
            <Link to="/admin-viewallworker" style={{ textDecoration: "none" }}>  <div className="dropdown-item ri-checkbox-blank-line"> View Worker</div></Link>

            {/* <div className="dropdown-item">Request 3</div> */}
          </div>
        </Collapse>

        <br />
        <div onClick={handleRequestsClick} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
          <img src={req} alt="Manage Requests" />
          <Link className="text-decoration-none" to="/admin-workerreq"><span>Worker Requests</span></Link>

        </div>
        {/* <Collapse in={openRequests}>
            <div className="dropdown-content">
             <Link to="/admin-workerreq" style={{textDecoration:"none"}}> <div className="dropdown-item ri-checkbox-blank-line"> Worker Request</div></Link>
             <Link to="/admin-employerreq" style={{textDecoration:"none"}}>  <div className="dropdown-item ri-checkbox-blank-line"> Employer Request</div></Link>
              {/* <div className="dropdown-item">Request 3</div> */}
        {/* </div>
          </Collapse> */}
        <br />
        {/* <div>
            <img src={payment} alt="Manage Payments" />
            <span>Manage Payments</span>
          </div>
          <br /> */}
        <div onClick={handleComplaintsClick} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
          <img src={complaints} alt="Manage Complaints" />
          <span>Complaints</span>
          {openComplaints ? <ArrowDropUpIcon style={{ color: "white" }} /> : <ArrowDropDownIcon style={{ color: "white" }} />}
        </div>
        <Collapse in={openComplaints}>
          <div className="dropdown-content">
            <Link to="/admin-viewall-workercomplaints" style={{ textDecoration: "none" }}>    <div className="dropdown-item ri-checkbox-blank-line"> Worker Complaints</div></Link>
            <Link to="/admin-viewall-custcomplaints" style={{ textDecoration: "none" }}>  <div className="dropdown-item ri-checkbox-blank-line"> Customer Complaints</div></Link>

            {/* <div className="dropdown-item">Request 3</div> */}
          </div>
        </Collapse>
        <br />
        <Link to="/admin-viewworkstatus" style={{ textDecoration: "none" }}>
          <div>
            <span className="ri-file-cloud-line" alt="Home" style={{ marginLeft: "-10px" }} />
            {/* <span className="ri-file-cloud-line"/> */}
            <span>Payment Status</span>
          </div></Link>
        <br />
        <div>
          <img src={logout} alt="Logout" />
          <span ><button type="submit" onClick={confirmLogout} className="btn btn-primary">Logout</button></span>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
