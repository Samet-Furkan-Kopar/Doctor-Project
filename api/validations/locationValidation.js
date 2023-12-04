import { checkSchema, validationResult } from "express-validator";
import District from "../models/location/districtModel.js";
import City from "../models/location/cityModel.js";
import Country from "../models/location/countryModel.js";
import Neighbourhood from "../models/location/neighbourhoodModel.js";


const NeighbourhoodCreateValidate = [checkSchema({
    name: {
        notEmpty: {
            errorMessage:"" //i18n.translate("VALIDATIONS.IS_EMPTY", lang, ["Name"])
        },
        isString: {
            errorMessage: "" //i18n.translate("VALIDATIONS.IS_STRING", lang, ["Name"])
        },
        custom: {
            options: async (value) => {
                console.log(value)
                const check = await Neighbourhood.findOne({ name: value })
                if (check) {
                    return Promise.reject();
                }
            },
            errorMessage:"" //i18n.translate("VALIDATIONS.EXIST", lang, ["Name"])
        }
    },
    districtId: {
        notEmpty: {
            errorMessage: "" //i18n.translate("VALIDATIONS.IS_EMPTY", lang, ["District"])
        },
        isString: {
            errorMessage: "" //i18n.translate("VALIDATIONS.IS_STRING", lang, ["District"])
        },
    },
   
}),
(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        const msg = [];
        for (let i = 0; i < errors.errors.length; i++) {
            msg.push({
                path: errors.errors[i].path,
                message: errors.errors[i].msg
            });
        }

        return res.status(422).json({
            succeded: false,
            error: msg
        })
        //throw new AppError(msg, 422);
    } else {
        next();
    }
},
];
const DistrictCreateValidate = [checkSchema({
    name: {
        notEmpty: {
            errorMessage: "" //i18n.translate("VALIDATIONS.IS_EMPTY", lang, ["Name"])
        },
        isString: {
            errorMessage:"" // i18n.translate("VALIDATIONS.IS_STRING", lang, ["Name"])
        },custom: {
            options: async (value) => {
                console.log(value)
                const check = await District.findOne({ name: value })
                if (check) {
                    return Promise.reject();
                }
            },
            errorMessage:"" // i18n.translate("VALIDATIONS.EXIST", lang, ["Name"])
        }
    },
    cityId: {
        notEmpty: {
            errorMessage: "" //i18n.translate("VALIDATIONS.IS_EMPTY", lang, ["City"])
        },
        isString: {
            errorMessage:"" // i18n.translate("VALIDATIONS.IS_STRING", lang, ["City"])
        },

    },
   
}),
(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        const msg = [];
        for (let i = 0; i < errors.errors.length; i++) {
            msg.push({
                path: errors.errors[i].path,
                message: errors.errors[i].msg
            });
        }

        return res.status(422).json({
            succeded: false,
            error: msg
        })
        //throw new AppError(msg, 422);
    } else {
        next();
    }
},
];
const CountryCreateValidate = [checkSchema({
    name: {
        notEmpty: {
            errorMessage:"" // i18n.translate("VALIDATIONS.IS_EMPTY", lang, ["Name"])
        },
        isString: {
            errorMessage:"" // i18n.translate("VALIDATIONS.IS_STRING", lang, ["Name"])
        },
        custom: {
            options: async (value) => {
                console.log(value)
                const check = await Country.findOne({ name: value })
                if (check) {
                    return Promise.reject();
                }
            },
            errorMessage:"" // i18n.translate("VALIDATIONS.EXIST", lang, ["Name"])
        }
    },
}),
(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        const msg = [];
        for (let i = 0; i < errors.errors.length; i++) {
            msg.push({
                path: errors.errors[i].path,
                message: errors.errors[i].msg
            });
        }

        return res.status(422).json({
            succeded: false,
            error: msg
        })
        //throw new AppError(msg, 422);
    } else {
        next();
    }
},
];
const CityCreateValidate = [checkSchema({
    name: {
        notEmpty: {
            errorMessage:"" // i18n.translate("VALIDATIONS.IS_EMPTY", lang, ["Name"])
        },
        isString: {
            errorMessage: "" //i18n.translate("VALIDATIONS.IS_STRING", lang, ["Name"])
        },custom: {
            options: async (value) => {
                console.log(value)
                const check = await City.findOne({ name: value })
                if (check) {
                    return Promise.reject();
                }
            },
            errorMessage:"" // i18n.translate("VALIDATIONS.EXIST", lang, ["Name"])
        }
    },
    countryId: {
        notEmpty: {
            errorMessage: "" //i18n.translate("VALIDATIONS.IS_EMPTY", lang, ["Country"])
        },
        isString: {
            errorMessage: "" //i18n.translate("VALIDATIONS.IS_STRING", lang, ["Country"])
        },
    },
    plateNumber: {
        notEmpty: {
            errorMessage:"" // i18n.translate("VALIDATIONS.IS_EMPTY", lang, ["Plate Number"])
        }
    },
}),
(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        const msg = [];
        for (let i = 0; i < errors.errors.length; i++) {
            msg.push({
                path: errors.errors[i].path,
                message: errors.errors[i].msg
            });
        }

        return res.status(422).json({
            succeded: false,
            error: msg
        })
        //throw new AppError(msg, 422);
    } else {
        next();
    }
},
];


const LocationValidations = {
    NeighbourhoodCreateValidate,
    DistrictCreateValidate,
    CountryCreateValidate,
    CityCreateValidate
  };
  
  export default LocationValidations;
  