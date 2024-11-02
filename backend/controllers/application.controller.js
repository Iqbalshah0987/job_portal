import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false
            });
        }


        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }


        // check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job Applied Successfully",
            success: true,
        });


    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error",
            success: false,
            error: error
        });
    }
}



export const getAppliedJobs = async (req, res)=>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant: userId}).populate({
            path: 'job',
            options: {sort: {createdAt: -1}},
            populate: {
                path: 'company',
                options: {sort: {createdAt: -1}}
            }
        }).sort({createdAt: -1});

        if(!application){
            return res.status(404).json({
                message: "No Applications",
                success:false
            });
        }

        return res.status(200).json({
            message: "All Applicants",
            success: true,
            application
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error",
            success: false,
            error: error
        });
    }
}



// admin dekhega kitne user ne apply kiya hai
export const getApplicants = async (req, res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: {sort: {createdAt:-1}},
            populate: {
                path: 'applicant'
            }
        });

        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success:false
            });
        }

        return res.status(200).json({
            message: "Applicants",
            success: true,
            job
        });


    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error",
            success: false,
            error: error
        });
    }
}


export const updateStatus = async (req, res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        // console.log(status, applicationId);

        if(!status){
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        // find the application by application id
        const application = await Application.findOne({_id: applicationId});
        if(!application){
            return res.status(404).json({
                message: "Application Not found",
                success: false,
            });
        }

        // update status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error",
            success: false,
            error: error
        });
    }
}