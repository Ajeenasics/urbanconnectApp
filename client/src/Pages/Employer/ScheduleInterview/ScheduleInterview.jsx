import  { useState, useEffect } from 'react';
import './ScheduleInt.css';
import {  Col, Row,  } from "react-bootstrap";
// import { faClose } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../Constants/Baseurl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ScheduleInterview({ jobreqid, workerId, close }) {
  // const navigate = useNavigate();

  const [data, setData] = useState({
    workerId: workerId,
    jobRequestId: jobreqid,
    interview_date: '',
    interview_location: '',
    city: '',
    state: '',
  });
  
  const [errors, setErrors] = useState({
    interview_date: '',
    interview_location: '',
    city: '',
    state: '',
  });

  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    // Set the minimum date as today's date
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format
    setMinDate(formattedToday);
  }, []);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    let formValid = true;

    if (!data.interview_date.trim()) {
      formValid = false;
      errors.interview_date = "Interview Date is required";
    } 
    // else if (new Date(data.interview_date) <= new Date()) {
    //   formValid = false;
    //   errors.interview_date = "Please select a date starting from tomorrow";
    // }

    if (!data.interview_location) {
      formValid = false;
      errors.interview_location = "Interview Location is required";
    }
    if (!data.city) {
      formValid = false;
      errors.city = "City is required";
    }
    if (!data.state) {
      formValid = false;
      errors.state = "State is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0 && formValid) {
      try {
        var response;
        if (data) {
          response = await axiosInstance.post(
            `createInterview/${workerId}`,
            data
          );
        }
        console.log("Response:", response);
        if (response.status === 200) {
          toast.success(response.data.msg);
          close();
          window.location.reload(false);
        } else if (response.status === 500) {
          toast.error(response.data.msg);
        } else if (response.data.status === 400) {
          toast.info(response.data.msg);
        }
      } catch (error) {
        console.error("Error:", error);
        let msg = error?.response?.data?.msg || "Error occurred";
        alert(msg, 'msg');
      }
    } else {
      toast.error('Something went wrong');
      console.log("Form is not valid", formValid);
      console.log("Data entered", data);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='empviewpostjob-maincontainer'>
          <div className='empviewpostjob-maincontainermainbox'>
            <div className='empviewpostjob-maincontainermainboxtop'>
              Schedule interview
              <button className="empviewpostjob-icon-button" onClick={close}>
                <svg fill="#fff" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m20.48 3.512c-2.172-2.171-5.172-3.514-8.486-3.514-6.628 0-12.001 5.373-12.001 12.001 0 3.314 1.344 6.315 3.516 8.487 2.172 2.171 5.172 3.514 8.486 3.514 6.628 0 12.001-5.373 12.001-12.001 0-3.314-1.344-6.315-3.516-8.487zm-1.542 15.427c-1.777 1.777-4.232 2.876-6.943 2.876-5.423 0-9.819-4.396-9.819-9.819 0-2.711 1.099-5.166 2.876-6.943 1.777-1.777 4.231-2.876 6.942-2.876 5.422 0 9.818 4.396 9.818 9.818 0 2.711-1.099 5.166-2.876 6.942z"/><path d="m13.537 12 3.855-3.855c.178-.194.287-.453.287-.737 0-.603-.489-1.091-1.091-1.091-.285 0-.544.109-.738.287l.001-.001-3.855 3.855-3.855-3.855c-.193-.178-.453-.287-.737-.287-.603 0-1.091.489-1.091 1.091 0 .285.109.544.287.738l-.001-.001 3.855 3.855-3.855 3.855c-.218.2-.354.486-.354.804 0 .603.489 1.091 1.091 1.091.318 0 .604-.136.804-.353l.001-.001 3.855-3.855 3.855 3.855c.2.218.486.354.804.354.603 0 1.091-.489 1.091-1.091 0-.318-.136-.604-.353-.804l-.001-.001z"/></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='empviewpostjob-con'>
                <Row>
                  <Col><label className='empviewpostjob-label mb-2'>Interview Date</label></Col>
                  <Col><label className='empviewpostjob-label'>Interview Location</label></Col>
                </Row>
                <Row>
                  <Col>
                    <input
                      className='empviewpostjob-input'
                      type='date'
                      name='interview_date'
                      min={minDate} // Set the minimum date as tomorrow
                      onChange={handleChange}
                    />
                    {errors && <p className='text-danger'>{errors.interview_date}</p>}
                  </Col>
                  <Col>
                    <input className='empviewpostjob-input'
                      placeholder='Enter interview location'
                      type='text'
                      name='interview_location'
                      onChange={handleChange}
                    />
                    {errors && <p className='text-danger'>{errors.interview_location}</p>}
                  </Col>
                </Row>
                <Row>
                  <Col><label className='empviewpostjob-label mb-2'>City</label></Col>
                  <Col><label className='empviewpostjob-label'>State</label></Col>
                </Row>
                <Row>
                  <Col>
                    <input className='empviewpostjob-input'
                      placeholder='Select City'
                      type='text'
                      name='city'
                      onChange={handleChange}
                    />
                    {errors && <p className='text-danger'>{errors.city}</p>}
                  </Col>
                  <Col>
                    <input className='empviewpostjob-input'
                      placeholder='Select State'
                      type='text'
                      name='state'
                      onChange={handleChange}
                    />
                    {errors && <p className='text-danger'>{errors.state}</p>}
                  </Col>
                </Row>
                <div className='empviewpostjob-schedule-div'>
                  <button className='empviewpostjob-schedule' type="submit">Schedule</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleInterview;
