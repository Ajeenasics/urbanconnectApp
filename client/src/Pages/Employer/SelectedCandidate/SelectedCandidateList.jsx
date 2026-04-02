import { useState, useEffect } from "react";
import axiosInstance from "../../Constants/Baseurl";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { imageBaseUrl } from "../../Constants/Baseurl";

function SelectedCandidateList() {
  const url = imageBaseUrl;

  const navigate = useNavigate();
  const [employerid] = useState(localStorage.getItem("employer"));

  useEffect(() => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("employer") == null
    ) {
      navigate("/");
    }
  }, [navigate]);

  const [data, setData] = useState([]);

  const fetchEmployerRequests = () => {
    axiosInstance
      .post(`viewSelectedCandByEmpId/${employerid}`)
      .then((result) => {
        console.log(result, "empjobreqdata");
        setData(result.data.data);
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
      <div className="empview-postjobmaincontainer">
        <div className="container empviewpostjob-mainbox">
          <div className="empviewpostjob-viewalert ">
            <div className="empviewpostjob-shrink">Selected Candidate</div>
            <div
              className="row  row-cols-1 row-cols-md-4 g-4"
              style={{ marginTop: "30px" }}
            >
              {/* <div className="col-12 "> */}

              {data && data.length ? (
                data.map((a) => {
                  return (
                    <div className="col-3 empviewpostjob-boxinside">
                      <div className="empviewpostjob-dashpic row ">
                        <h6 className="mt-2">
                          <span
                            style={{ display: "grid", alignItems: "end" }}
                            className="badge bg-secondary"
                          >
                            Candidate Details
                          </span>
                        </h6>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            src={`${url}/${a?.workerId?.image?.filename}`}
                            width="100px"
                            height="100px"
                            style={{ borderRadius: "50%" }}
                            alt="User"
                          />
                        </div>
                        <div className="row mt-3">
                          <div className="col-6">
                            <p>
                              <b> Name:</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p>
                              <i>{a?.workerId?.name}</i>
                            </p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-6">
                            <p>
                              <b> Email:</b>
                            </p>
                          </div>
                          <div
                            className="col-6"
                            style={{ wordBreak: "break-word" }}
                          >
                            <p>
                              <i>{a?.workerId?.email}</i>
                            </p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-6">
                            <p>
                              <b> Location:</b>
                            </p>
                          </div>
                          <div
                            className="col-6"
                            style={{ wordBreak: "break-word" }}
                          >
                            <p>
                              <i>{a?.workerId?.city}</i>
                            </p>
                          </div>
                        </div>
                        <h6 className="mt-2">
                          <span
                            style={{ display: "grid", alignItems: "end" }}
                            className="badge bg-secondary"
                          >
                            Job Details
                          </span>
                        </h6>

                        <div className="row mt-3">
                          <div className="col-6">
                            <p>
                              <b>Job Name:</b>
                            </p>
                          </div>
                          <div
                            className="col-6"
                            style={{ wordBreak: "break-word" }}
                          >
                            <p>
                              <i>{a?.jobid?.jobName}</i>
                            </p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-6">
                            <p>
                              <b>Job Salary:</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p>
                              <b>{a?.jobid?.jobSalary}</b>/
                              {a?.jobid?.jobSalaryType}
                            </p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-6">
                            <p>
                              <b>Location:</b>
                            </p>
                          </div>
                          <div
                            className="col-6"
                            style={{ wordBreak: "break-word" }}
                          >
                            <p>
                              <i>{a?.interview_location}</i>/{a?.state}
                            </p>
                          </div>
                        </div>

                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          {/* <button type="submit" className="empviewinterview-accept" 
                 onClick={()=>handleShow(a?._id)}                    
                    >
                      View More
                    </button> */}
                        </div>
                      </div>

                      {/* <div className="jobreq-viewmore-dashbox">
                  <button style={{background:'Green',color:'#fff',border:'none',borderRadius:'20px', width:'100px'}}
            onClick={()=>selectcandidate(a?._id)}
            >Select</button>
            <button style={{background:'Red',color:'#fff',border:'none',borderRadius:'20px',width:'100px'}}
            onClick={()=>rejectcandidate(a?._id)}
            >Reject</button>
                  </div> */}
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
    </>
  );
}

export default SelectedCandidateList;
