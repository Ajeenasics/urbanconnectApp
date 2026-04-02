import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Constants/Baseurl';
import './ViewPostJobs.css'
import { Modal } from 'react-bootstrap';
import ViewSIngleUserPostJobs from './ViewSIngleUserPostJobs';

function ViewPostJobsList() {
    const custid = localStorage.getItem("custid");
  const [data, setData] = useState([]);

  // const [category,setCategory]=useState('');

  useEffect(() => {
    axiosInstance
      .post(`viewalljobreqs/${custid}`)
      .then((result) => {
        console.log(result);
        setData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [custid]);

  

  const navigate=useNavigate();

  const navigateToacceptjobreq=(id)=>{
    navigate(`/user-viewjobstatus/${id}`)
  }

  const [show, setShow] = useState(false);
  // const [openRequests, setOpenRequests] = useState(false);
  const [selectedJob, setSelectedJob] = useState({ jobId: null, custId: null }); // State for storing selected job and customer IDs

  
  

    const handleRefresh = () => {
      
      setShow(false); // Close the modal after refreshing
    };
  
    const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedJob(id);
    setShow(true);
  };


  return (
    <div>
        <div className="workerview-jonreqmaincontainer">
      <div className="workerjobreq-mainbox">
        <div className="workjob-viewalert col-12">
          
          <div className="admindash-shrink">Work Requests</div>
          {/* <div style={{display:'flex',marginTop:'-30px',marginLeft:'960px'}}>
            <button
            // onClick={navigatetoworkerspg()}
            className='viewjoblistworker_searchbtn'
            >
            View More Workers           
            </button>
            </div> */}

          {/* <div style={{display:'flex',marginTop:'-30px',marginLeft:'860px'}}>
            <input
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
          <div className="row d-flex" style={{ marginTop: "30px" }}>
            {data && data.length ? (
              data.slice().reverse().map((a) => (
                <div className="col-3 userview-joblist-boxinside1" key={a._id}>
                  <div className="row mt-3">
                    <div className="col-5 userview-head">Work </div>
                    <div className="col-7"><p>: {a?.jobname}</p></div>
                    <div className="col-5 userview-head">Work Details</div>
                    <div className="col-7">: {a?.workdetails.slice(0,10)}...</div>
                    <div className="col-5 userview-head">Work Category</div>
                    <div className="col-7">: {a?.category}</div>
                    <div className="col-5 userview-head">Posted On</div>
                    <div className="col-7">: {a?.date.slice(0,10)}</div>
                    <div className=" viewworkreqacpt">
                    {a?.jobacceptstatus === 'accepted' && <button onClick={()=>navigateToacceptjobreq(a._id)}>View Request</button>}
                        
                    </div>
                    <div className=" viewworkreqrjt">
                    <button type="submit" onClick={()=>handleShow(a._id)}>View More</button>

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
                    <ViewSIngleUserPostJobs close={handleClose} postjob_id={selectedJob} refreshJobList={handleRefresh}/>
            </Modal>
    </div>
    
  )
}

export default ViewPostJobsList
