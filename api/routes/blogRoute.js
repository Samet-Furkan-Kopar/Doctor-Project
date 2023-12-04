import express  from "express";
import * as Blog  from "../controllers/blogController.js";
import FormData from "../middlewares/blogPhotoMiddleware.js";
import Auth from "../middlewares/userAuthMiddleware.js"

const router =express.Router()
router.route("/user-blog").get(Auth.authenticateUserAPIToken,Blog.getUserData)
router.route("/").get(Blog.getAll)
router.route("/list/all").get(Blog.getListAll)
router.route("/").post(Auth.authenticateUserAPIToken,FormData.uploadSettingImages,FormData.resizeImages,Blog.create)
router.route("/:id").get(Blog.getDetail)
router.route("/:id").delete(Blog.remove)
router.route("/:id").put(Auth.authenticateUserAPIToken,FormData.uploadSettingImages,FormData.resizeImages,Blog.update)
router.route("/filter").post(FormData.uploadSettingImages,Blog.blogFilter)
// router.route()

export default router