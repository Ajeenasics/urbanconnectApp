import  { useEffect, useState } from "react";
import "./Jobreq.css";
import axiosInstance from "../Constants/Baseurl";
// import { Modal } from "react-bootstrap";
// import Jobreqsingle from "./Jobreqsingle";
// import WorkerNav2 from "../Common/Navbar/Worker/WorkerNav2";
import { toast } from "react-toastify";
import { imageBaseUrl } from "../Constants/Baseurl";

function CustomerFReq() {
  const workerid = localStorage.getItem("workerid");
  console.log(workerid);
  const url = imageBaseUrl;

  const [user, setUser] = useState("");

  const fetchEmployerRequests = () => {
    axiosInstance
      .post(`/getPendingRequests_ByWorkerid/${workerid}`)
      .then((result) => {
        console.log(result, "Pending Requests Data");
        setUser(result.data); // Assuming response is the array of pending requests
      })
      .catch((err) => {
        console.error("Error fetching pending requests:", err);
      });
  };

  useEffect(() => {
    fetchEmployerRequests();
  }, []);

  const approvefn = (id) => {
    axiosInstance
      .post(`toAcceptServiceRequest/${id}`)
      .then((res) => {
        console.log("Employer approved:", res);
        toast.success("Accepted Successfully");
        fetchEmployerRequests();
      })
      .catch((err) => {
        console.log("Error approving employer:", err);
      });
  };

  const rejectfn = (id) => {
    axiosInstance
      .post(`toRejectServiceRequest/${id}`)
      .then((res) => {
        console.log("Employer approved:", res);
        toast.success("Request Rejected");
        fetchEmployerRequests();
      })
      .catch((err) => {
        console.log("Error approving employer:", err);
      });
  };

  return (
    <>
      <div className="workerview-jonreqmaincontainer">
        <div className="workerjobreq-mainbox">
          <div className="workjob-viewalert col-12">
            <div className="admindash-shrink">Customer Requests</div>
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
            <div className="row d-flex" style={{ marginTop: "30px" }}>
              {/* <div className="col-12 "> */}

              {user && user.length ? (
                user
                  .slice()
                  .reverse()
                  .map((a) => {
                    return (
                      <div className="col-3 worker-job-boxinside">
                        <div className="counsellor-dashpic row d-flex">
                          <div className="row mt-3">
                            <div className="col">
                              <img
                                src={`${url}/${a?.custid?.image?.filename}`}
                                alt="worker"
                              />
                              <div>
                                <b>Customer Name:</b>
                              </div>
                            </div>
                            <div className="col-5 mt-5">
                              <div>
                                <i>{a?.custid?.name}</i>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col">
                              <div>
                                <b>Customer Mail:</b>
                              </div>
                            </div>
                            <div className="col">
                              <div>
                                <i>{a?.custid?.email}</i>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col">
                              <div>
                                <i>{a?.jobname}</i>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col">
                              <p>
                                <b>Posted On:</b>
                              </p>
                            </div>
                            <div className="col">
                              <p>
                                <i>{new Date(a.date).toLocaleDateString()}</i>
                              </p>
                            </div>
                            <div className="viewmore-">
                              <button
                                type="submit"
                                className="viewmoreadmin-accept"
                                onClick={() => approvefn(a?._id)}
                              >
                                Accept
                              </button>
                              <button
                                type="submit"
                                className="viewmoreadmin-reject"
                                onClick={() => rejectfn(a?._id)}
                              >
                                Reject
                              </button>
                            </div>
                          </div>
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
    </>
  );
}

export default CustomerFReq;
