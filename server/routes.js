const express=require('express')
const router=express.Router()

const customer=require("./models/customer/customerController")
const Worker=require("./models/Worker/workerController")
const employer=require("./models/Employer/employerController")
const jobreq=require("./models/customer/PostJob/PostjobController")
const emppostjob=require('./models/Employer/EmpPostJob/EmpPostJobController')
const workeracceptreq=require("./models/customer/Jobrequest/workerJobApprovalControler")
const workstatus=require("./models/Worker/WorkStatus/workStatusController")
const empjobreq=require("./models/Employer/EmpJobRequest/JobRequestController")
const interviews=require("./models/Interviews/interviewController")
const customercomplaints=require("./models/customer/Complaints/AddComplaintController")
const customerreviews=require("./models/customer/Reviews/ReviewsController")
const serviceRequestController=require("./models/customer/CustomerServiese/CustomerService")
// Customer
router.post("/registercust",customer.upload,customer.registercust)
router.post("/logincust",customer.custLogin)
router.post("/verifytoken",customer.verifyToken)
router.post("/custresetpswd/:id",customer.custresetpswd)
router.post("/updatecustprofile/:id",customer.upload,customer.updatecustprofile)
router.post("/viewallcust",customer.viewallcust)
router.post("/viewallactivecust",customer.viewallactivecust)
router.post("/viewcustbyid/:id",customer.viewcustbyid)
router.post("/deletecust/:id",customer.deletecustById)
router.post("/forgotPWDsentMail",customer.forgotPWDsentMail)
router.post("/removebyadminbycustid/:id",customer.removebyadminbycustid)
//Worker
router.post("/registerworker",Worker.registerworker)
router.post("/loginworker",Worker.workerLogin)
router.post("/workerresetpswd/:id",Worker.workerresetpswd)
router.post("/updateworkerprofile/:id",Worker.upload,Worker.updateworkerprofile)
router.post("/viewallworker",Worker.viewallworker)
router.post("/viewworkerpendingreq",Worker.viewworkerpendingreq)
router.post("/viewworkerbyid/:id",Worker.viewworkerbyid)
router.post("/deleteworkerById/:id",Worker.deleteworkerById)
router.post("/viewworkerreq",Worker.viewworkerreq)
router.post("/approveworkerid/:id",Worker.approveworkerid)
router.post("/rejectworkerbyid/:id",Worker.rejectworkerbyid)
router.post("/removebyadminbyworkerid/:id",Worker.removebyadminbyworkerid)
// worker Ratings 
router.post("/addRating/:id",Worker.addRating)
router.post("/topratedWorkers",Worker.topratedWorkers)
//Employer
router.post("/employerreg",employer.upload,employer.registeremp)
router.post("/emplogin",employer.empLogin)
router.post("/employerresetpswd/:id",employer.employerresetpswd)
router.post("/updateempprofile/:id",employer.upload,employer.updateempprofile)
router.post("/viewallemployer",employer.viewallemployer)
router.post("/viewemployerpendingreq",employer.viewemployerpendingreq)
router.post("/viewempbyid/:id",employer.viewempbyid)
router.post("/deleteempById/:id",employer.deleteempById)
router.post("/viewemployerreq",employer.viewemployerreq)
router.post("/approveempbyid/:id",employer.approveempbyid)
router.post("/rejectempbyid/:id",employer.rejectempbyid)
router.post("/removebyadminbyempid/:id",employer.removebyadminbyempid)
//EmpPostJob
router.post("/registerjob",emppostjob.registerjob)
router.post("/viewEmpPostJobByEmpid/:id",emppostjob.viewEmpPostJobByEmpid)
router.post("/viewEmpPostJobById/:id",emppostjob.viewEmpPostJobById)
router.post("/viewAllEmpPostJob",emppostjob.viewAllEmpPostJob)
router.post("/acceptJobReqsById/:id",emppostjob.acceptJobReqsById)
// EmpJob Req
router.post("/empjobreq/:id",empjobreq.empjobrequest)
router.post("/viewReqsbyempid/:id",empjobreq.viewReqsbyempid)
router.post("/viewEmpJobReqsbyJobid/:id",empjobreq.viewEmpJobReqsbyJobid)
router.post("/removeEmpJobReqById/:id",empjobreq.removeEmpJobReqById)

//Job Requests

router.post("/registerjobreq",jobreq.registerjobreq)
router.post("/viewjobreqs/:category",jobreq.viewjobreqs)
router.post("/viewalljobreqs/:id",jobreq.viewalljobreqs)
router.post("/viewjobreqsbyid/:id",jobreq.viewjobreqsbyid)
// router.post("/workeracceptjob/:id",jobreq.workeracceptjob)
router.post("/viewjobreqsbyuserid/:id",jobreq.viewjobreqsbyuserid)
router.post("/viewalljobpost",jobreq.viewalljobpost)
router.post("/acceptJobReqsById/:id",jobreq.acceptJobReqsById)

