import{ useEffect, useState } from 'react'
import './AdminComplaints.css'
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../Constants/Baseurl';


function ViewCustComplaintList() {
    const [cust, setcust] = useState([]);
    const adminid=localStorage.getItem("adminid")
    console.log(localStorage.getItem("adminid"));
    const navigate=useNavigate()
  
    useEffect(()=>{
      if(adminid==null){
        navigate("/admin-login")
      }
    },[])
  
    const fetchEmployerRequests = () => {
      axiosInstance
        .post("viewallcustomercomplaintsinadmin")
        .then((result) => {
          console.log(result);
          setcust(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      fetchEmployerRequests();
    }, []);

 
  return (
    <>
        <div className="col-9">
    <div className="admin-complaint-mainbox">
      <div className="admindash-viewalert col-12">
        <div className="admindash-shrink">Customer Complaints</div>
        <div className="row d-flex" style={{ marginTop: "30px" }}>
          {/* <div className="col-12 "> */}

         {cust && cust.length ? (
            cust.map((a) => {
              return ( 
                <div className="col admin-alert-boxinside col-5">
                  <div className="admin-viewcustcomplaint row ">
                  {/* <h6 className='mt-2'><span style={{display:'grid',alignItems:'end'}} className="badge bg-secondary">{a?.jobid?.jobType}</span></h6> */}
                    <div className='row mt-3'>
                      <div className='col'>
                        <p>
                        <b>Complainer name:</b>
                        </p>
                      </div>
                      <div className='col-5'>
                        <p>
                        <i>{a?.customerId?.name}</i>
                        </p>
                      </div>
                     </div> 
                     <div className='row mt-3'>
                      <div className='col-7'>
                        <p>
                        <b>complaint against:</b>
                        </p>
                      </div>
                      <div className='col-3'>
                        <p>
                        <i>{a?.against}</i>
                        </p>
                      </div>
                     </div> 
                     
                     <div className='row mt-3'>
                      <div className='col'>
                        <p>
                        <b>Worker Name :</b>
                        </p>
                      </div>
                      <div className='col'>
                        <p>
                        <i>{a?.workerId?.name}</i>
                        </p>
                      </div>
                     </div> 
                     <div className='row mt-3'>
                      <div className='col'>
                        <p>
                        <b>complaint Desription  :</b>
                        </p>
                      </div>
                      <div className='col'>
                        <p>
                        <i>{a?.subject}</i>
                        </p>
                      </div>
                     </div> 
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
  </div>
    </>
  )
}

export default ViewCustComplaintList
