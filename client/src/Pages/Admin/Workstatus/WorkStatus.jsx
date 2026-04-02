import  { useEffect, useState } from "react";
import "./WorkStatus.css";
import axiosInstance from "../../Constants/Baseurl";

function WorkStatus() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`viewAllWorkStatus`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="table-container">
      <table className="table_main">
        <thead>
          <tr>
            <th>SI No.</th>
            <th>Job Name</th>
            <th>Worker Name</th>
            <th>Customer Name</th>
            <th>Job Date</th>
            <th>Amount</th>
            <th>Payment Status</th>

          </tr>
        </thead>
        <tbody>
          {data && data.length ? (
            data.slice().reverse().map((a, index) => {
                const formattedDate = new Date(a?.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  });
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                    }}
                  >
                    {a?.jobid?.jobname}
                  </td>
                  <td>{a?.workerId?.name}</td>
                  <td>{a?.customerId?.name}</td>
                  <td>{formattedDate}</td>
                  <td>{a?.payment}</td>

                  {
                    a?.paymentStatus===true?(
                    <td><button type="button" className="button_paids">Paid<span className="ri-check-double-line"/></button></td>
                    ):(
                        <td><button type="button" className="button_notpaids">Not Paid<span className="ri-close-line"/></button></td>
                    )
                  }
                  
                </tr>
              );
            })
          ) : (
            <div className="viewcounsellor-lottiereqq">No Works found</div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WorkStatus;
