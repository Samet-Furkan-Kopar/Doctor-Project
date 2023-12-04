import tryCatch from "../../utils/tryCatch.js"
import AppError from "../../utils/appError.js"
import User from "../../models/user/userModel.js";
import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"
import Office from "../../models/officeModel.js";
import Country from "../../models/location/countryModel.js"
import City from "../../models/location/cityModel.js"
import District from "../../models/location/districtModel.js"
import Neighbourhood from "../../models/location/neighbourhoodModel.js"
import lodash from "lodash"
import fs from "fs"

const doctorRegister = tryCatch(async (req, res) => {
    const register = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
        type: "doctor",
        userRole: req.body.userRole
    });
    if (!register) {
        return res.status(404).json({
            succeded: false,
            // message: i18n.translate("USERS.USER_NOT_CREATED", lang),
        });
    }
    const office = await Office.create({
        ownerId: register._id,
        companyName: req.body.companyName,
        companyTitle: req.body.companyTitle,
        taxNo: req.body.taxNo,
        taxOffice: req.body.taxOffice,
        countryId: req.body.countryId,
        cityId: req.body.cityId,
        districtId: req.body.districtId,
        neighbourhoodId: req.body.neighbourhoodId,
    })
    res.status(200).json({
        succeded: true,
        //message: i18n.translate("USERS.USER_CREATED", lang)
    });
});
const individualRegister = tryCatch(async (req, res) => {
    const register = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
        type: "user",
        isApproved: true,
    });
    if (!register) {
        return res.status(404).json({
            succeded: false,
            //message: i18n.translate("USERS.USER_NOT_CREATED", lang),
        });
    }
    res.status(200).json({
        succeded: true,
        //message: i18n.translate("USERS.USER_CREATED", lang)
    });
});
const userLogin = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
    });

    let same = false;
    if (user) {
        same = await bcrypt.compare(password, user.password);
    } else {
        throw new AppError("User Bulunamadı", 404);
    }
    if (same) {
        const user = await User.findOne(
            {
                email,
            },
            "-password -token"
        );
        const token = await createToken(user._id);

        if (!token) {
            //throw new AppError(i18n.translate("USERS.USER_TOKEN_ERROR", lang), 404);
        }
        let oldTokens = user.tokens || [];
        if (oldTokens.length) {
            oldTokens.filter((t) => {
                const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
                if (timeDiff < 86400) {
                    return t;
                }
            });
        }
        await User.findByIdAndUpdate(user._id, {
            tokens: [
                ...oldTokens,
                {
                    token,
                    signedAt: Date.now().toString(),
                },
            ],
        });
        const users = await User.findOne(
            {
                email,
            },
            "-password -token -tokens"
        );
        return res.status(200).json({
            succeded: true,
            data: {
                token,
                user: users,
                // message: i18n.translate("USERS.USER_SUCCESS_LOGIN", lang),
            },
        });
    } else {
        throw new AppError("Şifre Hatalı", 401);
    }
});
const createToken = async (id) => {
    return jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
};
const userFilter = tryCatch(async (req, res) => {
    let { page, paginate } = req.query
    let { role, country, city, district, neighbourhood, searchKey } = req.body
    if (!page) page = 1
    if (!paginate) paginate = 10
    const skip = (page - 1) * paginate

    if (!searchKey) searchKey = ''

    let filterObj = {
        "$or": [{
            "companyName": {
                $regex: searchKey
            }
        },
        {
            "companyTitle": {
                $regex: searchKey
            }
        },
            // {
            //     "ownerId": {
            //       $elemMatch: {
            //         "firstName": { $regex: searchKey } // 'posts' alanındaki 'author' alanında arama
            //       }
            //     }
            //   }
        ],
    }
    if (role) {
        const result = await User.find({ userRole: role })
        let filterRole = []
        if (result) {
            for (const i of result) {
                filterRole.push(i._id)
            }
        }
        filterObj.ownerId = { $in: filterRole }
    }

    if (country) filterObj.countryId = country
    if (city) filterObj.cityId = city
    if (district) filterObj.districtId = district
    if (neighbourhood) filterObj.neighbourhoodId = neighbourhood

    const result = await Office.find(filterObj).skip(skip).limit(paginate)
        .populate({ path: 'ownerId', select: 'firstName lastName phoneNumber email userRole image_url', populate: { path: "userRole", select: "role" } })
        .populate({ path: 'countryId', select: 'name' })
        .populate({ path: 'cityId', select: 'name' })
        .populate({ path: 'districtId', select: 'name' })
        .populate({ path: 'neighbourhoodId', select: 'name' })
    const totalRecord = await Office.find(filterObj).count()
    res.status(200).json({
        succeded: true,
        data: result,
        totalRecord
    })
})
const userDetail = tryCatch(async (req, res) => {
    const user = req.user

    let detail = {
        firstName: {
            type: "string",
            label: "Adınız",
            value: user?.firstName || ""
        },
        lastName: {
            type: "string",
            label: "Soyadınız",
            value: user?.lastName || ""
        },
        email: {
            type: "string",
            label: "E-mail",
            value: user?.email || ""
        },
        phoneNumber: {
            type: "string",
            label: "Telefon Numarası",
            value: user?.phoneNumber || ""
        },
        image_url: {
            type: "string",
            label: "Kullanıcı Fotografı",
            value: user?.image_url || ""
        },
        type: {
            type: "string",
            label: "Kullanıcı Rolü",
            value: user?.type || ""
        }
    }


    if (user.type === "doctor") {
        const office = await Office.findOne({ ownerId: user._id }).populate(["countryId", "cityId", "districtId", "neighbourhoodId"])
        const country = await Country.find({})
        const city = office?.countryId?._id ? await City.find({ countryId: office?.countryId?._id }) : []
        const district = office?.cityId?._id ? await District.find({ cityId: office?.cityId?._id }) : []
        const neighbourhood = office?.districtId?._id ? await Neighbourhood.find({ districtId: office?.districtId?._id }) : []
        let countryData = []
        let cityData = []
        let districtData = []
        let neighbourhoodData = []
        if (country.length > 0) {
            for (const i of country) {
                countryData.push({
                    type: "string",
                    label: i.name,
                    value: i._id,
                });
            }
        }
        if (city.length > 0) {
            for (const i of city) {
                cityData.push({
                    type: "string",
                    label: i.name,
                    value: i._id,
                });
            }
        }
        if (district.length > 0) {
            for (const i of district) {
                districtData.push({
                    type: "string",
                    label: i.name,
                    value: i._id,
                });
            }
        }
        if (neighbourhood.length > 0) {
            for (const i of neighbourhood) {
                neighbourhoodData.push({
                    type: "string",
                    label: i.name,
                    value: i._id,
                });
            }
        }
        detail.companyName = {
            type: "string",
            label: "Firma Adı",
            value: office?.companyName || ""
        }
        detail.companyTitle = {
            type: "string",
            label: "Firma Ünvanı",
            value: office?.companyTitle || ""
        }
        detail.taxNo = {
            type: "number",
            label: "Vergi No",
            value: office?.taxNo || 0
        }
        detail.taxOffice = {
            type: "string",
            label: "Vergi Dairesi",
            value: office?.taxOffice || ""
        }
        detail.logo_url = {
            type: "string",
            label: "Logo",
            value: office?.logo_url || ""
        }
        detail.coverPhoto = {
            type: "string",
            label: "Kapak Fotografı",
            value: office?.coverPhoto || ""
        }
        detail.description = {
            type: "string",
            label: "Açıklama",
            value: office?.description || ""
        }
        detail.address = {
            type: "string",
            label: "Adres",
            value: office?.address || ""
        }
        detail.aboutUs = {
            type: "string",
            label: "Hakkımda",
            value: office?.aboutUs || ""
        }
        detail.description = {
            type: "string",
            label: "Açıklama",
            value: office?.description || ""
        }
        detail.countryId = {
            type: "string",
            label: office?.countryId?.name || "",
            value: office?.countryId?._id || "",
            options: countryData
        }
        detail.cityId = {
            type: "string",
            label: office?.cityId?.name || "",
            value: office?.cityId?._id || "",
            options: cityData
        }
        detail.districtId = {
            type: "string",
            label: office?.districtId?.name || "",
            value: office?.districtId?._id || "",
            options: districtData
        }
        detail.neighbourhoodId = {
            type: "string",
            label: office?.neighbourhoodId?.name || "",
            value: office?.neighbourhoodId?._id || "",
            options: neighbourhoodData
        }
        detail.latitude = {
            type: "number",
            label: "latitude",
            value: office?.latitude || 0
        }
        detail.longitude = {
            type: "number",
            label: "longitude",
            value: office?.longitude || 0
        }

    }

    res.status(200).json({
        succeded: true,
        data: detail
    })
})
const userUpdate = tryCatch(async (req, res) => {
    const bodyWithoutEmptyValues = lodash.pickBy(req.body, lodash.identity);
    req.body = bodyWithoutEmptyValues

    const id = req.user._id

    const user = await User.findOne({ _id: id })
    if (req.body.image_url && user.image_url) {
        photoDelete(user.image_url)
    }

    const userupdate = await User.findByIdAndUpdate(id, req.body)
    if (user.type === "doctor") {
        const result = await Office.findOne({ ownerId: id })
        if (req.body?.logo_url && result.logo_url) {
            photoDelete(result.logo_url)
        }
        if (req.body?.coverPhoto && result.coverPhoto) {
            photoDelete(result.coverPhoto)
        }
        const updateData = await Office.findByIdAndUpdate(result._id, req.body, { new: true })
        if (!updateData) {
            throw new AppError("Güncellemede Hata Oluştu", 404)
        }
    }

    res.status(200).json({
        succeded: true,
        message: "Ofis Güncelleme Başarılı Şekilde Oldu"
    })
    function photoDelete(filePath) {
        console.log(filePath);
        let path = filePath.split("http://localhost:8800")
        console.log(path);
        path = `public${path[1]}`
        fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                console.error('Fotoğraf bulunamadı:', err);
                return;
            }

            // Fotoğrafı sil
            fs.unlink(path, (unlinkErr) => {
                if (unlinkErr) {
                    console.error('Fotoğrafı silme hatası:', unlinkErr);
                } else {
                    console.log('Fotoğraf başarıyla silindi.');
                }
            });
        });

    }

})
const userPasswordUpdate = tryCatch(async(req,res)=>{
    const id = req.user._id
    const user = await User.findById(id);
    let same = false
    same = await bcrypt.compare(req.body.currentpassword, user.password);
    if (same) {
        const newPassword = await hashpassword(req.body.password)
        const update = await User.findByIdAndUpdate(id, {
            password: newPassword
        })

        res.status(200).json({
            succedd: true,
            message: 'Şifreniz başarılı bir şekilde değiştirildi.'
        })
    } else {

        res.status(422).json({
            succedd: false,
            message: 'Mevcut şifrenizi kontrol ediniz'
        })
    }
})
async function hashpassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
}
const user = {
    doctorRegister,
    individualRegister,
    userLogin,
    userFilter,
    userDetail,
    userUpdate,
    userPasswordUpdate
}
export default user