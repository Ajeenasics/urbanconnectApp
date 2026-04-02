import {useEffect,useState} from 'react'
import {  Col, Container, Row, Form } from "react-bootstrap";
import axiosInstance from '../../Constants/Baseurl';

function ViewUserComplaintSingle({compId,close}) {
    // const custid = localStorage.getItem("custid");

    const [data, setData] = useState({});
    const fetchEmployerRequests = () => {
        axiosInstance
          .post(`viewcomplaintById/${compId}`)
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
    {
      data?.against==="customer"?(
        <div>
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
                Worker Name
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {data?.workerId?.name}
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
              Customer Email
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {data?.workerId?.email}
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
                {data?.workerId?.phone}
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Subject
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {data?.subject}
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
    </div>
      ):(
        <div>
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
                Customer Name
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {data?.customerId?.name}
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
              Customer Email
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {data?.customerId?.email}
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
                {data?.customerId?.phone}
              </Col>
            </Row>
            <Row className="user-info-row">
              <Col className="user-info-label" md={4}>
                Subject
              </Col>
              <Col className="user-info-coln" md={1}>
                :
              </Col>
              <Col className="user-info-value" md={7}>
                {data?.subject}
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
    </div>
      )
    }
   
    </>
  )
}

export default ViewUserComplaintSingle
