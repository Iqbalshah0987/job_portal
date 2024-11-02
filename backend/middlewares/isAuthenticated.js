import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    // console.log("🚀 ~ isAuthenticated ~ req:", req)
    try {
        
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        req.id = decode.userId;
        next();

    } catch (error) {
        console.log(error);
    }
}