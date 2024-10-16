import express from "express";
import { adminSignup, adminLogin, adminLogout, checkAdmin } from "../../controllers/adminController.js";
import { adminAuth } from "../../middlewares/adminAuth.js";

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.get("/check-admin", adminAuth, checkAdmin) 

export { router as adminRouter };