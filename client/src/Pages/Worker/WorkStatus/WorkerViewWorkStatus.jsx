import {  useState    } from 'react'
import './WorkerWorkStatus.css'
// import {useNavigate} from 'react-router-dom'
// import viewstatusprofile from '../../../Assets/viewstatusprofile.png'
import axiosInstance from '../../Constants/Baseurl'
// import { Toast } from 'react-bootstrap'
import { toast } from 'react-toastify'


function WorkerViewWorkStatus({jobId,custId,close}) {
    // const navigate =useNavigate();
    const workerid = localStorage.getItem("workerid");
    // console.log(id+"idprops");
    const jobid=jobId // id from props
    console.log(jobid,'jobid');

    
    
    // const [isChecked, setIsChecked] = useState('incomplete');
    // console.log(isChecked,'ischeck');
    
    const [workstatusdata,setWorkStatusData]=useState({
        workerId:workerid,
        customerId:custId,
        status:"incompleted",
        payment:"",
        otp:""

    })
    // console.log(custId+"cccccc");

    const [errors, setErrors] = useState({
        workerId:"",
        customerId:"",
        status:"",
        payment:"",
        otp:""
    });

    // const handleCheckboxChange = (event) => {
    //     const workstatus=event.target.checked ? 'completed' : 'incomplete';
    //     setIsChecked(workstatus)
    //     setWorkStatusData(prevState => ({
    //         ...prevState,
    //         status: workstatus
    //     }));
        
    // };

        const handleChange = (event) => {
        const { name, value } = event.target;
        setWorkStatusData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
        setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
        }));
        };

console.log(workstatusdata,'workstatusdata');



  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    let formValid = true;

    if (!workstatusdata.payment.trim()) {
      formValid = false;
      errors.payment = "Payment is required";
    }
    
    if (!workstatusdata.otp.trim()) {
      formValid = false;
      errors.otp = "OTP is required";
    }
    
    setErrors(errors);

    
    if (
        workstatusdata.payment &&
        workstatusdata.otp 
      
    ) {
      formValid = true;
    }

    if (Object.keys(errors).length === 0 && formValid) {
      try {
        var response;
        if (workstatusdata) {
          response = await axiosInstance.post(
            `addworkstatus/${jobid}`,
            workstatusdata
          );
        }
        console.log("Response:", response); 
        if(response.status==200){
          toast.success(response.data.msg)
          close()
        }
      }catch (error) {
        console.error("Error:", error);
        let msg = error?.response?.data?.msg || "Error occurred";
        toast.error(msg);
      }
    } else {
      console.log("Form is not valid", formValid);
      console.log("Data entered", workstatusdata);
    }
  };


    
  return (
    <>
    <div className="worker-viewworkstatus-modal-container">
    <form onSubmit={(e)=>{handleSubmit(e);}}>
	<article className="">
		<header className="worker-viewworkstatus-modal-container-header">
			<span className="worker-viewworkstatus-modal-container-title">
				Pay Now
			</span>
			<button className="worker-viewworkstatus-icon-button" onClick={close}>
            <svg fill="#fff" width="24px" height="24px" 
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m20.48 3.512c-2.172-2.171-5.172-3.514-8.486-3.514-6.628 0-12.001 5.373-12.001 12.001 0 3.314 1.344 6.315 3.516 8.487 2.172 2.171 5.172 3.514 8.486 3.514 6.628 0 12.001-5.373 12.001-12.001 0-3.314-1.344-6.315-3.516-8.487zm-1.542 15.427c-1.777 1.777-4.232 2.876-6.943 2.876-5.423 0-9.819-4.396-9.819-9.819 0-2.711 1.099-5.166 2.876-6.943 1.777-1.777 4.231-2.876 6.942-2.876 5.422 0 9.818 4.396 9.818 9.818 0 2.711-1.099 5.166-2.876 6.942z"/><path d="m13.537 12 3.855-3.855c.178-.194.287-.453.287-.737 0-.603-.489-1.091-1.091-1.091-.285 0-.544.109-.738.287l.001-.001-3.855 3.855-3.855-3.855c-.193-.178-.453-.287-.737-.287-.603 0-1.091.489-1.091 1.091 0 .285.109.544.287.738l-.001-.001 3.855 3.855-3.855 3.855c-.218.2-.354.486-.354.804 0 .603.489 1.091 1.091 1.091.318 0 .604-.136.804-.353l.001-.001 3.855-3.855 3.855 3.855c.2.218.486.354.804.354.603 0 1.091-.489 1.091-1.091 0-.318-.136-.604-.353-.804l-.001-.001z"/></svg>
			</button>
		</header>
		<section className="worker-viewworkstatus-modal-container-body ">
        
          <div>
            <div className='row mt-2'>
                <div className='col'>
                    <p><b>Payment :</b></p>
                </div>
                <div className='col'>
                    <input 
                    className='editworkstatus-inputtext' 
                    onChange={handleChange}
                    name='payment'
                    type='number' />
                    {errors &&<p className='text-danger'>{errors.payment}</p>}
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col'>
                    <p><b>Verify Id :</b></p>
                </div>
                <div className='col'>
                    <input 
                    className='editworkstatus-inputtext' 
                    type='number'
                    name='otp'
                    onChange={handleChange}
                    />
                    { errors && <p className='text-danger'>{errors.otp}</p>}
                </div>
            </div>
          </div>
        
		</section>
		<footer className="worker-viewworkstatus-modal-container-footer mt-5">
			<button className="worker-viewworkstatus-button is-primary" type='submit' style={{background:'#3D9AE0'}}>Payment</button>
		</footer>
	</article>
    </form>
        </div>
    </>
  )
}

export default WorkerViewWorkStatus
