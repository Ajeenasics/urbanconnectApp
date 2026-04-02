import {useState} from 'react'
import { Dropdown, Modal } from 'react-bootstrap';
import "../Customer/Customerhomenav.css";
import { Link } from 'react-router-dom';
import  from '../../Complaints/UserAddComplaints';
import ViewWorkStatus from '../../../User/WorkStatus/ViewWorkStatus';
import PostJob from '../../../User/PostJob';
import AddReviews from '../../../User/Reviews/AddReviews';

function CustomerNav2() {
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (content) => {
        setModalContent(content);
        setShow(true);
    };

    const [showcomplaint, setShowComplaint] = useState(false);
    const handleCloseComplaint = () => setShowComplaint(false);
    const handleShowComplaint = () => setShowComplaint(true);

    const [showjobstatus, setShowWorkStatus] = useState(false);
    const handleCloseWorkStatus = () => setShowWorkStatus(false);
    // const handleShowWorkStatus = () => setShowWorkStatus(true);

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
            </svg>            
            </button>
                
                <div className="collapse navbar-collapse" id="navbarNav1">
                    <ul className="navbar-nav ms-auto me-3 pe-5 navbar-links">
                        <li className="nav-item me-3 pe-3 m-1">
                            <Link className="nav-link text-light-custom" onClick={() => handleShow('PostJob')} >
                                Post Jobs
                            </Link>
                        </li>
                        <li className="nav-item me-3 pe-3 m-1">
                            <Link className="nav-link text-light-custom" to='/user-view-postjob'>
                                View Jobs
                            </Link>
                        </li>
                        <li className="nav-item me-3 pe-3 m-1">
                            <Link className="nav-link text-light-custom" to='/user-view-acceptedworkstatus'>
                                Accepted Status
                            </Link>
                        </li>
                        {/* <li className="nav-item m-1 me-3 pe-3 ">
                            <Dropdown>
                                <Dropdown.Toggle variant="link" className="nav-link text-light-custom" id="dropdown-requests">
                                    Requests
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/worker-custreq">Job Requests</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li> */}
                        {/* <li className="nav-item m-1 me-3 pe-3 ">
                            <Link className="nav-link text-light-custom" to="#">Payments</Link>
                        </li> */}
                        <li className="nav-item m-1 me-3 pe-3 ">
                            <Dropdown>
                                <Dropdown.Toggle variant="link" className="nav-link text-light-custom" id="dropdown-requests">
                                    Reviews
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="" onClick={() => handleShow('AddReviews')}>Add Reviews</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="">View Reviews</Dropdown.Item>
                                </Dropdown.Menu>
                                
                            </Dropdown>
                        </li>
                        <li className="nav-item m-1 me-3 pe-2 ">
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
        <Modal show={showjobstatus} onHide={handleCloseWorkStatus} >
                <div >
                    <ViewWorkStatus close={handleCloseWorkStatus} />
                </div>
        </Modal>

        <Modal show={show} onHide={handleClose} centered>
                <div className=''>
                    {modalContent === 'PostJob' && <PostJob close={handleClose} />}
                    {modalContent === 'AddReviews' && <AddReviews close={handleClose} />}
                </div>
        </Modal>
    </>
  )
}

export default CustomerNav2
