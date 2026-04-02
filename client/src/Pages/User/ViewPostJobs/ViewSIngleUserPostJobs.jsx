import {useState,useEffect} from 'react'
import {  Col, Container, Row, Form } from "react-bootstrap";
import axiosInstance from '../../Constants/Baseurl';

function ViewSIngleUserPostJobs({close, postjob_id}) {
    // const custid = localStorage.getItem("custid");

    const [data, setData] = useState({});
    const fetchEmployerRequests = () => {
        axiosInstance
          .post(`viewjobreqsbyid/${postjob_id}`)
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
                Job Name
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {data?.jobname}
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Job Category
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {data?.category}
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
                {data?.date?.slice(0,10)}
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Work Details
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}  style={{ whiteSpace: 'pre-wrap',wordBreak:"break-word" }}>
                {data?.workdetails}
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

export default ViewSIngleUserPostJobs
