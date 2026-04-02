import  { useEffect, useState } from "react";
import axiosInstance from "../../Constants/Baseurl";
import { Modal } from "react-bootstrap";
import "./Workerviewjobstatus.css";
import WorkerViewWorkStatus from "../WorkStatus/WorkerViewWorkStatus";

function WorkerviewWorkreqstatus() {
  const [job, setJob] = useState([]);
  const workerid = localStorage.getItem("workerid");
  const [showjobstatus, setShowWorkStatus] = useState(false);
  const [selectedJob, setSelectedJob] = useState({ jobId: null, custId: null });

  const handleCloseWorkStatus = () => setShowWorkStatus(false);
  const handleShowWorkStatus = () => setShowWorkStatus(true);

  const fetchEmployerRequests = async () => {
    try {
      const result = await axiosInstance.post(`/viewReqsbyWorkerid/${workerid}`);
      console.log(result.data, "Pending Requests Data");
      setJob(result.data.data); // Reverse before setting state
    } catch (err) {
      console.error("Error fetching pending requests:", err);
    }
  };

  useEffect(() => {
    fetchEmployerRequests();
  }, []);

  const handleStatusClick = (jobId, custId) => {
    setSelectedJob({ jobId, custId });
    handleShowWorkStatus();
  };

  return (
    <div className="workerview-jonreqmaincontainer">
      <div className="workerjobreq-mainbox">
        <div className="workjob-viewalert col-12">
          <div className="admindash-shrink">Work Requests</div>

          <div className="row d-flex " style={{ marginTop: "30px" }}>
            {job.length > 0 ? (
              job.filter((a) => a.approvalstatus === "accepted").map((a) => {
                const jobid = a?.jobid?._id;
                const custId = a?.customerId?._id;
                return (
                  <div key={jobid} className="col-3 worker-job-boxinside pt-3">
                    <div className="counsellor-dashpic row">
                      <div className="col-5 viewworkdetails">Work Name</div>
                      <div className="col-7">: {a?.jobid?.jobname}</div>
                      <div className="col-5 viewworkdetails">Work Details</div>
                      <div className="col-7">: {a?.jobid?.workdetails?.slice(0, 15)}...</div>
                      <div className="col-5 viewworkdetails">Preferred Date</div>
                      <div className="col-7">: {a?.workDate}</div>
                      <div className="col-5 viewworkdetails">Customer Name</div>
                      <div className="col-7">: {a?.customerId?.name}</div>
                      <div className="col-5 viewworkdetails">Location</div>
                      <div className="col-7">: {a?.customerId?.city}</div>
                      <div className="col-5 viewworkdetails">Contact</div>
                      <div className="col-7">: {a?.customerId?.phone || "-"}</div>
                    </div>
                    <div className="mb-4 mt-3" style={{ textAlign: "center" }}>
                      <button
                        type="submit"
                        className="viewmoreadmin-accept"
                        onClick={() => handleStatusClick(jobid, custId)}
                      >
                        Complete
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

      <Modal show={showjobstatus} onHide={handleCloseWorkStatus}>
        <WorkerViewWorkStatus
          close={handleCloseWorkStatus}
          jobId={selectedJob.jobId}
          custId={selectedJob.custId}
        />
      </Modal>
    </div>
  );
}

export default WorkerviewWorkreqstatus;
