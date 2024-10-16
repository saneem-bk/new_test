import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {

    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ success: false, message: "no token" });
        }
        
        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!tokenVerified) {
            return res.status(401).json({ success: false, message: "admin not autherized" });
        }

        console.log("tokenVerified =", tokenVerified);

        req.admin = tokenVerified;

        next();
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

