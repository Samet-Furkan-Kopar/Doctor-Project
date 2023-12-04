import express  from "express"
import Office from "../controllers/officeController.js"
import FormData from "../middlewares/officeMiddleware.js"
const router = express.Router()


router.route("/detail/:id").get(Office.officeDetail)
router.route("/update/:id").put(FormData.uploadSettingImages,FormData.resizeImages,Office.officeUpdate)

export default router