import  { useEffect, useState } from "react";
import "./Customerhome.css";
import img from "../../../../Assets/profilecircle.png";
import img2 from "../../../../Assets/circleimage.jpg";
import img3 from "../../../../Assets/circleimg2.png";
// import img4 from "../../../../Assets/circleimg4.png";
import axiosInstance from "../../../Constants/Baseurl";

function Customerhome() {
  const[data,setData]=useState([])
  // const [emp,setEmp]=useState([])
  const[jobs,setJobs]=useState([])
  const custid=localStorage.getItem("custid")
  useEffect(()=>{
    axiosInstance.post(`viewalljobreqs/${custid}`)
    .then((res)=>{
        console.log(res,"res");
          setData(res.data.data)
      })
      .catch((err)=>{
        alert("Failed to fetch user details",err)
    });
    axiosInstance.post('viewallemployer')
    .then((res)=>{
        console.log(res,"res");
          // setEmp(res.data.data)
      })
      .catch((err)=>{
        alert("Failed to fetch user details",err)
    });
    axiosInstance.post(`viewApprovedReqsbycustomerId/${custid}`)
    .then((res)=>{
        // console.log(res,"res");
          setJobs(res.data.data)
      })
      .catch((err)=>{
        alert("Failed to fetch user details",err)
    });

},[custid])

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
                  Work posted
                </div>
                <div className="customerimdside-box2">
                  <span>{jobs?.length}</span>
                  <br />
                  Work Fulfiled
                </div>
             {/*  <div className="customerimdside-box3">
                  <span>{emp?.length}</span>
                  <br />
                  Job Seekers
                </div>*/} 
              </div>
            </div>
          </div>
          <div className="col-6 pb-3 custhome-secondcolmain">
            <p>
              The most promising <br/>application for{" "}
              <span> Quick to click Work<br/> Seeker</span> to find quick to click jobs
            </p>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default Customerhome;
