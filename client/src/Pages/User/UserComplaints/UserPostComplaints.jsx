import {useState,useEffect} from 'react'
import './UserPostComplaints.css'
// import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Constants/Baseurl';
import { Modal } from 'react-bootstrap';
import UserAddComplaints from '../../Common/Complaints/UserAddComplaints';

function UserPostComplaints() {
    const custid = localStorage.getItem("custid");
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`viewAprovdReqsbycustIdRegComplaint/${custid}`)
      .then((result) => {
        console.log(result);
        setData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [custid]);

  // const navigate=useNavigate();

  

  const [show, setShow] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);//for passing _id as prop
  const [selectedId, setSelectedId] = useState(null);//for passing _id as prop

  const handleClose = () => setShow(false);
  const handleShow = (id,workerid) => {
    setSelectedId(id)
    setSelectedWorkerId(workerid);
    setShow(true);
  };

  const handleRefresh = () => {
    setShow(false); // Close the modal after refreshing
  };
  return (
    <div>
        <div>
        <div className="workerview-jonreqmaincontainer" style={{minHeight:'80vh'}}>
      <div className="workerjobreq-mainbox mb-5">
        <div className="workjob-viewalert col-12">
          <div className="admindash-shrink">Register Complaints</div>
          {/* <div style={{display:'flex',marginTop:'-30px',marginLeft:'860px'}}><input
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
            </div> */}
          <div className="row d-flex" style={{ marginTop: "10px" }}>
            {data && data.length ? (
              data.map((a) => (
                <div className="col-3 userview-joblist-boxinside mt-3" key={a._id}>
                  <div className="row mt-3">
                    <div className="col-5 userview-head">Job Name</div>
                    <div className="col-7">: {a?.jobid?.jobname}</div>
                    <div className="col-5 userview-head">Posted On</div>
                    <div className="col-7">: {a?.jobid?.date.slice(0,10)}</div>
                    <div className="col-5 userview-head">Worker Name</div>
                    <div className="col-7">: {a?.workerId?.name}</div>
                    <div className="col-5 userview-head">Worker No</div>
                    <div className="col-7">: {a?.workerId?.contact}</div>
                    <div className="col-5 userview-head">Work Date</div>
                    <div className="col-7">: {a?.workDate}</div>
                    <div className="user-regcomplaint-btn  mb-4">
                        <button type="submit" onClick={()=>handleShow(a?._id,a?.workerId?._id)}>Register Complaint</button>
                    </div>
                           
                  </div>
                </div>
              ))
            ) : (
              <div className="viewcounsellor-lottiereqq">No request found</div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Modal show={show} onHide={handleClose} centered>
                    <UserAddComplaints close={handleClose} workerId={selectedWorkerId} jobappid={selectedId} refreshJobList={handleRefresh}/>
            </Modal>
    </div>
    </div>
  )
}

export default UserPostComplaints
