import  { useEffect, useState } from "react";
import "../Requests/Workerreq.css";
import "./Viewusers.css";
import axiosInstance from "../../Constants/Baseurl";
import { useNavigate } from "react-router-dom";
import { imageBaseUrl } from "../../Constants/Baseurl";

function Viewallworker() {
    const [cust, setcust] = useState([]);
    const url = imageBaseUrl;
    const adminid = localStorage.getItem("adminid");
    const navigate = useNavigate();
  
    useEffect(() => {
        if (adminid == null) {
            navigate("/admin-login");
        }
    }, []);
  
    const fetchEmployerRequests = () => {
        axiosInstance.post("/viewallworker")
            .then((result) => {
                setcust(result.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
  
    useEffect(() => {
        fetchEmployerRequests();
    }, []);

    // const rejectfn = (id) => {
    //     axiosInstance.post(`removebyadminbyworkerid/${id}`)
    //         .then(() => {
    //             toast.success("Worker Removed");
    //             fetchEmployerRequests();
    //         })
    //         .catch((err) => {
    //             console.log("Error removing worker:", err);
    //         });
    // };

    const navigateToViewWork = (id) => {
        navigate(`/admin-viewworker/${id}`);
    };

    return (
        <div className="col-9">
            <div className="workerreq-mainbox">
                <div className="admindash-viewalert col-12">
                    <div className="admindash-shrink">Workers</div>
                    <div className="row d-flex ms-2" style={{ marginTop: "30px" }}>
                        {cust && cust.length ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Worker Type</th>
                                        <th>Contact</th>
                                        <th>City</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cust.map((a) => (
                                        <tr key={a?._id}>
                                            <td>
                                                <img src={`${url}/${a?.image?.filename}`} alt="Worker" className="avatar" />
                                            </td>
                                            <td>{a?.name}</td>
                                            <td>{a?.email?.slice(0, 23)}</td>
                                            <td>{a?.workertype}</td>
                                            <td>{a?.contact}</td>
                                            <td>{a?.city}</td>
                                            <td>
                                                <button className="viewmoreadmin-accept" onClick={() => navigateToViewWork(a?._id)}>
                                                    View
                                                </button>
                                                {/* <button className="viewmoreadmin1-reject" onClick={() => rejectfn(a?._id)}>
                                                    Remove
                                                </button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="viewcounsellor-lottiereqq">No request found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Viewallworker;
