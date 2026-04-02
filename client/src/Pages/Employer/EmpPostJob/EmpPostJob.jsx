import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../../Constants/Baseurl'

import './EmpPostJob.css'

function EmpPostJob() {

    const navigate=useNavigate();

    const [employerid, setId]= useState(localStorage.getItem("employer"));

  useEffect(()=>{
    if(localStorage.getItem("token")== null && localStorage.getItem("employer") == null ){
      navigate("/");
    }
  },[navigate]);

    const [postjobdata,setPostJobData]=useState({
        empId:employerid,
        jobType:'fulltime',
        jobName:'',
        jobDetails:'',
        jobSalary:'',
        jobSalaryType:'Per Day'
    });
    const [errors,setErrors]=useState({
        empId:'',
        jobType:'',
        jobName:'',
        jobDetails:'',
        jobSalary:'',
        jobSalaryType:''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPostJobData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      };
      console.log(postjobdata, "postdata");

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        let errors = {};
    
        let formValid = true;
    
        if (!postjobdata.jobType.trim()) {
          formValid = false;
          errors.jobType = "Job Type is required";
        }
        if (!postjobdata.jobName) {
          formValid = false;
          errors.jobName = "Job Name is required";
        }
        if (!postjobdata.jobDetails) {
          formValid = false;
          errors.jobDetails = "Job Details is required";
        }
        if (!postjobdata.jobSalary) {
          formValid = false;
          errors.jobSalary = "Job Salary is required";
        }
        if (!postjobdata.jobSalaryType) {
            formValid = false;
            errors.jobSalaryType = "Job Salary Type is required";
          }
        setErrors(errors);
    
        if (
            postjobdata.jobType &&
            postjobdata.jobName &&
            postjobdata.jobDetails &&
            postjobdata.jobSalary &&
            postjobdata.jobSalaryType
        ) {
          formValid = true;
        }
    
        if (Object.keys(errors).length === 0 && formValid) {
          const formData = new FormData();
          formData.append("empId", postjobdata.empId);
          formData.append("jobType", postjobdata.jobType);
          formData.append("jobName", postjobdata.jobName);
          formData.append("jobDetails", postjobdata.jobDetails);
          formData.append("jobSalary", postjobdata.jobSalary);
          formData.append("jobSalaryType", postjobdata.jobSalaryType);
          
    
          console.log(formData, "formData");
          try {
            var response;
            if (postjobdata) {
              response = await axiosInstance.post(
                '/registerjob',
                formData
              );
            }
            console.log("Response:", response);
            if (response.status === 200) {
              toast.success(response.data.msg);
              setTimeout(()=>{
                window.location.reload(false)
              },3000)
              
            }
          } catch (error) {
            console.error("Error:", error);
            let msg = error?.response?.data?.msg || "Error occurred";
            alert(msg,'msg');
          }
        } else {
          console.log("Form is not valid", formValid);
          console.log("Data entered", postjobdata);
        }
      };
    

  return (
    <>
        <div className='container'>
        <div className='emppostjob-maincontainer'>
            <div className='emppostjob-maincontainermainbox'>
                <div className='emppostjob-maincontainermainboxtop'>
                    Post Job
                </div>
                <div className='container'>
                <div className='row emppostjob-maininputs'>
                    <form onSubmit={(e)=>{handleSubmit(e);}} >
                    <div className='col-12 '>
                        <p>Job Name</p>
                    </div>
                    
                    <div className='col-12 emppostjob-maininputsi'>
                        <input type='text' 
                        placeholder='Enter Job Name' 
                        onChange={handleChange}
                        name='jobName'   />
                        
                    </div>
                    {errors.jobName && (
                                <div className="text-danger errortext mx-5">
                                {errors.jobName}
                                </div>
                        )}
                    <div className='col-12 '>
                        <p>Job Type</p>
                    </div>
                    <div className='col-12 emppostjob-maininputsi'>
                        <select name='jobType'
                        onChange={handleChange}
                        >
                            <option value='fulltime'>Full Time</option>
                            <option value='parttime'>Part Time</option>
                        </select>
                        
                    </div>
                    {errors.jobType && (
                                <div className="text-danger errortext mx-5 ">
                                {errors.jobType}
                                </div>
                        )}
                    <div className='col-12 '>
                        <p>Job Salary</p>
                    </div>
                    <div className='col-12 emppostjob-maininputsi'>
                        <input type='text' 
                        placeholder='Enter Job Salary' 
                        onChange={handleChange}
                        name='jobSalary'   />
                        
                    </div>
                    {errors.jobSalary && (
                                <div className="text-danger errortext mx-5">
                                {errors.jobSalary}
                                </div>
                        )}
                    <div className='col-12 '>
                        <p>Job Salary Type</p>
                    </div>
                    <div className='col-12 emppostjob-maininputsi'>
                        <select name='jobSalaryType' 
                        onChange={handleChange}
                        >
                            <option value='Per Day'>Per Day</option>
                            <option value='Per Month'>Per Month</option>
                            <option value='Per Year'>Per Year</option>
                        </select>
                        
                    </div>
                    {errors.jobSalaryType && (
                                <div className="text-danger errortext mx-5">
                                {errors.jobSalaryType}
                                </div>
                        )}
                    <div className='col-12'>
                        <p>Job Detais</p>
                    </div>
                    <div className='col-12 emppostjob-maininputsi'>
                        <textarea type='text' 
                        placeholder='Enter Job Details' 
                        onChange={handleChange}
                        name='jobDetails'  />
                        
                    </div>
                    {errors.jobDetails && (
                                <div className="text-danger errortext mx-5">
                                {errors.jobDetails}
                                </div>
                        )}
                    <div className='emppostjob-maininputsbutton mb-3'>

                        <button type='submit' >Post</button>
                    </div>
                    </form>
                    </div>
                    
                </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default EmpPostJob
