import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../Constants/Baseurl";
import "./Viewjobstatus.css";

function Viewjobstatus() {
  // const navigate=useNavigate();
  // const custid = localStorage.getItem("custid");
  const [data, setData] = useState([]);

  const { jobid } = useParams();

  useEffect(() => {
    axiosInstance
      .post(`viewReqsbyJobid/${jobid}`)
      .then((result) => {
        console.log(result);
        setData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jobid]);

  console.log(data, 'new');

  function acceptjobreg() {
    axiosInstance.post(`acceptJobReqsById/${jobid}`)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const acceptworker = (id) => {
    axiosInstance.post(`acceptReqsById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          acceptjobreg()
          toast.success(res.data.msg)
          setTimeout(() => {
            window.location.reload(false)
          }, 3000)

        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // const navigatetoworkerspg=(category)=>{
  //   navigate(`user-view-workerbytype/${category}`)
  // }

  return (
    <div className="workerview-jonreqmaincontainer" style={{ minHeight: '80vh' }}>
      <div className="workerjobreq-mainbox mb-5">
        <div className="workjob-viewalert col-12">
          <div className="admindash-shrink">Job Requests</div>
          <div className="row d-flex pt-3" style={{ marginTop: "30px" }}>
            {data && data.length ? (

              data.map((a) => {
                const category = a?.jobid?.category
                return (

                  <div className="col-3 userview-job-boxinside pt-4" key={a._id}>
                    <div className="row">
                      <div className="col-5 userview-head">Worker Name</div>
                      <div className="col-7">: {a?.workerId?.name}</div>
                      <div className="col-5 userview-head">Worker Type</div>
                      <div className="col-7">: {a?.workerId?.workertype}</div>
                      <div className="col-5 userview-head">Location</div>
                      <div className="col-7">: {a?.workerId?.location}</div>
                      <div className="col-5 userview-head">Work Date</div>
                      <div className="col-7">: {a?.workDate}</div>
                      <div className="col-5 userview-head">Email</div>
                      <div className="col-7" style={{ wordWrap: "break-word" }}>: {a?.workerId?.email}</div>
                      <div className="col-5 userview-head">Phone No</div>
                      <div className="col-7">: {a?.workerId?.contact}</div>
                      <div className=" viewworkreqacpt mb-4 mt-3">
                        <button type="submit" onClick={() => acceptworker(a?._id)}>Accept</button>
                      </div>


                      {a.workers && a.workers.length ? (
                        a.workers.map((e, index) => (
                          <div key={index} className="userjob-view-worker">
                            <div className="row">
                              <div className="col-5 userview-head1">Worker Name</div>
                              <div className="col-7">: {e?.workerId?.name}</div>
                              <div className="col-5 userview-head1">Location</div>
                              <div className="col-7">: {e?.workerId?.location}</div>
                              <div className="col-5 userview-head1">Work Date</div>
                              <div className="col-7">: {e?.workDate}</div>
                              <div className="col-5 viewworkreqacpt">
                                <button type="submit">Accept</button>
                              </div>
                              <div className="col-7 viewworkreqrjt">
                                <button type="submit">Reject</button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="viewcounsellor-lottiereqq">
                          No workers Accepted Your Request
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="viewcounsellor-lottiereqq">No request found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewjobstatus;
