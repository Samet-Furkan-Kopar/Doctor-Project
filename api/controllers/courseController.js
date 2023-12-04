import Course from "../models/courseModel.js";
import tryCatch from "../utils/tryCatch.js"
import AppError from "../utils/appError.js"
//Bodyden gelen verileri Veri tabanına kaydetme işlemlerini yapıyor

const create = tryCatch(async (req, res) => {
    //console.log(req.body);
    const create = await Course.create(req.body)
    if (!create) {
        throw new AppError("Blog could not be created", 404)
    }
    res.status(200).json({
        succeded: true,
        create
    })
})
//Paramsdan gelen id'yi Veri tabanından silme işlemini yapıyor

const remove = tryCatch(async (req, res) => {
    const remove = await Course.findOneAndRemove({
        _id: req.params.id
    })
    if (!remove) {
        throw new AppError("Blog  not deleted", 404)
    }
    res.status(200).json({
        succeded: true,
        remove
    })
})
//Paramsdan gelen id ile buldugu datayı, body gelen verilerle güncelleme işlemini yapıyor

const update = tryCatch(async (req, res) => {
    const id = req.params.id

    const update = await Course.findByIdAndUpdate(id, req.body)
    if (!update) {
        throw new AppError("Blog  not update", 404)
    }
    res.status(200).json({
        succeded: true,
        update
    })
})
//Verileri filtere ile  listeleme işlemi yapıyor

const getAll = tryCatch(async (req, res) => {
    let {
        page,
        paginate,
        searchKey
    } = req.query;

    if (!page) page = 1
    if (!paginate) paginate = 10
    const skip = (page - 1) * paginate

    if (!searchKey) searchKey = ''
    const filterObj = {
        "$or": [{
                "title": {
                    $regex: searchKey
                }
            },
            {
                "content": {
                    $regex: searchKey
                }
            },
            {
                "seoDescription": {
                    $regex: searchKey
                }
            },
        ],
    }
    const getAll = await Course.find(filterObj).skip(skip).limit(paginate).sort({ createdAt: -1 })
    if (!getAll) {
        throw new AppError("Blog  failed to fetch", 404)
    }
    const totalRecord = await Course.find({}).count()
    res.status(200).json({
        succeded: true,
        getAll,
        totalRecord
    })
})
//paramsdan gelen id ile istenilen blog detayı getiriliyor
const getDetail = tryCatch(async (req, res) => {
    const getAll = await Course.findById(req.params.id);
    res.status(200).json({
        succeded: true,
        getAll
    })
})
//Tüm verileri listeleme işlemi yapıyor
const getListAll = tryCatch(async (req, res) => {
    const getAll = await Course.find({isStatus: true});
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
    getDetail,
    getListAll
}