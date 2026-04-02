import {useState,useEffect} from 'react'
import axiosInstance from '../../Constants/Baseurl';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import icon from '../../../Assets/payment.jpg'
import { toast } from 'react-toastify';
import AddReviews from '../Reviews/AddReviews';
import { Modal } from 'react-bootstrap';


function PaymentDetails() {
    // const navigate=useNavigate();
    const {id}=useParams();
    console.log(id,'id');

    const [amountdata,setAmountdata]=useState({
      
    })

    const [selectedWorkerId, setSelectedWorkerId] = useState({ jobId: null, custId: null }); // State for storing selected job and customer IDs
  
 

    useEffect(()=>{
      
        axiosInstance.post(`viewWorksamountById/${id}`)
        .then((res)=>{
          if(res.status==200){
            console.log(res,'data');
            setAmountdata(res.data.data)
            setSelectedWorkerId(res.data.data.workerId)
          }
          })
        .catch((err)=>{
          console.log(err);
        })
      
      
    },[id])

    console.log(amountdata,'amountdata');

    console.log(selectedWorkerId,'selectworkid')


    

    // const [user,setUser]=useState()
    const [form, setForm] = useState({
        cardholdername:"",
        cardno: "",
        cvv: "",
        month: "",
        year: "",
      });

      console.log(form,'form');
    
      const [errors, setErrors] = useState({
        cardholdername:"",
        cardno: "",
        cvv: "",
        month: "",
        year: "",
      });
    
      
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
          ...form,
          [name]: value,
          numberError: "",
          cdnumberError: "",
        });
      };
    
      const changefn = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

      // const [isPopupOpen, setIsPopupOpen] = useState(false);

    // const handlePopupClose = () => {
    //     setIsPopupOpen(true);
        
    // };
  
  const [show, setShow] = useState(false);
  // const [openRequests, setOpenRequests] = useState(false);
  

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
      const submitfn = (a) => {
        a.preventDefault();
        if (form.cardno.length !== 16) {
          setForm({ ...form, numberError: "Card number must be 16 digits." });
          return;
        }
        if (form.cvv.length < 3) {
          setForm({ ...form, cdnumberError: "CVV must be at least 3 digits." });
          return;
        }
    
        axiosInstance
          .post(`updatePaymentStatus/${id}`, form)
          .then((res) => {
            console.log(res);
            if (res.data.status === 200) {
              toast.success("Payment successfully processed");
              setTimeout(() => {
                handleShow();
            }, 3000);
            } else {
              alert("Error in booking");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
  return (
    <>
        <div className="container-xxl py-5">
        <div className="container ">
        <Link 
        // onClick={navbckfn} 
        style={{textDecoration:"none"}}>  <div className="ri-arrow-left-line payment-backbtn"/></Link>
          <div className="row g-5 ">
            <div className="col-lg-6" style={{ marginTop: "7rem" }}>
            <h3 className='pb-4'>Card Details :</h3>
              <form
                className="mt-4"
                onSubmit={submitfn}
                required
                title="Please fill the form"
              >
                {/* <div className="row">
                  <div className="col-md-4">Choose a Date</div>
                  <div className="col-md-8">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Your Name"
                      min={new Date().toISOString().split("T")[0]}
                      style={{ marginBottom: "20px" }}
                      name="servicedate"
                      value={form.servicedate}
                      onChange={changefn}
                      required
                      title="please fill"
                    />
                  </div>
                </div> */}
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="cardHolderName"
                        placeholder="Your Name"
                        name="cardholdername"
                        
                        onChange={changefn}
                        required
                      />
                      <label htmlFor="name">Card Holder Name</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="cardNo"
                        placeholder="Card Number"
                        name="cardno"
                        
                        onChange={(e) => {
                          handleInputChange(e);
                          changefn(e);
                        }}
                        required
                      />
                      <p style={{ color: "red" }}>{form.numberError}</p>
                      <label htmlFor="cardNo">Card Number</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="cvv"
                        placeholder="CVV"
                        required
                        name="cvv"
                        
                        onChange={(e) => {
                          handleInputChange(e);
                          changefn(e);
                        }}
                      />
                      <p style={{ color: "red" }}>{form.cdnumberError}</p>
                      <label htmlFor="cvv">CVV</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-4">
                            <label htmlFor="expiry">Expiry Date</label>
                          </div>
                          <div className="col-4">
                            <label htmlFor="month">Month</label>
                            <select
                              className="form-control"
                              name="month"
                              id="month"
                            //   value={form.month}
                              onChange={changefn}
                              required
                            >
                              <option value="">Month</option>
                              {[
                                "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                              ].map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-4">
                            <label htmlFor="year">Year</label>
                            <select
                              className="form-control"
                              name="year"
                              id="year"
                            //   value={form.year}
                              onChange={changefn}
                              required
                            >
                              <option value="">Year</option>
                              {Array.from({ length: 22 }, (_, i) => 2024 + i).map((year) => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <button className="btn btn-success" type="submit">
                      Pay Now
                    </button>
                  </div>
                </div>
              </form>
            </div>

             
            <Modal show={show} onHide={handleClose}  centered>
            <AddReviews onClose={handleClose} workerId={selectedWorkerId}  />
            </Modal>
            

            <div className="col-lg-6" style={{ marginTop: "5rem" }}>
              <div className="d-flex justify-content-center">
                <div className="payment_page_icon">
                  <img
                    src={icon}
                    alt="secure_payment_icon"
                    width="350px"
                    height="350px"
                  />
                </div>
              </div>

              <h1 className="mb-4">
                Total Amount -{" "}
                <span style={{ color: "#00b074" }}>₹{amountdata?.payment}</span>
              </h1>
            </div>
          </div>

          
      </div>

       </div>
    </>
  )
}

export default PaymentDetails
