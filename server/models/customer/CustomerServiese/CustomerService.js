const ServiceRequest = require("./CustomerServiceSchema");

exports.createServiceRequest = async (req, res) => {
  try {
    const { custid, workerid } = req.body;

    if (!custid || !workerid) {
      return res
        .status(400)
        .json({ message: "Customer ID and Worker ID are required!" });
    }

    // Check if a service request already exists for the same customer and worker
    const existingRequest = await ServiceRequest.findOne({
      custid,
      workerid,
      status: { $ne: "Reject" },
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Service request already exists!" });
    }

    const currentDateTime = new Date(); // Get current date and time

    const newServiceRequest = new ServiceRequest({
      custid,
      workerid,
      date: currentDateTime,
    });

    await newServiceRequest.save();
    res
      .status(201)
      .json({ message: "Service request created!", data: newServiceRequest });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating service request",
        error: error.message,
      });
  }
};

exports.getAllServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find()
      .populate("custid", "name email") // Fetch customer details
      .populate("workerid", "name contact"); // Fetch worker details

    res.status(200).json(serviceRequests);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching service requests",
        error: error.message,
      });
  }
};

exports.getAllPendingServiceRequestsByWorkerid = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({
      status: "Pending",workerid:req.params.workerid
    }).populate("custid workerid");

    res.status(200).json(serviceRequests);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching service requests",
        error: error.message,
      });
  }
};

exports.getAllAcceptServiceRequestsByWorkerid = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({
      status: "Accept",
    }).populate("custid workerid");

    res.status(200).json(serviceRequests);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching service requests",
        error: error.message,
      });
  }
};
exports.getAllCompleteServiceRequestsByWorkerid = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({
      status: "Complete",
    }).populate("custid workerid");

    res.status(200).json(serviceRequests);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching service requests",
        error: error.message,
      });
  }
};

// ✅ Get a single service request by ID
exports.getServiceRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceRequest = await ServiceRequest.findById(id)
      .populate("custid", "name email")
      .populate("workerid", "name contact");

    if (!serviceRequest) {
      return res.status(404).json({ message: "Service request not found!" });
    }

    res.status(200).json(serviceRequest);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching service request",
        error: error.message,
      });
  }
};

// ✅ Update service request status
exports.updateServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Service request not found!" });
    }

    res
      .status(200)
      .json({ message: "Service request updated!", data: updatedRequest });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating service request",
        error: error.message,
      });
  }
};

// ✅ Delete a service request
exports.deleteServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRequest = await ServiceRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Service request not found!" });
    }

    res.status(200).json({ message: "Service request deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error deleting service request",
        error: error.message,
      });
  }
};

exports.toAcceptServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    //   if (!["Pending", "Accept", "Complete", "Reject"].includes(status)) {
    //     return res.status(400).json({ message: "Invalid status!" });
    //   }
    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      id,
      { status: "Accept" },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Service request not found!" });
    }

    res
      .status(200)
      .json({ message: "Service request Accepted!", data: updatedRequest });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating service request",
        error: error.message,
      });
  }
};

exports.toRejectServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    //   if (!["Pending", "Accept", "Complete", "Reject"].includes(status)) {
    //     return res.status(400).json({ message: "Invalid status!" });
    //   }
    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      id,
      { status: "Reject" },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Service request not found!" });
    }

    res
      .status(200)
      .json({ message: "Service request Rejected!", data: updatedRequest });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating service request",
        error: error.message,
      });
  }
};
exports.toCompletedServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    //   if (!["Pending", "Accept", "Complete", "Reject"].includes(status)) {
    //     return res.status(400).json({ message: "Invalid status!" });
    //   }
    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      id,
      { status: "Complete" },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Service request not found!" });
    }

    res
      .status(200)
      .json({ message: "Service request Completed!", data: updatedRequest });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating service request",
        error: error.message,
      });
  }
};
