import { useState, useEffect } from "react";
import "./BestCandidate.css";
import axiosInstance from "../../Constants/Baseurl";
import BestCandWorkerCount from "./BestCandWorkerCount";
import StarRating from "../StarRating/StarRating";
import { imageBaseUrl } from "../../Constants/Baseurl";

function BestCandidate() {
  const [data, setData] = useState("");
  const url = imageBaseUrl;

  const fetchEmployerRequests = () => {
    axiosInstance
      .post("topratedWorkers")
      .then((result) => {
        console.log(result, "data");
        setData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEmployerRequests();
  }, [""]);

  return (
    <div className="container">
      <div className="-main row">
        <div className="bestcandidate-head">
          <p>Best Candidate</p>
          <h6>Our Best Candidate For You!!</h6>
        </div>
        <div className="col-12 pb-6 ">
          <div className="row">
            {data.length > 0 ? (
              data.slice(0, 4).map((a) => {
                // Count(a?._id)
                return (
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="bestcandidate-userbox">
                      <div className="bestcandidate-userboximage d-flex">
                        <img src={`${url}/${a?.image?.filename}`} alt="image" />
                        <p>{a?.name}</p>

                        <div className="bestcandidate-userboxhead6">
                          <StarRating key={a?._id} rating={a?.rating} />
                        </div>
                      </div>

                      <div className="bestcandidate-userboxcontent row mt-3">
                        <div className="col-8 bestcandidate-userboxh5">
                          <h5>{a?.workertype}</h5>
                          <BestCandWorkerCount key={a?._id} workerid={a?._id} />
                        </div>
                        {/* <div className="col-4 bestcandidate-userbutton ">
                        <button type="submit">Request Now</button>
                    </div> */}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="viewcounsellor-lottiereqq">No request found</div>
            )}
          </div>
        </div>
        {/* <div className="bestcandidate-userboxbutton">
            <button type="submit" className="mb-5">ViewMore</button>
        </div> */}
      </div>
      {/* <div className="">
        <div className="bestcandidate-userbottommain">
            <p>Want better recommendations ? Turn on your location & We will show Ads nearby.</p>
            <div className="bestcandidate-userbottonbtm">
            <div>Turn On Location</div>
        </div>

        </div>
      </div> */}
    </div>
  );
}

export default BestCandidate;
