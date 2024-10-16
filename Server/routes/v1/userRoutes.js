import express from 'express';
import { userAuth } from '../../middlewares/userAuth.js';
import { userSignup, userLogin, userLogout, userProfile, checkUser, userList, userDelete, updateProfile } from '../../controllers/userController.js';


const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/profile", userAuth, userProfile);
router.put("/update", userAuth, updateProfile);
router.delete("/delete/:id", userDelete);
router.get("/userList", userList);
router.get("/check-user", userAuth, checkUser);

export { router as userRouter };