// import React from "react";
import "./WorkRecentJobOpen.css";
// import img from "../../../Assets/recent_job.png";
import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import Jobreqsingle from "../Jobreqsingle";
import axiosInstance from "../../Constants/Baseurl";
import { imageBaseUrl } from "../../Constants/Baseurl";

function WorkRecentJobOpen() {
  const workerid = localStorage.getItem("workerid");
  console.log(workerid);

  const [user, setUser] = useState("");

  useEffect(() => {
    axiosInstance
      .post(`viewworkerbyid/${workerid}`)
      .then((result) => {
        console.log(result);
        setUser(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [workerid]);

  const category = user.workertype;

  console.log(category, "category");

  // const navigate = useNavigate();

  const [recentjobdata, setRecentJobData] = useState("");

  const url = imageBaseUrl;

  useEffect(() => {
    axiosInstance
      .post(`/viewjobreqs/${category}`)
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          setRecentJobData(res.data.data);
        }
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  }, [category]);

  // const navigateToViewRecentJobs = () => {
  //   navigate("/worker-custreq");
  // };

  const [show, setShow] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null); //for passing _id as prop

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedJobId(id);
    setShow(true);
  };

  const handleRefresh = () => {
    setShow(false); // Close the modal after refreshing
  };

  return (
    <div>
      <div className="container">
        <div className="bestcandidate-main row">
          <div className="recentjob-head">
            <p>Customer Job Openings</p>
          </div>

          <div className="row row-cols-1 mx-3 row-cols-md-2 g-4 p-3">
            {recentjobdata.length > 0 ? (
              recentjobdata
                .slice(0, 4)
                .reverse()
                .map((data) => {
                  return (
                    <div className="col mb-5 ">
                      <div className="row recentjob-userbox ">
                        <div className="col-7 ">
                          <div>
                            <img
                              src={`${url}/${data?.custid?.image?.filename}`}
                              className="recentjob-userboximage "
                              alt="image"
                            />
                          </div>
                          <div className=" mt-4">
                            <span>
                              <h4>{data.jobname}</h4>
                            </span>
                          </div>
                          <div className="">
                            <p>{data.workdetails.slice(0, 175)}...</p>
                          </div>
                        </div>

                        <div className="col">
                          <div className="col-8 bestcandidate-userboxh5 mt-2">
                            <h5>
                              <span className="badge bg-secondary">
                                {data.category}
                              </span>
                            </h5>
                          </div>
                          <div>
                            <p>
                              <b>Posted On</b>{" "}
                              <i>{new Date(data?.date).toLocaleDateString()}</i>
                            </p>
                          </div>
                          <div>
                            <p>
                              <b>Posted By</b> <i> {data?.custid?.name}</i>
                            </p>
                          </div>
                          <div className="col-4 recentjob-userbutton">
                            <button
                              type="submit"
                              onClick={() => handleShow(data?._id)}
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

          {/*<div className="bestcandidate-userboxbutton mt-4 mb-5">
            <button type="submit" onClick={navigateToViewRecentJobs}>ViewMore</button>
        </div>*/}
        </div>
        {/* <div className="">
        <div className="bestcandidate-userbottommain">
            <p>Want better recommendations ? Turn on your location & We will show Ads nearby.</p>
            <div className="bestcandidate-userbottonbtm">
            <div>Turn On Location</div>
        </div>

        </div>
      </div> */}
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Jobreqsingle
          close={handleClose}
          jobId={selectedJobId}
          refreshJobList={handleRefresh}
        />
      </Modal>
    </div>
  );
}

export default WorkRecentJobOpen;
