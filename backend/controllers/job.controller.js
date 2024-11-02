import Job from "../models/job.model.js";

export const postJob = async (req, res)=>{
    try {
        const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;
        const userId = req.id;
        
        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        
        const job = await Job.create({
            title, 
            description, 
            requirements: (requirements.split(',')).map(element => element.trim()), 
            salary: Number(salary), 
            location, 
            jobType, 
            experienceLevel: experience, 
            position, 
            company: companyId,
            created_by: userId
        });
        if(!job){
            return res.status(400).json({
                message: "Job not created",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job created successfully",
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


export const getAllJobs = async (req, res)=>{
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                {title:{$regex: keyword, $options:"i"}},
                {description:{$regex: keyword, $options:"i"}},
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).populate({
            path: "created_by"
        }).sort({createdAt: 1});
        if(!jobs){
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Jobs found",
            success: true,
            jobs
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error",
            success: false,
            error: error
        });
    }
}


export const getJobById = async (req, res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job found",
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


export const getAdminJobs = async (req, res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by: adminId}).populate({
            path: 'company'
        });

        if(!jobs){
            return res.status(404).json({
                message: "Jobs not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Jobs found",
            success: true,
            jobs
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error",
            success: false,
            error: error
        });
    }
}