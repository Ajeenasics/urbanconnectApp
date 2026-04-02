import  { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./Admindashboard.css";
import icon from "../../../Assets/overview.png";
import applic from "../../../Assets/application.png";
import jobs from "../../../Assets/jobs.png";
import axiosInstance from '../../Constants/Baseurl';

function Admindashboard() {
  const [cust, setCust] = useState([]);
  const [worker, setWorker] = useState([]);
  const [employer, setEmployer] = useState([]);
  // const [emppendingreq, setEmppendingreq] = useState([]);
  // const [workerpendingreq, setWorkerpendingreq] = useState([]);
  const [custjob, setCustJob] = useState([]);
  const [empjob, setEmpJob] = useState([]);

  useEffect(() => {
    axiosInstance.post(`viewallcust`)
      .then((result) => {
        console.log(result);
        setCust(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance.post(`viewallworker`)
      .then((result) => {
        console.log(result);
        setWorker(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance.post(`viewallemployer`)
      .then((result) => {
        console.log(result);
        setEmployer(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance.post(`viewemployerpendingreq`)
      .then((result) => {
        console.log(result);
        // setEmppendingreq(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance.post(`viewworkerpendingreq`)
      .then((result) => {
        console.log(result);
        // setWorkerpendingreq(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance.post(`viewAllEmpPostJob`)
      .then((result) => {
        console.log(result);
        setEmpJob(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance.post(`viewalljobpost`)
      .then((result) => {
        console.log(result);
        setCustJob(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const userCount = cust.length;
  const jobSeekerCount = worker.length;
  const employerCount = employer.length;
  const empjobcount = empjob.length;
  const custjobcount = custjob.length;

  // Percentages for illustration
  const userPercentage = (userCount / 2000) * 100; // Adjust the denominator to reflect total possible users
  const jobSeekerPercentage = (jobSeekerCount / 2000) * 100; // Adjust the denominator to reflect total possible job seekers
  // const employerPercentage = (employerCount / 10000) * 100; // Adjust the denominator to reflect total possible employers

  const data = [
    { name: 'Customers', count: userCount },
    { name: 'Workers', count: jobSeekerCount },
    // { name: 'Employers', count: employerCount },
  ];

  return (
    <div className='col-9 '>
      <div className='container'>
        <div className='admindash-main'>
          <img src={icon} alt="Overview Icon"  /> Admin OverView
        </div>
        <div className='d-flex'>
          <div className='col-4 admin-dash-usercount'>
            <CircularProgressbar
              value={userPercentage}
              text={`${userCount} Users`}
              className='ariel-class1'
            />
          </div>
          <div className='col-4 admin-dash-usercount'>
            <CircularProgressbar
              value={jobSeekerPercentage}
              text={`${jobSeekerCount} Worker`}
              className='ariel-class1'
            />
          </div>
          {/* <div className='col-4 admin-dash-usercount'>
            <CircularProgressbar
              value={employerPercentage}
              text={`${employerCount} Hired`}
              className='ariel-class1'
            />
          </div> */}
        </div>
        <div className='row mx-4 ' style={{ width: "900px" }}>
          <div className='col-3 admin-dash-functionbox'>
            <div className='admin-dash-functioncount1 d-flex'>
              <div className='col-3 admin-dash-function1image'>
                <img src={applic} alt="Application" />
              </div>
              <div className='col-6 admin-dash-function1content' style={{ textAlign: 'center' }}>
                <p>{custjobcount} <br /> Customer Work Posts</p>
              </div>
            </div>
          </div>
          <div className='col-3 admin-dash-functionbox mx-4'>
            <div className='admin-dash-functioncount2 d-flex'>
              <div className='col-3 admin-dash-function1image'>
                <img src={jobs} alt="Jobs" />
              </div>
              <div className='col-6 admin-dash-function1content' style={{ textAlign: 'center' }}>
                <p>{empjobcount} <br />Worker Post Jobs</p>
              </div>
            </div>
          </div>
        </div>
        <div className='row admindash-seconfboxuserrow mt-5'>
          <div className='col-4 '>
            <div className='admindash-seconfboxuser pt-2 ' style={{ textAlign: 'center' }}>
              <h3>{userCount}</h3>
              <p>Customers</p>
            </div>
          </div>
          <div className='col-4 '>
            <div className='admindash-seconfboxuser' style={{ textAlign: 'center' }}>
              <h3>{employerCount}</h3>
              <p>Worker</p>
            </div>
          </div>
          {/* <div className='col-4 '>
            <div className='admindash-seconfboxuser' style={{ textAlign: 'center' }}>
              <h3>{jobSeekerCount}</h3>
              <p>Worker</p>
            </div>
          </div> */}
        </div>
        <div className='row'>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Admindashboard;
