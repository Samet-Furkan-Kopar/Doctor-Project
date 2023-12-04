import express  from "express";
import * as faqCategory  from "../controllers/faqCategoryController.js";


const router =express.Router()

router.route("/all").get(faqCategory.getAll)
router.route("/").get(faqCategory.getList)
router.route("/").post(faqCategory.create)
router.route("/:id").delete(faqCategory.remove)
router.route("/:id").put(faqCategory.update)
export default router