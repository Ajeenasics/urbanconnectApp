import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./EmpJobReq.css";
import axiosInstance from "../../Constants/Baseurl";
import EmpViewSingleJobReq from "./EmpViewSingleJobReq";
// import { imageBaseUrl } from "../../Constants/Baseurl";

function EmpViewJobReq() {
  const workerid = localStorage.getItem("workerid");
  console.log(workerid);

  const [job, setJob] = useState([""]);
  // const url = imageBaseUrl;
  const [show, setShow] = useState(false);
  // const [openRequests, setOpenRequests] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null); //for passing _id as prop

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedJobId(id);
    setShow(true);
  };

  const fetchEmployerRequests = () => {
    axiosInstance
      .post("viewAllEmpPostJob")
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

  const handleRefresh = () => {
    fetchEmployerRequests();
    setShow(false); // Close the modal after refreshing
  };

  return (
    <>
      <div className="workerview-jonreqmaincontainer">
        <div className="workerjobreq-mainbox">
          <div className="workjob-viewalert col-12">
            <div className="worker-shrink">Employer Job Requests</div>
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

              {job && job.length ? (
                job
                  .slice()
                  .reverse()
                  .map((a) => {
                    return (
                      <div className="col-3 worker-job-boxinside">
                        <div className="counsellor-dashpic row d-flex">
                          <h6 className="mt-2">
                            <span
                              style={{ display: "grid", alignItems: "end" }}
                              className="badge bg-secondary"
                            >
                              {a?.jobType}
                            </span>
                          </h6>
                          <div className="row mt-3">
                            <div className="col">
                              <p>
                                <b>Employer Name:</b>
                              </p>
                            </div>
                            <div className="col-5">
                              <p>
                                <i>{a?.empId?.name}</i>
                              </p>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col">
                              <p>
                                <b>Employer Mail:</b>
                              </p>
                            </div>
                            <div className="col">
                              <p>
                                <i>{a?.empId?.email}</i>
                              </p>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col">
                              <p>
                                <b>JobTitle:</b>
                              </p>
                            </div>
                            <div className="col">
                              <p>
                                <i>{a?.jobName}</i>
                              </p>
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
                          </div>
                        </div>

                        <div className="jobreq-viewmore-dashbox">
                          <button
                            type="submit"
                            className="viewmoreadmin-accept"
                            onClick={() => handleShow(a._id)}
                          >
                            View More
                          </button>
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
        <Modal show={show} onHide={handleClose} centered>
          <EmpViewSingleJobReq
            close={handleClose}
            jobId={selectedJobId}
            refreshJobList={handleRefresh}
          />
        </Modal>
      </div>
    </>
  );
}

export default EmpViewJobReq;
