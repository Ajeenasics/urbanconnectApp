import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from './Pages/Common/Home/Home';
import 'remixicon/fonts/remixicon.css'
import Login from './Pages/Common/login/Login';
import ForgotPassword from './Pages/Common/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/Common/ResetPassword/ResetPassword';
import User_Register from './Pages/User/Register/User_Register';
import Workerregistration from "./Pages/Worker/Register/Workerregistration"
import Footer from './Pages/Common/Footer/Footer';
import Adminlogin from './Pages/Common/login/Adminlogin';
import Adminmain from './Pages/Admin/Adminmain';
import Adminloginnav from './Pages/Common/Navbar/AdminNav/Adminloginnav';
import Customerhome from './Pages/Common/Home/Customerhome/Customerhome';
import BestCandidate from './Pages/Common/Home/BestCandidate';
import CustomerHomenav from './Pages/Common/Navbar/Customer/CustomerHomenav';
import WorkerNav from './Pages/Common/Navbar/Worker/WorkerNav';
import CustomerFReq from './Pages/Worker/CustomerFReq';
import Viewjobstatus from './Pages/User/Jobs/Viewjobstatus';
import WhatWeDo from './Pages/Common/Home/WhatWeDo/WhatWeDo';
import ClientTestimonials from './Pages/Common/Home/ClientTestimonials/ClientTestimonials';
import Cos_Terms from './Pages/Common/Home/WhatWeDo/Cos_Terms'
import AboutUs from './Pages/Common/AboutUs/AboutUs';
import PostJobList from './Pages/User/CustPostJob/PostJobList'
import RecentJobOpen from './Pages/Common/Home/RecentJobOpen/RecentJobOpen';
import ViewWorkStatus from './Pages/User/WorkStatus/ViewWorkStatus';
import EditWorkStatus from './Pages/User/WorkStatus/EditWorkStatus';
import ViewRecentJobs from './Pages/Worker/ViewRecentJobs/ViewRecentJobs';
import ViewSingleCust from './Pages/Admin/Users/ViewSingleUsers/ViewSingleCust';
import ViewSingleEmp from './Pages/Admin/Users/ViewSingleUsers/ViewSingleEmp';
import ViewSingleWork from './Pages/Admin/Users/ViewSingleUsers/ViewSingleWork';
import WorkerviewWorkreqstatus from './Pages/Worker/Jobs/WorkerviewWorkreqstatus';
import ViewPostJobsList from './Pages/User/ViewPostJobs/ViewPostJobsList';
import ViewAcceptedPostJobs from './Pages/User/ViewAcceptedPostJobs/ViewAcceptedPostJobs';
import AddReviews from './Pages/User/Reviews/AddReviews';
import WorkRecentJobOpen from './Pages/Worker/Home/WorkRecentJobOpen';
import PaymentsList from './Pages/Worker/Payments/PaymentsList';
import EmpViewJobReq from './Pages/Worker/EmpJobReq/EmpViewJobReq';
import Navbar from './Pages/Common/Navbar/Navbar';
import PaymentDetails from './Pages/User/GotoPayments/PaymentDetails';
import UserPostComplaints from './Pages/User/UserComplaints/UserPostComplaints';
import ViewUserComplaints from './Pages/Worker/Complaints/ViewUserComplaints';
import WorkerPostComplaint from './Pages/Worker/WorkerPostComplaint/WorkerPostComplaint';
import AcceptJobStatus from './Pages/Worker/AcceptJobStatus';
import ViewWorkersByType from './Pages/User/ViewAllWorkers/ViewWorkersByType';
import Workerhome from './Pages/Common/Home/WorkerHome/Workerhome';
import Userviewcomplaints from './Pages/User/UserComplaints/Userviewcomplaints';
import WorkerList from './Pages/User/ViewAllWorkers/WorkerList';

