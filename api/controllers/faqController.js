
import FAQ from "../models/faqModel.js";
import tryCatch from "../utils/tryCatch.js"
import AppError from "../utils/appError.js"
//Bodyden gelen verileri Veri tabanına kaydetme işlemlerini yapıyor

const create = tryCatch(async (req, res) => {

    const { title, content, isStatus } = req.body

    const create = await FAQ.create(req.body)
    if (!create) {
        throw new AppError("FAQ could not be created", 404)
    }
    res.status(200).json({
        succeded: true,
        create
    })
})
//Paramsdan gelen id'yi Veri tabanından silme işlemini yapıyor

const remove = tryCatch(async (req, res) => {
    const remove = await FAQ.findOneAndRemove({
        _id: req.params.id
    })
    if (!remove) {
        throw new AppError("FAQ  not deleted", 404)
    }
    res.status(200).json({
        succeded: true,
        remove
    })
})
//Paramsdan gelen id ile buldugu datayı, body gelen verilerle güncelleme işlemini yapıyor

const update = tryCatch(async (req, res) => {
    const id = req.params.id
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers["authorization"].split(" ")[1]
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const { title, content, isStatus } = req.body
    req.body.userId = decoded.id;

    const update = await FAQ.findByIdAndUpdate(id, req.body)
    if (!update) {
        throw new AppError("FAQ  not update", 404)
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
            }
        ],
    }
    const getAll = await FAQ.find(filterObj).skip(skip).limit(paginate)
    if (!getAll) {
        throw new AppError("FAQ  failed to fetch", 404)
    }
    res.status(200).json({
        succeded: true,
        getAll
    })
})
//paramsadan gelen id ile istenen verinin detayları getirilir
const getDetail = tryCatch(async (req, res) => {
    const getAll = await FAQ.findById(req.params.id);
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
    getDetail
}