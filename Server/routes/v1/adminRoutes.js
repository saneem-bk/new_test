import express from "express";
import { adminSignup, adminLogin, adminLogout } from "../../controllers/adminController.js";

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);


export { router as adminRouter };