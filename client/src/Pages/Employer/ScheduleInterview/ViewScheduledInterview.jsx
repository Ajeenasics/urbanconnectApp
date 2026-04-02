import {useState,useEffect} from 'react'
import { Modal } from 'react-bootstrap';
import axiosInstance from '../../Constants/Baseurl';
import { useNavigate } from 'react-router-dom';
import InterviewUpdateStatus from './InterviewUpdateStatus';
import { toast } from 'react-toastify';

function ViewScheduledInterview() {
    const navigate=useNavigate()
    const [employerid, setId]= useState(localStorage.getItem("employer"));

  useEffect(()=>{
    if(localStorage.getItem("token")== null && localStorage.getItem("employer") == null ){
      navigate("/");
    }
  },[navigate]);

  const [data, setData] = useState([]);
  

  const fetchEmployerRequests = () => {
    axiosInstance
      .post(`viewInterviewsByEmpId/${employerid}`)
      .then((result) => {
        console.log(result,'empjobreqdata');
        setData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEmployerRequests();
  }, []);

  const [show, setShow] = useState(false);
  // const [openRequests, setOpenRequests] = useState(false);
  const [selectedJob, setSelectedJob] = useState({ jobId: null}); // State for storing selected job and customer IDs

  // const handleRefresh = () => {
  //     setShow(false); // Close the modal after refreshing
  // };
  const handleClose = () => setShow(false);
  const handleShow = (jobId) => {
    setSelectedJob(jobId);
    setShow(true);
  };

  const selectcandidate=(id)=>{
    axiosInstance.post(`updateinterviewStatusSelected/${id}`)
    .then((data)=>{
      if(data.status === 200){
        console.log(data,'data');
        toast.success(data.data.msg)
        setTimeout(()=>{
          window.location.reload(false)
        },3000)
        

      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const rejectcandidate=(id)=>{
    axiosInstance.post(`updateinterviewStatusRejected/${id}`)
    .then((data)=>{
      if(data.status===200){
        toast.info(data.data.msg)
        console.log(data,'data');
        setTimeout(()=>{
          window.location.reload(false)
        },3000)
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
  return (
    <>
         <div className="empview-postjobmaincontainer">
    <div className="container empviewpostjob-mainbox">
      <div className="empviewpostjob-viewalert ">
        <div className="empviewpostjob-shrink">Interview Status</div>
        <div className="row  row-cols-1 row-cols-md-4 g-4" style={{ marginTop: "30px" }}>
          {/* <div className="col-12 "> */}

          {data && data.length ? (
            data.map((a) => {
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
                        <i>{a?.jobid?.jobName}</i>
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
                        <b>{a?.jobid?.jobSalary}</b>/{a?.jobid?.jobSalaryType}
                        </p>
                      </div>
                     </div>
                     <div className='row mt-3'>
                      <div className='col'>
                        <p>
                        <b>Location:</b>
                        </p>
                      </div>
                      <div className='col'>
                        <p>
                        <i>{a?.interview_location}</i>/{a?.state}
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
                        <i>{new Date(a?.interview_date).toLocaleDateString()}</i>
                        </p>
                      </div>
                     </div> 
                     <div style={{display:'flex',justifyContent:'center'}}>
                     <button type="submit" className="empviewinterview-accept" 
                 onClick={()=>handleShow(a?._id)}                    
                    >
                      View More
                    </button>
                     </div>
                  </div>

                  <div className="jobreq-viewmore-dashbox">
                  <button style={{background:'Green',color:'#fff',border:'none',borderRadius:'20px', width:'100px'}}
            onClick={()=>selectcandidate(a?._id)}
            >Select</button>
            <button style={{background:'Red',color:'#fff',border:'none',borderRadius:'20px',width:'100px'}}
            onClick={()=>rejectcandidate(a?._id)}
            >Reject</button>
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
    <InterviewUpdateStatus close={handleClose} jobId={selectedJob} />
  </Modal>
    </>
  )
}

export default ViewScheduledInterview
