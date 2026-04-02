import {useState} from 'react'
import { Dropdown, Modal } from 'react-bootstrap';
import "../Customer/Customerhomenav.css";
import { Link } from 'react-router-dom';
// import { FaBriefcase } from 'react-icons/fa'; 
// import { useNavigate } from "react-router-dom";
// import ReactSearchBox from "react-search-box";
// import searchicon from '../../../../Assets/searchicon.png'
import AddComplaints from '../../Complaints/UserAddComplaints';
// import ViewWorkStatus from '../../../User/WorkStatus/ViewWorkStatus';
// import EditWorkStatus from '../../../User/WorkStatus/EditWorkStatus';
// import WorkerViewWorkStatus from '../../../Worker/WorkStatus/WorkerViewWorkStatus';

function WorkerNav2() {
    const [showcomplaint, setShowComplaint] = useState(false);
    const handleCloseComplaint = () => setShowComplaint(false);
    const handleShowComplaint = () => setShowComplaint(true);

    

    

  return (
    <>
        <div className='container-fluid mx-0 p-0 mt-1'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary-custom navbar-b  px-5">
            <input
                type='search'
                placeholder="Search Job"
                className='workernav_2_searchbar'
            />
            <button
            className='workernav_2_searchbtn'
            >
<svg width="20px" height="20px" viewBox="0 0 15 15" fill="#fff" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 14.5L10.5 10.5M6.5 12.5C3.18629 12.5 0.5 9.81371 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81371 0.5 12.5 3.18629 12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5Z" stroke="#000000"/>
</svg>            </button>
                
                <div className="collapse navbar-collapse" id="navbarNav1">
                    <ul className="navbar-nav ms-auto me-5 pe-5 navbar-links">

                        <li className="nav-item m-1 me-5 pe-3 ">
                            <Dropdown>
                                <Dropdown.Toggle variant="link" className="nav-link text-light-custom" id="dropdown-requests">
                                    Requests
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/worker-custreq">Customer Job Requests</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/worker-empjobreq">Employer Job Requests</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        {/* <li className="nav-item m-1 me-5  ">
                            <Link className="nav-link text-light-custom" to="#" >Job History</Link>
                        </li> */}
                        <li className="nav-item m-1 me-5  ">
                            <Link className="nav-link text-light-custom" to="/worker-jobstatus" >Accepted status</Link>
                        </li>
                        <li className="nav-item m-1 me-5  ">
                            <Link className="nav-link text-light-custom" to="/worker-paymentstatus">Payment status</Link>
                        </li>
                        <li className="nav-item m-1   ">
                            <Dropdown>
                                <Dropdown.Toggle variant="link" className="nav-link text-light-custom" id="dropdown-requests">
                                    Reviews
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="">Add Reviews</Dropdown.Item>
                                </Dropdown.Menu>
                                
                            </Dropdown>
                        </li>
                        <li className="nav-item m-1  ">
                            <Dropdown>
                                <Dropdown.Toggle variant="link" className="nav-link text-light-custom" id="dropdown-requests">
                                    Complaints
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to=""onClick={handleShowComplaint}>Add Complaint</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        
                    </ul>
                </div>
            </nav>
            
        </div>
        <Modal show={showcomplaint} onHide={handleCloseComplaint} >
                <div >
                    <AddComplaints close={handleCloseComplaint} />
                </div>
        </Modal>
        
    </>
  )
}

export default WorkerNav2
