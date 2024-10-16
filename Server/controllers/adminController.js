import { adminToken } from "../utils/Token.js";
import bcrypt from "bcrypt";
import Admin from "../models/adminModel.js";

export const adminSignup = async (req, res, next) => {
    try {
        const { name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "all fields required" });
        }
        const isAdminExist = await Admin.findOne({ email: {$regex: email, $options: 'i'} });

        if (isAdminExist) {
            return res.status(400).json({ message: "admin already exist" });
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const lcEmail = email.toLowerCase();
        const newAdmin = new Admin({ name, email: lcEmail, password: hashedPassword});
        await newAdmin.save();

        const token = adminToken(newAdmin.id, "admin");

        res.cookie("token", token);
        res.json({ success: true, message: "admin created successfully" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const adminExist = await Admin.findOne({ email: {$regex: email, $options: 'i'} });
        console.log(adminExist)
        if (!adminExist) {
            return res.status(404).json({ success: false, message: "admin does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, adminExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "admin is not autherized" });
        }

        const token = adminToken(adminExist.id, "admin");

        res.cookie("token", token);
        res.json({ success: true, message: "admin login successfull" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const  adminLogout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.json({ message: "admin logout success", success: true });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const checkAdmin = async (req, res, next) => {
    try {
        const { admin } = req;
        const adminExist = await Admin.findById(admin.id);
        if (!adminExist) {
           return res.status(401).json({ success: false, message: "user not autherized" });
        }

        res.json({ success: true, message: "admin autherized" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



