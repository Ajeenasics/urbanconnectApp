import {useState} from 'react'
import './Complaints.css'
import axiosInstance from '../../Constants/Baseurl';
import { toast } from 'react-toastify';

function WorkerAddComplaints({custId,close}) {
    const workerId = localStorage.getItem("workerid");
  console.log(workerId,"workerId");
  const customerId=custId
  console.log(customerId,'custId');

  const [complaintdata,setComplaintData]=useState({
    workerId:workerId,
    customerId:customerId,
    subject:'',
    
  })
  const [errors,setErrors]=useState({
    subject:''
  })

  const handleInputChange = (e)=>{
    const {name,value}=e.target;
    setComplaintData((prevData)=>({
      ...prevData,
      [name]:value,
    }))
    setErrors((prevErrors)=>({
      ...prevErrors,
      [name]:"",
    }));
  }
  

  console.log(complaintdata,'complaintdata');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    let errors={}
    let formValid =true;

    
    if(!complaintdata.subject.trim()){
      formValid=false;
      errors.subject="Subject is Required"
    }

    setErrors(errors);

    if(
      
      complaintdata.subject
    ){
      formValid=true;
    }
    if (Object.keys(errors).length === 0 && formValid) {
      try{
        var res;
        if(complaintdata){
          res=await axiosInstance.post(
            `workerAddComplaints/${customerId}`,complaintdata
          );
        }
        console.log("response:",res);
        if(res.status === 200){
          toast.success(res.data.msg);
          close()
        }
        
      } catch (error){
        console.error("Error",error);
        let msg = error?.response?.data?.msg || "Error Occurs"
        toast.error("error message",msg)
      }
    }
    else  {
      toast.error("Give Complaint Data")
    }
  }
  return (
    <>
        <div className="addcomplait-modal-container">
        <form onSubmit={(e)=>{handleSubmit(e);}}>
	<article className="">
		<header className="addcomplait-modal-container-header">
			<span className="addcomplait-modal-container-title">
				Add Complaint
			</span>
			<div className="addcomplait-icon-button" onClick={close}>
            <svg fill="#fff" width="24px" height="24px" 
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m20.48 3.512c-2.172-2.171-5.172-3.514-8.486-3.514-6.628 0-12.001 5.373-12.001 12.001 0 3.314 1.344 6.315 3.516 8.487 2.172 2.171 5.172 3.514 8.486 3.514 6.628 0 12.001-5.373 12.001-12.001 0-3.314-1.344-6.315-3.516-8.487zm-1.542 15.427c-1.777 1.777-4.232 2.876-6.943 2.876-5.423 0-9.819-4.396-9.819-9.819 0-2.711 1.099-5.166 2.876-6.943 1.777-1.777 4.231-2.876 6.942-2.876 5.422 0 9.818 4.396 9.818 9.818 0 2.711-1.099 5.166-2.876 6.942z"/><path d="m13.537 12 3.855-3.855c.178-.194.287-.453.287-.737 0-.603-.489-1.091-1.091-1.091-.285 0-.544.109-.738.287l.001-.001-3.855 3.855-3.855-3.855c-.193-.178-.453-.287-.737-.287-.603 0-1.091.489-1.091 1.091 0 .285.109.544.287.738l-.001-.001 3.855 3.855-3.855 3.855c-.218.2-.354.486-.354.804 0 .603.489 1.091 1.091 1.091.318 0 .604-.136.804-.353l.001-.001 3.855-3.855 3.855 3.855c.2.218.486.354.804.354.603 0 1.091-.489 1.091-1.091 0-.318-.136-.604-.353-.804l-.001-.001z"/></svg>
			</div>
		</header>
		<section className="addcomplait-modal-container-body ">
        
          
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Subject</label>
            <textarea className="addcomplait-textarea form-control" 
            style={{height:'200px'}} 
            placeholder='Add your Complaint' 
            id="message-text"
            name="subject"
            onChange={handleInputChange}
            ></textarea>
            {errors.subject && <p className='text-danger'>{errors.subject}</p>}
          </div>
        
		</section>
		{/* <footer className="addcomplait-modal-container-footer"> */}
			{/* <button className="addcomplait-button is-ghost" style={{background:'#3D9AE0',color:'#fff'}} onClick={close}>BACK</button> */}
			<button className="addcomplait-button is-primary" style={{background:'#3D9AE0'}}>POST</button>
		{/* </footer> */}
	</article>
  </form>
        </div>
    </>
  )
}

export default WorkerAddComplaints
