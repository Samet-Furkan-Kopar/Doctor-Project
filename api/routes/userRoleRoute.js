import * as UserRole from "../controllers/user/roleController.js"
import FormData from "../middlewares/blogPhotoMiddleware.js"
import express  from "express"


const router = express.Router()


router.route("/").post(FormData.uploadSettingImages,UserRole.create)
router.route("/").get(UserRole.getAll)
router.route("/detail/:id").get(UserRole.getDetail)
router.route("/:id").delete(UserRole.remove)
router.route("/:id").put(FormData.uploadSettingImages,UserRole.update)

export default router
