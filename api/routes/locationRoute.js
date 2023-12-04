import express from "express"
import * as cityRoute from "../controllers/locationController.js";
import FormData from "../middlewares/blogPhotoMiddleware.js"
import LocationValidations from "../validations/locationValidation.js";
const router = express.Router();

router.route("/city").post(FormData.uploadSettingImages,LocationValidations.CityCreateValidate,cityRoute.createCity)
router.route("/district").post(FormData.uploadSettingImages,LocationValidations.DistrictCreateValidate,cityRoute.createDistrict)
router.route("/country").post(FormData.uploadSettingImages,LocationValidations.CountryCreateValidate,cityRoute.createCountry)
router.route("/neighbourhood").post(FormData.uploadSettingImages,LocationValidations.NeighbourhoodCreateValidate,cityRoute.createNeighbourhood)

router.route("/country").get(cityRoute.getAllCountry)
router.route("/city/:id").get(cityRoute.getAllCity)
router.route("/district/:id").get(cityRoute.getallDistrict)
router.route("/neighbourhood/:id").get(cityRoute.getAllNeighbourhood)


export default router;