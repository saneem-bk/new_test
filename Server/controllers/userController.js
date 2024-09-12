import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/Token.js";
import mongoose from "mongoose";

export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "all fields required" });
        }
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ message: "user already exist" });
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = generateToken(newUser.id);

        res.cookie("token", token);
        res.json({ success: true, message: "user created successfully" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ success: false, message: "user does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "user not autherized" });
        }

        const token = generateToken(userExist.id);

        res.cookie("token", token);
        res.json({ success: true, message: "user login successfull" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const userLogout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.json({ message: "user logout success", success: true });
    } catch (error) {
        console.log(error);
        next(error)
    }
};
export const userProfile = async (req, res, next) => {
    try {
        const { user } = req;
        console.log(user, "=user");

        const userData = await User.findOne({ _id: user.id });

        res.json({ success: true, message: "user data fetched", data: userData });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const updateProfile = async (req, res, next) => {
    try {
        const { user } = req;
        console.log(user, "=user");

        const updatedUser = await User.findByIdAndUpdate(
            { _id: user.id },
            { email, password },
            {
                new: true
            }
        );

        res.json({ success: true, message: "updated user", data: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const checkUser = async (req, res, next) => {
    try {
        const { user } = req;
        if (!user) {
            res.status(401).json({ success: false, message: "user not autherized" });
        }

        res.json({ success: true, message: "user autherized" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



export const userList = async (req, res, next) => {
    try {
        const userList = await User.find().select('-password')
        if (!userList) {
            res.status(401).json({ success: false, message: "No users yet" });
        }
         res.json({ success: true, message: "user autherized" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const userDelete = async (req, res, next) => {
    try {
        const DeletedUser = mongoose.model('DeletedUser', {
            name: String,
            email: String
        });
        
        id = req.params.id;
        const user = await User.findById(id);
        await user.remove();
        const deletedUser = new
            DeletedUser(user);
        await deletedUser.save();

        res.json({ success: true, message: "deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};
