import { useEffect, useState } from 'react'
import './Workerhome.css'
import axiosInstance from '../../../Constants/Baseurl'
import workerhomeimg1 from '../../../../Assets/workerhomeimg1.jpg'
import workerhomeimg2 from '../../../../Assets/workerhomeimg2.jpg'
import workerhomeimg3 from '../../../../Assets/workerhomeimg3.jpg'


function Workerhome() {
    const[data,setData]=useState([])
    const [emp,setEmp]=useState([])
    const [jobs,setJobs]=useState([])

    const workerId=localStorage.getItem("workerid")
    useEffect(()=>{
      axiosInstance.post('viewalljobpost')
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
            setEmp(res.data.data)
        })
        .catch((err)=>{
          alert("Failed to fetch user details",err)
      });

        axiosInstance.post(`viewReqsbyWorkerid/${workerId}`)
      .then((res)=>{
          console.log(res.data.data,"res");
            setJobs(res.data.data)
        })
        .catch((err)=>{
          alert("Failed to fetch user details",err)
      });

  },[workerId])
  return (
    <>
        <div className="container" style={{marginTop:"30px"}}>
      <div className="row customerhome-main">
        <div className="col-12 d-flex">
          <div className="col-6 pb-3">
            <div className="d-flex">
              <div className="workerhome-boxfirst">
                <div className="workerhome-boxfirstrow ">
                  <div className="col-3 workerhome-boxfirstrowimg1">
                    <img src={workerhomeimg1} alt="image" />
                  </div>
                  <div className="col-3 workerhome-boxfirstrowimg2">
                    <img src={workerhomeimg2} alt="image" />
                  </div>
                  <div className="col-3 workerhome-boxfirstrowimg3">
                    <img src={workerhomeimg3} alt="image" />
                  </div>
                </div>
              </div>
              <div>
                <div className="workerhomeimdside-box1">
                  <span>{data?.length}</span>
                  <br />
                  Jobs posted
                </div>
                <div className="workerhomeimdside-box2">
                  <span>{jobs?.length}</span>
                  <br />
                  Job Fulfiled
                </div>
                <div className="workerhomeimdside-box3">
                  <span>{emp?.length}</span>
                  <br />
                  Job Sellers
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 pb-3 workerhome-secondcolmain">
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

export default Workerhome
