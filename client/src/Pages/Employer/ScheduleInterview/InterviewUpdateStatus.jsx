import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosInstance from "../../Constants/Baseurl";
import { imageBaseUrl } from "../../Constants/Baseurl";

function InterviewUpdateStatus({ close, jobId }) {
  const [postjobdata, setPostJobData] = useState([]);
  console.log(jobId, "new");
  const url = imageBaseUrl;

  const fetchEmployerRequests = () => {
    axiosInstance
      .post(`viewInterviewById/${jobId}`)
      .then((result) => {
        console.log(result);
        setPostJobData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEmployerRequests();
  }, [jobId]);

  return (
    <>
      <div className="empview-postjob-singlemain">
        <div className="empview-postjob-singlebox">
          <Container className="user-info-container">
            <div className=" ri-arrow-go-back-line" onClick={close} />
            <div
              className="user-profileviewimage"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={`${url}/${postjobdata.workerId?.image?.filename}`}
                width="100px"
                height="100px"
                alt="User"
              />
            </div>
            <Form>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Worker Name
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {postjobdata?.workerId?.name}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Worker Type
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {postjobdata?.workerId?.workertype}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Worker Location
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {postjobdata?.workerId?.location}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Worker Email
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {postjobdata?.workerId?.email}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Job Name
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {postjobdata?.jobid?.jobName}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Job Type
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {postjobdata?.jobid?.jobType}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Job Details
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {postjobdata?.jobid?.jobDetails}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Job Salary
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {postjobdata?.jobid?.jobSalary}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Job Salary Type
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {postjobdata?.jobid?.jobSalaryType}
                </Col>
              </Row>

              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Interview Scheduled on
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {new Date(postjobdata?.interview_date).toLocaleDateString()}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Interview Scheduled on
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  <p>
                    {postjobdata?.interview_location},{postjobdata?.city},
                    {postjobdata?.state}.
                  </p>
                </Col>
              </Row>

              <div
                className="mt-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "90px",
                }}
              >
                {/* <button style={{background:'Green',color:'#fff',border:'none',borderRadius:'20px', width:'100px'}}
            onClick={()=>selectcandidate(postjobdata?._id)}
            >Select</button>
            <button style={{background:'Red',color:'#fff',border:'none',borderRadius:'20px',width:'100px'}}
            onClick={()=>rejectcandidate(postjobdata?._id)}
            >Reject</button> */}
              </div>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
}

export default InterviewUpdateStatus;