//worker accept job requests
router.post("/workeracceptjobs/:id",workeracceptreq.workertakejobreq)
router.post("/viewReqsbyUserid/:id",workeracceptreq.viewReqsbyUserid)
router.post("/viewReqsbyJobid/:id",workeracceptreq.viewReqsbyJobid)
router.post("/viewReqsbyWorkerid/:id",workeracceptreq.viewReqsbyWorkerid)
router.post("/acceptReqsById/:id",workeracceptreq.acceptReqsById)
router.post("/viewApprovedReqsbyJobId/:id",workeracceptreq.viewApprovedReqsbyJobId)
router.post("/viewApprovedReqsbyWorkerid/:id",workeracceptreq.viewApprovedReqsbyWorkerid)
router.post("/viewApprovedReqsbycustomerId/:id",workeracceptreq.viewApprovedReqsbycustomerId)
router.post("/updateapprovalstatustopaid/:id",workeracceptreq.updateapprovalstatustopaid)
router.post("/viewAprovdReqsbycustIdRegComplaint/:id",workeracceptreq.viewAprovdReqsbycustIdRegComplaint)
// work status 
router.post("/addworkstatus/:id",workstatus.addworkstatus)
router.post("/OTPVerification",workstatus.OTPVerification)
router.post("/updatePaymentStatus/:id",workstatus.updatePaymentStatus)
router.post("/viewWorksamountById/:id",workstatus.viewWorksamountById)
router.post("/viewCompletedWorksByWorkerId/:id",workstatus.viewCompletedWorksByWorkerId)
router.post("/viewCountCompletedWorksByWorkerId/:id",workstatus.viewCountCompletedWorksByWorkerId)
router.post("/viewAllWorkStatus",workstatus.viewAllWorkStatus)

//interviews

router.post("/createInterview/:id",interviews.createInterview)
router.post("/viewInterviewsByWorkerId/:id",interviews.viewInterviewsByWorkerId)
router.post("/viewInterviewsByEmpId/:id",interviews.viewInterviewsByEmpId)
router.post("/viewInterviewByJobRequestId/:id",interviews.viewInterviewByJobRequestId)
router.post("/viewInterviewById/:id",interviews.viewInterviewById)
router.post("/updateinterviewStatusSelected/:id",interviews.updateinterviewStatusSelected)
router.post("/updateinterviewStatusRejected/:id",interviews.updateinterviewStatusRejected)
router.post("/viewSelectedCandByEmpId/:id",interviews.viewSelectedCandByEmpId)
router.post("/viewRejectedCandByEmpId/:id",interviews.viewRejectedCandByEmpId)
//customer Complaints

router.post("/customerAddComplaints/:id",customercomplaints.customerAddComplaints)
router.post("/workerAddComplaints/:id",customercomplaints.workerAddComplaints)
router.post("/viewComplaintByWorkerId/:id",customercomplaints.viewComplaintByWorkerId)
router.post("/viewComplaintByCustId/:id",customercomplaints.viewComplaintByCustId)
router.post("/viewcomplaintById/:id",customercomplaints.viewcomplaintById)
router.post("/viewallworkercomplaintsinadmin",customercomplaints.viewallworkercomplaintsinadmin)
router.post("/viewallcustomercomplaintsinadmin",customercomplaints.viewallcustomercomplaintsinadmin)

// customer Reviews

router.post("/addReviews",customerreviews.addReviews)
router.post("/viewallreviews",customerreviews.viewallreviews)
router.post("/viewsortreviews",customerreviews.viewsortreviews)
// service
router.post("/apply_serviece", serviceRequestController.createServiceRequest);
router.get("/view_servieces", serviceRequestController.getAllServiceRequests);
router.get("/view_accept_servieces/:id", serviceRequestController.getAllAcceptServiceRequestsByWorkerid);
router.get("/view_serviecebyid/:id", serviceRequestController.getServiceRequestById);
router.post("/update_serviece/:id", serviceRequestController.updateServiceRequest);
router.post("/delete_serviece/:id", serviceRequestController.deleteServiceRequest);
router.post("/getPendingRequests_ByWorkerid/:workerid", serviceRequestController.getAllPendingServiceRequestsByWorkerid);
router.post("/toAcceptServiceRequest/:id", serviceRequestController.toAcceptServiceRequest);
router.post("/toRejectServiceRequest/:id", serviceRequestController.toRejectServiceRequest);
router.post("/toCompletedServiceRequest/:id", serviceRequestController.toCompletedServiceRequest);

module.exports=router