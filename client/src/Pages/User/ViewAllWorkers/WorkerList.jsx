import { useState, useEffect } from "react";
import "../../Common/Home/BestCandidate.css";
import img from "../../../Assets/profilecircle.png";
import {  Form } from "react-bootstrap";
import axiosInstance from "../../Constants/Baseurl";
import BestCandWorkerCount from "../../Common/Home/BestCandWorkerCount";
import StarRating from "../../Common/StarRating/StarRating";
import { toast } from "react-toastify";
import { imageBaseUrl } from "../../Constants/Baseurl";

function WorkerList() {
  const [workers, setWorkers] = useState([]); // Store all workers
  const [filteredWorkers, setFilteredWorkers] = useState([]); // Store filtered workers
  const [selectedWorkerType, setSelectedWorkerType] = useState(""); // Selected filter value
  const [location, setLocation] = useState();
  // const [ischeck, setIscheck] = useState(false);
  const custid = localStorage.getItem("custid");

  const url = imageBaseUrl;

  useEffect(() => {
    fetchWorkers();
  }, []);

  useEffect(() => {
    axiosInstance
      .post(`viewcustbyid/${custid}`)
      .then((result) => {
        setLocation(result.data.data.district, "ll");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [custid]);

  const RequestForWorker = (workerid) => {
    axiosInstance
      .post(`/apply_serviece`, { workerid: workerid, custid: custid })
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          if (result.data.data.status === "Pending") {
          }
          fetchWorkers();
          toast.success("Service request created successfully!");
        }
      })
      .catch((err) => {
        console.error(err);

        if (err.response) {
          // Server responded with a status code outside 2xx
          if (
            err.response.status === 400 &&
            err.response.data.message === "Service request already exists!"
          ) {
            toast.error("You have already requested this service.");
          } else {
            toast.error(
              err.response.data.message || "Request failed. Please try again."
            );
          }
        } else if (err.request) {
          // No response received from the server
          toast.error("No response from server. Check your network.");
        } else {
          // Some other error occurred
          toast.error("An unexpected error occurred.");
        }
      });
  };

  const fetchWorkers = () => {
    axiosInstance
      .post("/viewallworker", location) // API to get all workers
      .then((response) => {
        console.log(response.data, "Worker Data");
        setWorkers(response.data.data);
        setFilteredWorkers(response.data.data); // Initially show all
      })
      .catch((error) => {
        console.error("Error fetching workers:", error);
      });
  };

  // Filter handler
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedWorkerType(value);

    if (value === "") {
      setFilteredWorkers(workers); // Show all workers if no filter
    } else {
      const filtered = workers.filter((worker) => worker.workertype === value);
      setFilteredWorkers(filtered);
    }
  };

  return (
    <div className="container">
      <div className="bestcandidate-main row">
        <div className="bestcandidate-head">
          <p>All Workers!!</p>
        </div>

        {/* Worker Type Filter */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="workertype">Worker Type</Form.Label>
          <Form.Control
            as="select"
            id="workertype"
            value={selectedWorkerType}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="plumber">Plumber</option>
            <option value="painter">Painter</option>
            <option value="garden Designer">Garden Designer</option>
            <option value="masons">Masons</option>
            <option value="electrician">Electrician</option>
            <option value="web designer">Web Designer</option>
            <option value="graphic designer">Graphic Designer</option>
            <option value="others">Others</option>
          </Form.Control>
        </Form.Group>

        <div className="col-12 pb-6 mt-5">
          <div className="row mt-5">
            {filteredWorkers.length > 0 ? (
              filteredWorkers.slice(0, 4).map((worker) => (
                <div className="col-4" key={worker._id}>
                  <div className="bestcandidate-userbox">
                    <div className="bestcandidate-userboximage d-flex">
                      <img
                        src={
                          worker.image ? `${url}/${worker.image.filename}` : img
                        }
                        alt="worker"
                      />
                      <p>{worker.name}</p>
                      <div className="bestcandidate-userboxhead6">
                        <StarRating rating={worker.rating} />
                      </div>
                    </div>

                    <div className="bestcandidate-userboxcontent row mt-3">
                      <div className="col-8 bestcandidate-userboxh5">
                        <h5>{worker.workertype}</h5>
                        <h5>{worker.contact}</h5>

                        <BestCandWorkerCount workerid={worker._id} />
                      </div>
                      <div className="text-center">
                        <div
                          className="btn btn-primary"
                          onClick={() => RequestForWorker(worker._id)}
                        >
                          Service Request
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="viewcounsellor-lottiereqq">No workers found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerList;
