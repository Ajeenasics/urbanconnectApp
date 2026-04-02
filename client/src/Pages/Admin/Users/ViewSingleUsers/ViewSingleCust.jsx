import  { useEffect, useState } from 'react'
import './ViewSingleUsers.css'
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from '../../../Constants/Baseurl';
import { imageBaseUrl } from '../../../Constants/Baseurl';

function ViewSingleCust() {
    const [cust, setcust] = useState([]);
    const url = imageBaseUrl;
    const adminid=localStorage.getItem("adminid")
    console.log(localStorage.getItem("adminid"));
    const navigate=useNavigate()
  
    useEffect(()=>{
      if(adminid==null){
        navigate("/admin-login")
      }
    },[])

    const {custid} =useParams();
    console.log(custid,'custid');
  
    const fetchCustomerDetails = () => {
      axiosInstance
        .post(`viewcustbyid/${custid}`)
        .then((result) => {
          console.log(result);
          setcust(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      fetchCustomerDetails();
    }, []);

    const navigateToViewAllCust=(id)=>{
        navigate('/admin-viewallcust')
    }

    const remove = (id) => {
      axiosInstance.post(`removebyadminbycustid/${id}`)
          .then((res) => {
              console.log('Employer approved:', res);
              toast.success("Employer Removed")
              fetchCustomerDetails(); 
              navigate('/admin-viewallcust')
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
                        src={`${url}/${cust.image?.filename}`} width="100px" height="100px" alt="User" 
                        />
                    </div>
                    <Form className='mx-2'>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Customer_name</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{cust?.name}</h5>

                               
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Customer_id</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{cust?._id?.slice(0, 5)}</h5>

                                
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Customer_adress</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{cust?.housename}</h5>

                                
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Location</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                               
                            <h5>{cust?.city}</h5>
                                    
                                
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Contact Number</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{cust?.phone}</h5>     
                               
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Pincode</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                                    <h5>{cust?.pincode}</h5>
                               
                            </Col>
                        </Row>
                        <Row className="viewsinglecust-info-row">
                            <Col className="viewsinglecust-info-label" md={4}>Email</Col>
                            <Col className='viewsinglecust-info-coln' md={1}>:</Col>
                            <Col className="viewsinglecust-info-value" md={7}>
                                
                            <h5>{cust?.email}</h5>

                                
                            </Col>
                        </Row>
                        
                            
                       
                        <Row className="viewsinglecust-remove-button">
                            <Col>
                                
                                    <Button type="button" className="viewsinglecust-remove" 
                                    onClick={()=>remove(cust?._id)}
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

export default ViewSingleCust
