import Country from "../models/location/countryModel.js"
import City from "../models/location/cityModel.js"
import District from "../models/location/districtModel.js"
import Neighbourhood from "../models/location/neighbourhoodModel.js"
import tryCatch from "../utils/tryCatch.js"
import AppError from "../utils/appError.js"


const getAllCity = tryCatch(async (req, res) => {
    const lang = req.user?.language
    const getAll = await City.find({ countryId: req.params.id }, "-createdAt -updatedAt").sort({ plateNumer: 1 });
    let data = []
    if (getAll.length > 0) {
        for (const i of getAll) {
            data.push({
                type: "string",
                label: i?.name || "",
                value: i._id
            })
        }
    }
    if (!getAll) {
        throw new AppError(i18n.translate("LOCATIONS.CITY_NOT_GETALL",lang), 404);
    }
    res.status(200).json({
        succeded: true,
        data: data,
    });
});
const getallDistrict = tryCatch(async (req, res) => {
    const lang = req.user?.language
    const getall = await District.find({
        cityId: req.params.id,
    });
    if (!getall) {
        throw new AppError(i18n.translate("LOCATIONS.DISTRICT_NOT_GETALL",lang), 404);
    }
    let data = []

    if (getall.length > 0) {
        for (const i of getall) {
            data.push({
                type: "string",
                label: i?.name || "",
                value: i._id
            })
        }
    }


    res.status(200).json({
        succeded: true,
        data: data,
    });
});
const getAllCountry = tryCatch(async (req, res) => {
    const getAll = await Country.find({}, "-createdAt -updatedAt")
    if (!getAll) {
        throw new AppError(i18n.translate("LOCATIONS.COUNTRY_NOT_GETALL",lang), 404);
    }
    let data = []

    if (getAll.length > 0) {
        for (const i of getAll) {
            data.push({
                type: "string",
                label: i?.name || "",
                value: i._id
            })
        }
    }

    res.status(200).json({
        succeded: true,
        data: data,
    });
})
const getAllNeighbourhood = tryCatch(async (req, res) => {
    const getAll = await Neighbourhood.find({ districtId: req.params.id }, "-createdAt -updatedAt")
    let data = []

    if (getAll.length > 0) {
        for (const i of getAll) {
            data.push({
                type: "string",
                label: i?.name || "",
                value: i._id
            })
        }
    }

    res.status(200).json({
        succeded: true,
        data: data,
    });
})

const createCity = async (req, res) => {
    try {
        const city = await City.create({
            countryId: req.body.countryId,
            name: req.body.name,
            plateNumer: req.body.plateNumer
        });
        res.status(200).json({
            succeded: true,
            data: city,
            message: i18n.translate("LOCATIONS.CITY_CREATED",lang)
        });
    } catch (error) {
        res.status(404).json({
            succeded: false,
            data: error,
        });
    }
};
const createDistrict = async (req, res) => {
    try {
        const district = await District.create({
            cityId: req.body.cityId,
            name: req.body.name,
        });
        res.status(200).json({
            succeded: true,
            data: district,
        });
    } catch (error) {
        res.status(404).json({
            succeded: false,
            data: error,
        });
    }
};
const createCountry = tryCatch(async (req, res) => {
    console.log(req.body);
    const country = await Country.create({
        name: req.body.name,
    });
    res.status(200).json({
        succeded: true,
        data: country,
    });
})
const createNeighbourhood = async (req, res) => {
    try {
        const district = await Neighbourhood.create({
            districtId: req.body.districtId,
            name: req.body.name,
        });
        res.status(200).json({
            succeded: true,
            data: district,
        });
    } catch (error) {
        res.status(404).json({
            succeded: false,
            data: error,
        });
    }
};
export { createCity, createDistrict, createCountry, createNeighbourhood, getAllCity, getallDistrict, getAllCountry, getAllNeighbourhood };
