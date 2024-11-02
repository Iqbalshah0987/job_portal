import Company from '../models/company.model.js';

export const registerCompany = async (req, res)=>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        let company = await Company.findOne({name: companyName});
        if(company){
            return res.status(400).json({
                message: "You can't register because this company already exist",
                success: false
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company Register successfully",
            success: true,
            company
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error",
            success: false,
            error: error
        });
    }
}


// get company by userId
export const getCompany = async (req, res)=>{
    try {
        // logged in userId
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        // console.log(companies);

        return res.status(200).json({
            message: "Companies find",
            success: true,
            companies
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error",
            success: false,
            error: error
        });
    }
}


// get company by company id
export const getCompanyById = async (req, res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "company find",
            success: true,
            company
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error",
            success: false,
            error: error
        });
    }
}



export const updateCompany = async (req, res)=>{
    try {
        const {name, description, website, location} = req.body;
        // console.log("🚀 ~ updateCompany ~ req.body:", req.body)
        // idhar cloudinary ayega
        const file = req.file
        // console.log("🚀 ~ updateCompany ~ file:", file)

        const updateData = {name, description, website, location, logo: file.filename};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true});
        if(!company){
            res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated",
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