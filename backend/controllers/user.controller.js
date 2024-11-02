import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        const file = req.file;
        // console.log("🚀 ~ register ~ file:", file)
        // console.log("🚀 ~ register ~ req.body:", req.body)
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const user = await User.findOne({ email });
        // console.log("🚀 ~ register ~ user:", user)
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userCreated = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:  file.filename,
            }
        });
        // console.log("🚀 ~ register ~ userCreated:", userCreated)

        return res.status(201).json({
            message: "Account Created Successfully",
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


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // check user exist or not
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // check password same or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account don't exit with current role.",
                success: false
            });
        }

        // generate token
        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome Back ${user.fullname}`,
            success: true,
            user,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error",
            success: false,
            error: error
        });
    }
}


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successfully",
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


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        // console.log("🚀 ~ updateProfile ~ file:", file)

        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }
        
        // updating data
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills){
            const skillsArray = skills.split(",");
            user.profile.skills = skillsArray;
        }
        if(file){
            user.profile.resume = file.filename;     // saved file name
            user.profile.resumeOriginalName = file.originalname;    // save the original file name
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };
        // console.log("🚀 ~ updateProfile ~ user:", user)

        return res.status(200).json({
            message: "Profile Updated Successfully",
            success: true,
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error",
            success: false,
            error: error
        });
    }
}