import  { useEffect, useState } from 'react'
import './ViewSingleUsers.css'
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from '../../../Constants/Baseurl';
import { imageBaseUrl } from '../../../Constants/Baseurl';

function ViewSingleWork() {
    const [worker, setworker] = useState([]);
    const url = imageBaseUrl;
    const adminid=localStorage.getItem("adminid")
    console.log(localStorage.getItem("adminid"));
    const navigate=useNavigate()
  
    useEffect(()=>{
      if(adminid==null){
        navigate("/admin-login")
      }
    },[])

    const {workerid} =useParams();
    console.log(workerid,'custid');
  
    const fetchCustomerDetails = () => {
      axiosInstance
        .post(`viewworkerbyid/${workerid}`)
        .then((result) => {
          console.log(result);
          setworker(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      fetchCustomerDetails();
    }, []);

    const navigateToViewAllWork=(id)=>{
        navigate('/admin-viewallworker')
    }

    const remove = (id) => {
      axiosInstance.post(`removebyadminbyworkerid/${id}`)
          .then((res) => {
              console.log('Employer approved:', res);
              toast.success("Worker Removed")
              (); 
              navigate('/admin-viewallworker')
          })
          .catch((err) => {
              console.log('Error approving employer:', err);
          });
  };
  return (
    <>
        <section className='container mb-5 mt-3'>
            <div className='viewsingleworker-maindiv'>
            <Container className="">
                    <div className=' ri-arrow-go-back-line goback' onClick={navigateToViewAllWork}  />
                    <div className='viewsinglecust-profileviewimage'>
                        <img 
                        src={`${url}/${worker.image?.filename}`} width="100px" height="100px" alt="User" 
                        />
                    </div>
                    <Form className='mx-2'>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Worker_id</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{worker?._id?.slice(0, 5)}</h5>

                               
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Worker Name</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{worker?.name}</h5>

                                
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Worker Designation</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{worker?.workertype}</h5>

                                
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Worker_ adress</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                               
                            <h5>{worker?.address}</h5>
                                    
                                
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Contact Number</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{worker?.contact}</h5>     
                               
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Worker_Location</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                                    <h5>{worker?.location}</h5>
                               
                            </Col>
                        </Row>
                        
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Email</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{worker?.email}</h5>

                                
                            </Col>
                        </Row>
                        
                            
                       
                        <Row className="viewsinglecust-remove-button">
                            <Col>
                                
                                    <Button type="button" className="viewsinglecust-remove" 
                                    onClick={()=>remove(worker?._id)}
                                    >Remove</Button>
                                    

                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </section>
    </>
  )
}

export default ViewSingleWork
