import {useState,useEffect} from 'react'
import './EmpViewJobList.css'
import axiosInstance from '../../Constants/Baseurl';
import { Modal } from 'react-bootstrap';
// import circleimg4 from '../../../Assets/circleimg4.png'
import {useNavigate} from 'react-router-dom'
import EmpViewPostJob from './EmpViewPostJob';

function EmpViewJobList() {
  const navigate =useNavigate();

  const employerid= localStorage.getItem("employer");

  useEffect(()=>{
    if(localStorage.getItem("token")== null && localStorage.getItem("employer") == null ){
      navigate("/");
    }
  },[navigate]);

  const [postjobdata, setPostJobData] = useState([]);
  

  const fetchEmployerRequests = () => {
    axiosInstance
      .post(`viewEmpPostJobByEmpid/${employerid}`)
      .then((result) => {
        console.log(result,'empjobreqdata');
        setPostJobData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEmployerRequests();
  }, []);

  const navigateToWorkReqJob=(id)=>{
    navigate(`/employer-view-postjobreq/${id}`)
  }

  const [show, setShow] = useState(false);
  const [openRequests, setOpenRequests] = useState(false);
  const [selectedJob, setSelectedJob] = useState({ jobId: null}); // State for storing selected job and customer IDs

  
  

    const handleRefresh = () => {
      
      setShow(false); // Close the modal after refreshing
    };
  
    const handleClose = () => setShow(false);
  const handleShow = (jobId) => {
    setSelectedJob(jobId);
    setShow(true);
  };

  return (
    <>
        <div className="empview-postjobmaincontainer">
    <div className="container empviewpostjob-mainbox">
      <div className="empviewpostjob-viewalert ">
        <div className="empviewpostjob-shrink">View Job Requests</div>
        <div className="row  row-cols-1 row-cols-md-4 g-4" style={{ marginTop: "30px" }}>
          {/* <div className="col-12 "> */}

          {postjobdata && postjobdata.length ? (
            postjobdata.slice().reverse().map((a) => {
              return (
                <div className="col-3 empviewpostjob-boxinside">
                  <div className="empviewpostjob-dashpic row ">
                  <h6 className='mt-2'><span style={{display:'grid',alignItems:'end'}} className="badge bg-secondary">{a?.jobid?.jobType}</span></h6>
                    <div className='row mt-3'>
                      <div className='col'>
                        <p>
                        <b>Job Name:</b>
                        </p>
                      </div>
                      <div className='col-5'>
                        <p>
                        <i>{a?.jobName}</i>
                        </p>
                      </div>
                     </div> 
                     <div className='row mt-3'>
                      <div className='col'>
                        <p>
                        <b>Job Salary:</b>
                        </p>
                      </div>
                      <div className='col'>
                        <p>
                        <i>{a?.jobSalary}</i>/{a?.jobSalaryType}
                        </p>
                      </div>
                     </div> 
                     
                     <div className='row mt-3'>
                      <div className='col'>
                        <p>
                        <b>Posted On:</b>
                        </p>
                      </div>
                      <div className='col'>
                        <p>
                        <i>{new Date(a?.date).toLocaleDateString()}</i>
                        </p>
                      </div>
                     </div> 
                  </div>

                  <div className="jobreq-viewmore-dashbox">
                    {/* {a?.approveStatus === 'pending' && */}
                     <button type="submit" className="empviewpostjob-accept" 
 onClick={()=>navigateToWorkReqJob(a?._id)}>
                      View Job Request
                    </button>
                     {/* } */}
                    <button type="submit" className="empviewpostjob-reject" 
 onClick={()=>handleShow(a?._id)}                    
 >
                      View More
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="viewcounsellor-lottiereqq">Nothing found</div>
          )} 
        </div>
      </div>

    </div>
    

  </div>
  <Modal show={show} onHide={handleClose} centered>
                    <EmpViewPostJob close={handleClose} jobId={selectedJob} refreshJobList={handleRefresh}/>
            </Modal>
    </>
  )
}

export default EmpViewJobList
