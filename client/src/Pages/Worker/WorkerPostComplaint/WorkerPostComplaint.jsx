import  { useEffect, useState } from 'react'
import axiosInstance from '../../Constants/Baseurl';
import { Modal } from 'react-bootstrap';
import './WorkerPostComplaint.css'
import WorkerAddComplaints from '../../Common/Complaints/WorkerAddComplaints';

function WorkerPostComplaint() {
    const [job, setJob] = useState([]);
  const workerid = localStorage.getItem('workerid');
  const [selectedCustid, setSelectedCustid] = useState({ jobId: null, custId: null }); // State for storing selected job and customer IDs

  const [showjobstatus, setShowWorkStatus] = useState(false);
  const handleCloseWorkStatus = () => setShowWorkStatus(false);
  const handleShowWorkStatus = () => setShowWorkStatus(true);

  const fetchEmployerRequests = () => {
    axiosInstance
      .post(`viewApprovedReqsbyWorkerid/${workerid}`)
      .then((result) => {
        console.log(result);
        setJob(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEmployerRequests();
  }, []);

  

  const handleShow = (custId) => {
    setSelectedCustid(custId );
    handleShowWorkStatus();
  };
  return (
    <>
        <div className="workerview-jonreqmaincontainer">
      <div className="workerjobreq-mainbox">
        <div className="workjob-viewalert col-12">
          <div className="admindash-shrink">Register Complaints</div>
          <div style={{display:'flex',marginTop:'-30px',marginLeft:'860px'}}><input
                type='search'
                placeholder="Search "
                className='workernav_2_searchbar'
            />
            <button
            className='workernav_2_searchbtn'
            >
            <svg className='svg_viewjobs' width="20px" height="20px" viewBox="0 0 15 15" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 14.5L10.5 10.5M6.5 12.5C3.18629 12.5 0.5 9.81371 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81371 0.5 12.5 3.18629 12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5Z" stroke="#000000"/>
            </svg>            
            </button>
            </div> 
          <div className="row d-flex" style={{ marginTop: '30px' }}>
            {job && job.length ? (
              job.map((a) => {
                const jobid = a?.jobid?._id;
                
                return (
                  <div key={jobid} className="col-3 worker-job-boxinside pt-3">
                    <div className="counsellor-dashpic row">
                      <div className="col-5 viewworkdetails">Work Name</div>
                      <div className="col-7">: {a?.jobid?.jobname}</div>
                      <div className="col-5 viewworkdetails">Work Details</div>
                      <div className="col-7">: {a?.jobid?.workdetails.slice(0, 15)}...</div>
                      <div className="col-5 viewworkdetails">Preferred Date</div>
                      <div className="col-7">: {a?.workDate}</div>
                      <div className="col-5 viewworkdetails">Customer Name</div>
                      <div className="col-7">: {a?.customerId?.name}</div>
                      <div className="col-5 viewworkdetails">Location</div>
                      <div className="col-7">: {a?.customerId?.city}</div>
                      <div className="col-5 viewworkdetails">Contact</div>
                      <div className="col-7">: {a?.customerId?.phone}</div>
                    </div>
                    <div className="mb-4 mt-3" style={{ textAlign: 'center' }}>
                      <button
                        type="submit"
                        className="workerreg-complaintbtn"
                        onClick={() => handleShow(a?.customerId?._id)}
                      >
                        Register Complaint
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="viewcounsellor-lottiereqq">No request found</div>
            )}
          </div>
        </div>
      </div>
      <Modal show={showjobstatus} onHide={handleCloseWorkStatus}>
        <div>
          <WorkerAddComplaints close={handleCloseWorkStatus}  custId={selectedCustid} />
        </div>
      </Modal>
    </div>
    </>
  )
}

export default WorkerPostComplaint
