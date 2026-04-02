import  { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import axiosInstance from "../../Constants/Baseurl";
import ViewSingleEmpInterviews from "./ViewSingleEmpInterviews";
import { toast } from "react-toastify";
import { imageBaseUrl } from "../../Constants/Baseurl";

function ViewServieceAcceptList() {
  const workerid = localStorage.getItem("workerid");
  console.log(workerid);
  const url = imageBaseUrl;

  const [data, setData] = useState();
  const fetchEmployerRequests = () => {
    axiosInstance
      .get(`/view_accept_servieces/${workerid}`)
      .then((result) => {
        console.log(result, "Pending Requests Data");
        setData(result.data); // Assuming response is the array of pending requests
      })
      .catch((err) => {
        console.error("Error fetching pending requests:", err);
      });
  };

  useEffect(() => {
    fetchEmployerRequests();
  }, [workerid]);

  const [show, setShow] = useState(false);
  // const [openRequests, setOpenRequests] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState({
    jobId: null,
    custId: null,
  }); // State for storing selected job and customer IDs

  // const [showinterview, setShowInterview] = useState(false);
  // const handleCloseInterview = () => setShowInterview(false);
  // const handleShowInterview = () => setShowInterview(true);

  const handleRefresh = () => {
    setShow(false); // Close the modal after refreshing
  };

  const handleClose = () => setShow(false);
  // const handleShow = (id) => {
  //   setSelectedInterview(id);
  //   setShow(true);
  // };

  const Complteted = (id) => {
    axiosInstance
      .post(`toCompletedServiceRequest/${id}`)
      .then((res) => {
        console.log("Employer approved:", res);
        toast.success("Accepted Successfully");
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
            <div className="admindash-shrink">Accepted ServiceList</div>
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

              {data && data.length ? (
                data
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
                                onClick={() => Complteted(a?._id)}
                              >
                                Completed
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
        <Modal show={show} onHide={handleClose} centered>
          <ViewSingleEmpInterviews
            close={handleClose}
            interview_id={selectedInterview}
            refreshJobList={handleRefresh}
          />
        </Modal>
      </div>
    </>
  );
}

export default ViewServieceAcceptList;
