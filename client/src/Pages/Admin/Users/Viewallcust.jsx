import  { useEffect, useState } from "react";
import "../Requests/Workerreq.css";
import axiosInstance from "../../Constants/Baseurl";
import { useNavigate } from "react-router-dom";
import { imageBaseUrl } from "../../Constants/Baseurl";

function Viewallcust() {
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
        axiosInstance.post("viewallactivecust")
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

    const navigateToViewCust = (id) => {
        navigate(`/admin-viewcust/${id}`);
    };

    // const rejectfn = (id) => {
    //     axiosInstance.post(`removebyadminbycustid/${id}`)
    //         .then(() => {
    //             toast.success("Employer Removed");
    //             fetchEmployerRequests();
    //         })
    //         .catch((err) => {
    //             console.log("Error approving employer:", err);
    //         });
    // };
  
    return (
        <div className="col-9">
            <div className="workerreq-mainbox">
                <div className="admindash-viewalert col-12">
                    <div className="admindash-shrink">Customers</div>
                    <div className="row d-flex ms-2" style={{ marginTop: "30px" }}>
                        {cust && cust.length ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Customer_name</th>
                                        <th>Email</th>
                                        <th>Contact Number</th>
                                        <th>Location</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cust.map((a) => (
                                        <tr key={a?._id}>
                                            <td>
                                                <img src={`${url}/${a?.image?.filename}`} alt="Customer" className="avatar" />
                                            </td>
                                            <td>{a?.name}</td>
                                            <td>{a?.email}</td>
                                            <td>{a?.phone}</td>
                                            <td>{a?.city}</td>
                                            <td>
                                                <button className="viewuseradmin-view" onClick={() => navigateToViewCust(a?._id)}>
                                                    View
                                                </button>
                                                {/* <button className="viewmoreadmin-reject" onClick={() => rejectfn(a?._id)}>
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

export default Viewallcust;
