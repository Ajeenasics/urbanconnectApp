import  { useEffect, useState } from 'react'
import "../Requests/Workerreq.css";
import axiosInstance from '../../Constants/Baseurl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { imageBaseUrl } from '../../Constants/Baseurl';


function Employerreq() {
    const [emp, setEmp] = useState([]);
    const url = imageBaseUrl;

    const adminid=localStorage.getItem("adminid")
    console.log(localStorage.getItem("adminid"));
    const navigate=useNavigate()
  
    useEffect(()=>{
      if(adminid==null){
        navigate("/admin-login")
      }
    },[])
  
  

    const fetchEmployerRequests = () => {
        axiosInstance.post('viewemployerreq')
            .then((result) => {
                console.log(result);
                setEmp(result.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchEmployerRequests();
    }, []);

    const approvefn = (id) => {
        axiosInstance.post(`approveempbyid/${id}`)
            .then((res) => {
                console.log('Employer approved:', res);
                toast.success("Approved Successfully")
                fetchEmployerRequests(); 
            })
            .catch((err) => {
                console.log('Error approving employer:', err);
            });
    };

    const rejectfn = (id) => {
        axiosInstance.post(`rejectempbyid/${id}`)
            .then((res) => {
                console.log('Employer approved:', res);
                toast.success("Request Rejected")
                fetchEmployerRequests(); 
            })
            .catch((err) => {
                console.log('Error approving employer:', err);
            });
    };

    
    return (
    <div className="col-9">
      <div className="workerreq-mainbox">
        <div className="admindash-viewalert col-12">
          <div className="admindash-shrink">worker Requests</div>
          <div className="row d-flex" style={{marginTop:"30px"}}>
            {/* <div className="col-12 "> */}
            {emp && emp.length ? (
              emp.map((a) => {
                return (

            <div className="col-3 admin-alert-boxinside">
                <div className="counsellor-dashpic row d-flex">
                  <div className="col-2">
                    <img src={`${url}/${a?.image?.filename}`} alt="image icon" className="avatar" />
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="col-8 workerreq-para">
                    <p>
                      {a?.name}
                      <br />
                      worker Id: {a?.empid}
                      <br />
                      {a?.contact}
                      <br/>
                      {a?.location}
                    </p>
                  </div>
                </div>

                <div className="viewmore-dashbox">
                  <button type="submit" className="viewmoreadmin-accept" onClick={() => approvefn(a?._id)}>Accept</button>
                  <button type="submit" className="viewmoreadmin-reject" onClick={() => rejectfn(a?._id)}>Reject</button>
                </div>
            </div>

);
})
) : (
<div className="viewcounsellor-lottiereqq">
    No request found
</div>       
 )}


          </div>
        </div>
      </div>
    </div>
  )
}

export default Employerreq
