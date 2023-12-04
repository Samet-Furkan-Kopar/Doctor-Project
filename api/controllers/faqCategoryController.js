import FAQCategory from "../models/faqCategoryModel.js";
import tryCatch from "../utils/tryCatch.js"
import AppError from "../utils/appError.js"
import FAQ from "../models/faqModel.js";
//Bodyden gelen verileri Veri tabanına kaydetme işlemlerini yapıyor

const create = tryCatch(async (req, res) => {

    const create = await FAQCategory.create(req.body)
    if (!create) {
        throw new AppError("EducationCategory could not be created", 404)
    }
    res.status(200).json({
        succeded: true,
        create
    })
})
//Paramsdan gelen id'yi Veri tabanından silme işlemini yapıyor

const remove = tryCatch(async (req, res) => {

    const checkIsUsed = await FAQ.find({faqCategoryId: req.params.id}).count();
    if(checkIsUsed){
        throw new AppError("The faq category is actively used. You cannot delete it.  ", 422)
    }

    const remove = await FAQCategory.findOneAndRemove({
        _id: req.params.id
    })

    if (!remove) {
        throw new AppError("FAQCategory  not deleted", 404)
    }
    res.status(200).json({
        succeded: true,
        remove
    })
})
//Paramsdan gelen id ile buldugu datayı, body gelen verilerle güncelleme işlemini yapıyor

const update = tryCatch(async (req, res) => {
    const id = req.params.id

    const update = await FAQCategory.findByIdAndUpdate(id, req.body)
    if (!update) {
        throw new AppError("FAQCategory  not update", 404)
    }
    res.status(200).json({
        succeded: true,
        update
    })
})

//Verileri filtere ile  listeleme işlemi yapıyor
const getList = tryCatch(async (req, res) => {
    let {
        page,
        paginate
    } = req.query;

    if (!page) page = 1
    if (!paginate) paginate = 10
    const skip = (page - 1) * paginate
    const getAll = await FAQCategory.find({}).skip(skip).limit(paginate)
    if (!getAll) {
        throw new AppError("FAQCategory  failed to fetch", 404)
    }
    res.status(200).json({
        succeded: true,
        getAll
    })
})

//Tüm verileri listeleme işlemi yapıyor
const getAll = tryCatch(async (req, res) => {
 
    const getAll = await FAQCategory.find({})
    if (!getAll) {
        throw new AppError("FAQCategory  failed to fetch", 404)
    }
    res.status(200).json({
        succeded: true,
        getAll
    })
})

export {
    create,
    remove,
    update,
    getAll,
    getList
}