function App() {
  return (
    <div className="container-fluid mx-0 p-0">
    
    <BrowserRouter basename='/quick_click'>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/reset-password/:id' element={<ResetPassword/>} />
        <Route path='/alljobs' element={[<Navbar/>,<RecentJobOpen/>,<Footer/>]} />



        {/* User Routes */}
        <Route path='/user-register' element={<User_Register />} />
        <Route path='/customer-home' element={[<CustomerHomenav/>,<Customerhome/>,<BestCandidate/>,<ClientTestimonials/>,<Footer/>]}/>

         <Route path='/user-postjob' element={<PostJobList />} />
         <Route path='/user-view-workers' element={[<CustomerHomenav/>,<BestCandidate />]} />
         <Route path='/user-view-postjob' element={[<CustomerHomenav/>,<ViewPostJobsList />]} />
         <Route path='/user-view-workerbytype' element={[<CustomerHomenav/>,<ViewWorkersByType />]} />
        <Route path='/user-viewjobstatus/:jobid' element={[<CustomerHomenav/>,<Viewjobstatus />,<Footer/>]} />         <Route path='/user-view-acceptedworkstatus' element={[<CustomerHomenav/>,<ViewAcceptedPostJobs />,<Footer/>]} />
        <Route path='/user-view-workstatus' element={<ViewWorkStatus />} />
         <Route path='/user-edit-workstatus' element={<EditWorkStatus />} />
         <Route path='/user-add-reviews' element={<AddReviews />} />
       <Route path='/user-add-paymentdetails/:id' element={[<CustomerHomenav/>,<PaymentDetails />]} />
        <Route path='/user-post-complaints' element={[<CustomerHomenav/>,<UserPostComplaints />,<Footer/>]} />
     <Route path='/user-view-complaints' element={[<CustomerHomenav/>,<Userviewcomplaints />,<Footer/>]} />
        <Route path='/User-viewallworker' element={[<CustomerHomenav/>,<WorkerList/>]}/>



        {/* Worker */}
        <Route path='/worker-register' element={<Workerregistration/>}/>
        <Route path='/worker-home' element={[<WorkerNav/>,<Workerhome/>,<WorkRecentJobOpen/>,<WhatWeDo/>,<Cos_Terms/>,<ClientTestimonials/>,<Footer/>]}/>
        <Route path='/worker-home?' element={<EditWorkStatus/>}/>
        <Route path='/worker-custreq' element={[<WorkerNav/>,<CustomerFReq/>]}/>
        <Route path='/worker-reqacceptstatus' element={[<WorkerNav/>,<AcceptJobStatus/>]}/>
        <Route path='/worker-empjobreq' element={[<WorkerNav/>,<EmpViewJobReq/>]}/>
        <Route path='/worker-viewrecentjob' element={[<WorkerNav/>,<ViewRecentJobs/>]}/>
        {/* <Route path='/worker-edit-workstatus' element={<WorkerEditWorkStatus/>} /> */}

<Route path='/worker-jobstatus' element={[<WorkerNav/>,<WorkerviewWorkreqstatus/>]}/>
        <Route path='/worker-paymentstatus' element={[<WorkerNav/>,<PaymentsList/>]}/>
        <Route path='/worker-view-cust-complaintlist' element={[<WorkerNav/>,<ViewUserComplaints/>]}/>
        <Route path='/worker-post-complaint' element={[<WorkerNav/>,<WorkerPostComplaint/>]}/>




        {/* Admin */}
        <Route path='/admin-login' element={<Adminlogin />} />
        <Route path='/admin-dashboard' element={[<Adminloginnav/>,<Adminmain data="admin-dashboard"/>]}/>
        <Route path='/admin-workerreq' element={[<Adminloginnav/>,<Adminmain data="admin-workerreq"/>]}/>
      
 <Route path='/admin-employerreq' element={[<Adminloginnav/>,<Adminmain data="admin-employerreq"/>]}/>
        <Route path='/admin-viewallcust' element={[<Adminloginnav/>,<Adminmain data="admin-viewallcust"/>]}/>
        <Route path='/admin-viewallemp' element={[<Adminloginnav/>,<Adminmain data="admin-viewallemp"/>]}/>
        <Route path='/admin-viewallworker' element={[<Adminloginnav/>,<Adminmain data="admin-viewallworker"/>]}/>
        <Route path='/admin-viewcust/:custid' element={[<Adminloginnav/>,<ViewSingleCust/>]}/>
        <Route path='/admin-viewemp/:empid' element={[<Adminloginnav/>,<ViewSingleEmp/>]}/>
        <Route path='/admin-viewworker/:workerid' element={[<Adminloginnav/>,<ViewSingleWork/>]}/>
        <Route path='/admin-viewall-custcomplaints' element={[<Adminloginnav/>,<Adminmain data="admin-viewall-custcomplaints"/>]}/>
        <Route path='/admin-viewall-workercomplaints' element={[<Adminloginnav/>,<Adminmain data="admin-viewall-workercomplaints"/>]}/>
        <Route path='/admin-viewworkstatus' element={[<Adminloginnav/>,<Adminmain data="admin-viewworkstatus"/>]}/>
      </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;























































































