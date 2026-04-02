// import React from "react";
import "./ViewRecentJobs.css";
import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import axiosInstance from "../../Constants/Baseurl";
import Jobreqsingle from "../Jobreqsingle";
import { imageBaseUrl } from "../../Constants/Baseurl";

function ViewRecentJobs() {
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
        alert("Failed to fetch user details",err);
      });
  }, [category]);

  // const [job, setJob] = useState([""]);
  const [show, setShow] = useState(false);
  // const [openRequests, setOpenRequests] = useState(false);
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
    <>
      <div className="container">
        <div className="-main row mt-3">
          <div className="worker-recentjob-head">
            <p>Recent Job Openings</p>
          </div>

          <div className="row row-cols-1 mx-3 row-cols-md-2 g-4 p-3">
            {recentjobdata.length > 0 ? (
              recentjobdata.map((data) => {
                return (
                  <div className="col mb-5 ">
                    <div className="row recentjob-userbox ">
                      <div className="col-7 ">
                        <div>
                          <img
                            src={`${url}/${data.custid?.image?.filename}`}
                            className="recentjob-userboximage "
                            alt="image"
                          />
                        </div>
                        <div className=" mt-4">
                          <span>
                            <h4>{data.jobname}</h4>
                          </span>
                        </div>
                        <div className="" style={{ textAlign: "justify" }}>
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
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Jobreqsingle
          close={handleClose}
          jobId={selectedJobId}
          refreshJobList={handleRefresh}
        />
      </Modal>
    </>
  );
}

export default ViewRecentJobs;
