import express  from "express";
import * as Course  from "../controllers/courseController.js";
import coursePhotoMiddleware from "../middlewares/coursePhotoMiddleware.js";


const router =express.Router()

router.route("/").get(Course.getAll)
router.route("/list/all").get(Course.getListAll)
router.route("/").post(coursePhotoMiddleware.uploadSettingImages,coursePhotoMiddleware.resizeImages,Course.create)
router.route("/:id").get(Course.getDetail)
router.route("/:id").delete(Course.remove)
router.route("/:id").put(coursePhotoMiddleware.uploadSettingImages,coursePhotoMiddleware.resizeImages,Course.update)

export default router