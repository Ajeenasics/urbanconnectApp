import  { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import "./ViewAcceptedPostJobs.css";
import { Modal } from "react-bootstrap";
import PaymentReqAccJob from "../GotoPayments/PaymentReqAccJob";

function ViewAcceptedPostJobs() {
  const custid = localStorage.getItem("custid");
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`viewApprovedReqsbycustomerId/${custid}`)
      .then((result) => {
        console.log(result);
        setData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [custid]);

  // const navigate = useNavigate();

  // const navigateToacceptjobreq = (id) => {
  //   navigate(`/user-viewjobstatus/${id}`);
  // };

  const [show, setShow] = useState(false);
  const [approvalid, setApprovalId] = useState(false);
  const [selectedJobId, setSelectedJobid] = useState(null); //for passing _id as prop

  const handleClose = () => setShow(false);
  const handleShow = (id, app_id) => {
    setSelectedJobid(id);
    setApprovalId(app_id);
    setShow(true);
  };

  const handleRefresh = () => {
    setShow(false); // Close the modal after refreshing
  };

  return (
    <div>
      <div
        className="workerview-jonreqmaincontainer"
        style={{ minHeight: "80vh" }}
      >
        <div className="workerjobreq-mainbox mb-5">
          <div className="workjob-viewalert col-12">
            <div className="admindash-shrink">Accepted Work Requests</div>
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
            <div className="row d-flex" style={{ marginTop: "10px" }}>
              {data && data.length ? (
                data
                  .slice()
                  .reverse()
                  .map((a) => (
                    <div
                      className="col-3 userview-joblist-boxinside mt-3"
                      key={a._id}
                    >
                      <div className="row mt-3">
                        <div className="col-5 userview-head">Work Name</div>
                        <div className="col-7">: {a?.jobid?.jobname}</div>
                        <div className="col-5 userview-head">Posted On</div>
                        <div className="col-7">
                          : {a?.jobid?.date.slice(0, 10)}
                        </div>
                        <div className="col-5 userview-head">Worker Name</div>
                        <div className="col-7">: {a?.workerId?.name}</div>
                        <div className="col-5 userview-head">Worker No</div>
                        <div className="col-7">: {a?.workerId?.contact}</div>
                        <div className="col-5 userview-head">Work Date</div>
                        <div className="col-7">: {a?.workDate}</div>
                        <div className=" viewworkreqacpt  mb-4">
                          <button
                            type="submit"
                            onClick={() => handleShow(a?.jobid?._id, a?._id)}
                          >
                            Go to Payment
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="viewcounsellor-lottiereqq">
                  No request found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <PaymentReqAccJob
          close={handleClose}
          jobid={selectedJobId}
          approvalid={approvalid}
          refreshJobList={handleRefresh}
        />
      </Modal>
    </div>
  );
}

export default ViewAcceptedPostJobs;
