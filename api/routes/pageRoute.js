import express  from "express";
import * as page  from "../controllers/pageController.js";
import FormData from "../middlewares/blogPhotoMiddleware.js"
const router =express.Router()
router.route("/doctor-key").post(FormData.uploadSettingImages,page.getDoctorFilterKey)
router.route("/blog-key").post(FormData.uploadSettingImages,page.getBlogFilterKey)

export default router