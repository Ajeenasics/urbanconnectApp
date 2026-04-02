import React,{useEffect, useState} from 'react'
import axiosInstance from '../../Constants/Baseurl';

function BestCandWorkerCount({workerid}) {
    console.log(workerid,'workerid');
    const [count,setCount]=useState()

  useEffect(()=>{
    axiosInstance.post(`viewCountCompletedWorksByWorkerId/${workerid}`)
    .then((data)=>{
      console.log(data);
      setCount(data.data.data)
    })
  },[workerid])

  console.log(count,'count');
  return (
    <>
        <div style={{display:'flex' , marginTop:'20px',marginLeft:'20px',gap:'20px'}}><h6>Works Committed</h6>-{" "}<h6>{count}</h6></div>
    </>
  )
}

export default BestCandWorkerCount
