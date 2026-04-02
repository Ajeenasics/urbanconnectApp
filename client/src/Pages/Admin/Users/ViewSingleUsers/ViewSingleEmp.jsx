import React, { useEffect, useState } from 'react'
import './ViewSingleUsers.css'
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from '../../../Constants/Baseurl';
import { imageBaseUrl } from '../../../Constants/Baseurl';

function ViewSingleEmp() {
    const [emp, setemp] = useState([]);
    const url = imageBaseUrl;
    const adminid=localStorage.getItem("adminid")
    console.log(localStorage.getItem("adminid"));
    const navigate=useNavigate()
  
    useEffect(()=>{
      if(adminid==null){
        navigate("/admin-login")
      }
    },[])

    const {empid} =useParams();
    console.log(empid,'custid');
  
    const fetchCustomerDetails = () => {
      axiosInstance
        .post(`viewempbyid/${empid}`)
        .then((result) => {
          console.log(result);
          setemp(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      fetchCustomerDetails();
    }, []);

    const navigateToViewAllCust=(id)=>{
        navigate('/admin-viewallemp')
    }

    const remove = (id) => {
      axiosInstance.post(`removebyadminbyempid/${id}`)
          .then((res) => {
              console.log('Employer approved:', res);
              toast.success("Employer Removed")
              fetchCustomerDetails(); 
              navigate('/admin-viewallemp')
          })
          .catch((err) => {
              console.log('Error approving employer:', err);
          });
  };
  return (
    <>
        <section className='container mb-5 mt-3'>
            <div className='viewsinglecust-maindiv'>
            <Container className="">
                    <div className=' ri-arrow-go-back-line goback' onClick={navigateToViewAllCust}  />
                    <div className='viewsinglecust-profileviewimage'>
                        <img 
                        src={`${url}/${emp.image?.filename}`} width="100px" height="100px" alt="User" 
                        />
                    </div>
                    <Form className='mx-2'>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Employer Id</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{emp.empid}</h5>

                               
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Employer Name</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{emp.name}</h5>

                                
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Address</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                               
                            <h5>{emp.address}</h5>
                                    
                                
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Contact Number</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{emp.contact}</h5>     
                               
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Location</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                                    <h5>{emp.location}</h5>
                               
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Email</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{emp.email}</h5>

                                
                            </Col>
                        </Row>
                        
                            
                       
                        <Row className="viewsinglecust-remove-button">
                            <Col>
                                
                                    <Button type="button" className="viewsinglecust-remove" 
                                    onClick={()=>remove(emp._id)}
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

export default ViewSingleEmp
