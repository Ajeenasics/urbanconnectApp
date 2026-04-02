import { useEffect, useState } from 'react'
import {  Col, Container, Row, Form } from "react-bootstrap";
import axiosInstance from '../../Constants/Baseurl';
import './ViewEmpInterviewsList.css'

function ViewSingleEmpInterviews({close, interview_id}) {
    // const workerid = localStorage.getItem("workerid");
    const [data, setData] = useState({});
    const fetchEmployerRequests = () => {
        axiosInstance
          .post(`viewInterviewById/${interview_id}`)
          .then((result) => {
            console.log(result);
            setData(result.data.data);
            // setWorker((prevWorker) => ({
            //   ...prevWorker,
            //   customerId: result.data.data.custid._id
            // }));
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      useEffect(() => {
        fetchEmployerRequests();
      }, []);
    
      
    
     
    
      
    return (
    <>
        <div className="jobreq-singlemain">
      <div className="worker-interview-singlebox">
        <Container className="user-info-container">
          <div className="ri-arrow-go-back-line" onClick={close} />
          <div className="user-profileviewimage">
            {/* <img src={`${url}/${data.custid?.image?.filename}`} width="100px" height="100px" alt="User" /> */}
          </div>
          <Form >
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Employer Name
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
                Job
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {data?.workerId?.workertype}
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Date
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {data?.interview_date?.slice(0,10)}
              </Col>
            </Row>
            {/* <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Time
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {data?.interview_date?.slice(0,10)}
              </Col>
            </Row> */}
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Location
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}  style={{
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  }}>
                {data?.interview_location},{data?.city}
              
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Contact
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {data?.empId?.contact}
              </Col>
            </Row>
            
            
            
            
            

            {/* <Row className="user-profilebottm-button">
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
            </Row> */}
          </Form>
        </Container>
      </div>
    </div>
    </>
  )
}

export default ViewSingleEmpInterviews
