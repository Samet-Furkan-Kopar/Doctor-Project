import express  from "express";
import formDataMiddleware from "../middlewares/photoMiddleware.js";
import * as FAQ from "../controllers/faqController.js";


const router =express.Router()

router.route("/").get(FAQ.getAll)
router.route("/").post(FAQ.create)
router.route("/:id").get(FAQ.getDetail)
router.route("/:id").delete(FAQ.remove)
router.route("/:id").put(formDataMiddleware.uploadSettingImages, FAQ.update)

export default router