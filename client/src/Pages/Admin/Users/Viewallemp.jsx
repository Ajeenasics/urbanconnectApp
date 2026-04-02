import  { useEffect, useState } from "react";
import "../Requests/Workerreq.css";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { imageBaseUrl } from "../../Constants/Baseurl";

function Viewallemp() {
    const [cust, setcust] = useState([]);
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
      axiosInstance
        .post("viewallemployer")
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

    const rejectfn = (id) => {
      axiosInstance.post(`removebyadminbyempid/${id}`)
          .then((res) => {
              console.log('Employer approved:', res);
              toast.success("Employer Removed")
              fetchEmployerRequests(); 
          })
          .catch((err) => {
              console.log('Error approving employer:', err);
          });
  };

  const navigateToViewEmp=(id)=>{
    navigate(`/admin-viewemp/${id}`)
}

  return (
    <div className="col-9">
    <div className="workerreq-mainbox">
      <div className="admindash-viewalert col-12">
        <div className="admindash-shrink">Employers</div>
        <div className="row d-flex" style={{ marginTop: "30px" }}>
          {/* <div className="col-12 "> */}

         {cust && cust.length ? (
            cust.map((a) => {
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
                     {a?.email}
                        <br />
                       Id: {a?.empid}

                        <br />
                        {a?.location}

                      </p>
                    </div>
                  </div>

                  <div className="viewmore-dashbox">
                    <button type="submit" className="viewmoreadmin-accept" onClick={() => navigateToViewEmp(a?._id)}>
                      View
                    </button>
                    <button type="submit" className="viewmoreadmin-reject" onClick={() => rejectfn(a?._id)}>
                      Remove
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
  </div>
  )
}

export default Viewallemp
