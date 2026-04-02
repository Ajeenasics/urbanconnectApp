import "./WorkRecentJobOpen.css";
import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import EmpViewSingleJobReq from "../EmpJobReq/EmpViewSingleJobReq";
import { imageBaseUrl } from "../../Constants/Baseurl";

function ViewRecentEmpJobs() {
  const url = imageBaseUrl;

  const [data, setData] = useState("");

  useEffect(() => {
    axiosInstance
      .post("viewAllEmpPostJob")
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        alert("Failed to fetch user details",err);
      });
  }, []);

  console.log(data, "empjobdata");

  const navigate = useNavigate();

  const navigateToViewEmpRecentJobs = () => {
    navigate("/worker-empjobreq");
  };

  const [show, setShow] = useState(false);
  // const [openRequests, setOpenRequests] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null); //for passing _id as prop

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedJobId(id);
    setShow(true);
  };

  return (
    <>
      <div className="container">
        <div className="bestcandidate-main row">
          <div className="recentjob-head">
            <p>Recent Job Openings</p>
          </div>

          <div className="row row-cols-1 mx-3 row-cols-md-2 g-4 p-3">
            {data.length > 0 ? (
              data.slice(0, 4).map((a) => {
                return (
                  <div className="col mb-5 ">
                    <div className="row recentjob-userbox ">
                      <div className="col-7 ">
                        <div>
                          <img
                            src={`${url}/${a?.empId?.image?.filename}`}
                            className="recentjob-userboximage "
                            alt="image"
                          />
                        </div>
                        <div className=" mt-4">
                          <span>
                            <h4>{a?.jobName}</h4>
                          </span>
                        </div>
                        <div className="">
                          <p>{a.jobDetails.slice(0, 100)}...</p>
                        </div>
                      </div>

                      <div className="col">
                        <div className="col-8 bestcandidate-userboxh5 mt-2">
                          <h5>
                            <span className="badge bg-secondary">
                              {a?.jobSalary}/{a?.jobSalaryType}
                            </span>
                          </h5>
                        </div>
                        <div>
                          <p>
                            <b>Posted On</b>{" "}
                            <i>{new Date(a?.date).toLocaleDateString()}</i>
                          </p>
                        </div>
                        <div>
                          <p>
                            <b>Posted By</b> <i> {a?.empId?.name}</i>
                          </p>
                        </div>
                        <div className="col-4 recentjob-userbutton">
                          <button
                            type="submit"
                            onClick={() => handleShow(a?._id)}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h3>No Records Required</h3>
            )}
          </div>

          <div className="bestcandidate-userboxbutton mt-4 mb-5">
            <button type="submit" onClick={navigateToViewEmpRecentJobs}>
              ViewMore
            </button>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <EmpViewSingleJobReq close={handleClose} jobId={selectedJobId} />
        </Modal>
      </div>
    </>
  );
}

export default ViewRecentEmpJobs;
