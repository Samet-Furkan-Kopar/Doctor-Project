import UserRole from "../../models/user/userRoleModel.js";
import tryCatch from "../../utils/tryCatch.js"
import AppError from "../../utils/appError.js"



const create = tryCatch(async (req, res) => {
    const create = await UserRole.create({
        role:req.body.role
    })
    if (!create) {
        throw new AppError("fdsdf", 404)
    }
    res.status(200).json({
        succeded: true,
        //message:i18n.translate("AUTHORIZATION.USER_ROLE_CREATED",lang),
        data:create
    })
})
const remove = tryCatch(async (req, res) => {
    const remove = await UserRole.findOneAndRemove({
        _id: req.params.id
    })
    if (!remove) {
        throw new AppError("xv", 404)
    }
    res.status(200).json({
        succeded: true,
        data:remove,
       // message:i18n.translate("AUTHORIZATION.USER_ROLE_DELETED",lang)
    })
})
const update = tryCatch(async (req, res) => {
    const id = req.params.id
    const update = await UserRole.findByIdAndUpdate(id, req.body)
    if (!update) {
        throw new AppError("dssd", 404)
    }
    res.status(200).json({
        succeded: true,
        data:update,
       // message:i18n.translate("AUTHORIZATION.USER_ROLE_UPDATED",lang)
    })
})
const getAll = tryCatch(async (req, res) => {
    let { page, paginate, searchKey ,startDate,endDate} = req.query;

    if (!page) page = 1
    if (!paginate) paginate = 10
    const skip = (page - 1) * paginate
    if (!searchKey) searchKey = ''
    const filterObj = {
        "$or": [{
                "role": {
                    $regex: searchKey
                }
            }
        ],
    }
    if (endDate) {
        const originalDate = new Date(endDate);
        const oneDay = 24 * 60 * 60 * 1000;
        endDate = new Date(originalDate.getTime() + oneDay);
      }
    if (startDate === endDate && startDate && endDate) {
        const lastDate = new Date(startDate)
        lastDate.setDate(lastDate.getDate() + 1);
         filterObj["$and"] = [
            {
                "createdAt": {
                    $gte: startDate, // Başlangıç tarihi
                    $lte: lastDate // Bitiş tarihi
                }
            }
        ];
    }else if (startDate && endDate) {
        filterObj["$and"] = [
            {
                "createdAt": {
                    $gte: startDate, // Başlangıç tarihi
                    $lte: endDate // Bitiş tarihi
                }
            }
        ];
    } else if (startDate) {
        filterObj["$and"] = [
            {
                "createdAt": {
                    $gte: startDate, // Başlangıç tarihi
                }
            }
        ];
    } else if (endDate) {
        filterObj["$and"] = [
            {
                "createdAt": {
                    $lte: endDate // Bitiş tarihi
                }
            }
        ];
    }
    const getAll = await UserRole.find(filterObj).skip(skip).limit(paginate)
    if (!getAll) {
        throw new AppError("sadfsd", 404)
    }
    const totalRecord = await UserRole.find(filterObj).count()
    res.status(200).json({
        succeded: true,
        data:getAll,
        totalRecord,
        //message:i18n.translate("AUTHORIZATION.USER_ROLE_GETALL",lang)
    })
})
const getDetail = tryCatch (async (req,res)=>{
    const id = req.params.id
    const result = await UserRole.findOne({_id:id})
    if (!result) {
        throw new AppError("Bulunamadı",404)
    }
    res.status(200).json({
        succeded:true,
        data:result
    })
})

export {
    create,
    remove,
    update,
    getAll,
    getDetail
}