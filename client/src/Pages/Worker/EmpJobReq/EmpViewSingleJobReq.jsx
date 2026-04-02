import  { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../Jobreqsingle.css";
import axiosInstance from "../../Constants/Baseurl";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
// import { imageBaseUrl } from "../../Constants/Baseurl";

function EmpViewSingleJobReq({ close, jobId, refreshJobList }) {
  // const url = imageBaseUrl;
  const workerid = localStorage.getItem("workerid");

  const [data, setData] = useState({});

  const [jobapplydata, setJobApplyData] = useState({
    jobid: jobId,
    workerId: workerid,
    empId: "",
  });

  const fetchEmployerRequests = () => {
    axiosInstance
      .post(`viewEmpPostJobById/${jobId}`)
      .then((result) => {
        console.log(result);
        setData(result.data.data);
        setJobApplyData((prevWorker) => ({
          ...prevWorker,
          empId: result.data.data.empId._id,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEmployerRequests();
  }, []);

  console.log(jobapplydata, "jobapplydata");

  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`empjobreq/${jobId}`, jobapplydata)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success("Request Submitted Successfully");
          refreshJobList();
        } else if (res.data.status === 400) {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        // toast.warn("Something Went Wrong");
      });
  };

  return (
    <>
      <div className="jobreq-singlemain">
        <div className="jobreq-singlebox">
          <Container className="user-info-container">
            <div className="ri-arrow-go-back-line" onClick={close} />
            <div className="user-profileviewimage">
              {/* <img src={`${url}/${data.custid?.image?.filename}`} width="100px" height="100px" alt="User" /> */}
            </div>
            <Form onSubmit={submitfn}>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  JobName
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {data?.jobName}
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
                  {data?.jobDetails}
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
                  {data?.jobType}
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
                  {data?.jobSalary}/{data?.jobSalaryType}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Posted By
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {data?.empId?.name}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Contact mail
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {data?.empId?.email}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Contact No
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {data?.empId?.contact}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Address
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {data?.empId?.address},{data?.empId?.location}
                </Col>
              </Row>
              <Row className="user-info-row">
                <Col className="user-info-label" md={4}>
                  Posted On
                </Col>
                <Col className="user-info-coln" md={1}>
                  :
                </Col>
                <Col className="user-info-value" md={7}>
                  {new Date(data?.date).toLocaleDateString()}
                </Col>
              </Row>
              <Row className="user-profilebottm-button">
                <Col>
                  <Button type="submit" className="user-profilebottm-end">
                    Apply
                  </Button>
                  <Button
                    type="button"
                    className="user-profilebottm-end"
                    onClick={close}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
}

export default EmpViewSingleJobReq;
