import {useState,useEffect} from 'react'
import img from "../../../Assets/profilecircle.png";
import img2 from "../../../Assets/circleimage.jpg";
import img3 from "../../../Assets/circleimg2.png";
// import img4 from "../../../Assets/circleimg4.png";
import axiosInstance from '../../Constants/Baseurl';


function Emphome1() {
  const empId=localStorage.getItem("employer")
  const[data,setData]=useState([])
  const [emp,setEmp]=useState([])
  const[jobs,setJobs]=useState([])
  
  useEffect(()=>{
    axiosInstance.post(`viewEmpPostJobByEmpid/${empId}`)
    .then((res)=>{
        console.log(res,"res");
          setData(res.data.data)
      })
      .catch((err)=>{
        alert("Failed to fetch user details")
    });
    axiosInstance.post('viewAllEmpPostJob')
    .then((res)=>{
        console.log(res,"res");
          setEmp(res.data.data)
      })
      .catch((err)=>{
        alert("Failed to fetch user details")
    });
    axiosInstance.post(`viewSelectedCandByEmpId/${empId}`)
    .then((res)=>{
        console.log(res,"res");
          setJobs(res.data.data)
      })
      .catch((err)=>{
        alert("Failed to fetch user details")
    });

},[empId])
  return (
    <>
    <div className="container" style={{marginTop:"30px"}}>
      <div className="row customerhome-main">
        <div className="col-12 d-flex">
          <div className="col-6 pb-3">
            <div className="d-flex">
              <div className="customerhome-boxfirst">
                <div className="customerhome-boxfirstrow ">
                  <div className="col-3 customerhome-boxfirstrowimg1">
                    <img src={img} alt="image" />
                  </div>
                  <div className="col-3 customerhome-boxfirstrowimg2">
                    <img src={img2} alt="image" />
                  </div>
                  <div className="col-3 customerhome-boxfirstrowimg3">
                    <img src={img3} alt="image" />
                  </div>
                </div>
              </div>
              <div>
                <div className="customerimdside-box1">
                  <span>{data?.length}</span>
                  <br />
                  Jobs posted
                </div>
                <div className="customerimdside-box2">
                  <span>{emp?.length}</span>
                  <br />
                  Total Jobs
                </div>
                <div className="customerimdside-box3">
                  <span>{jobs?.length}</span>
                  <br />
                  Candidate Selected
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 pb-3 custhome-secondcolmain">
            <p>
              The most promising <br/>application for{" "}
              <span> Quick to click job<br/> Seeker</span> to find Quick to click jobs
            </p>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Emphome1
