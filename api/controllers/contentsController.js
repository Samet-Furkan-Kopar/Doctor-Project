import tryCatch from "../utils/tryCatch.js"
import AppError from "../utils/appError.js"
import Content from "../models/contentModel.js"
import fs from "fs"
//Bodyden gelen verileri Veri tabanına kaydetme işlemlerini yapıyor

const create = tryCatch(async (req, res) => {
    const {
        seoTitle,
        seoDescription,
        page,
        type,
        content,
        images
    } = req.body;

    const contentEntries = JSON.parse(content);

    if (images && images.length > 0) {
        images.map(i => {
            if (i.filedname === "array") {
                if (!contentEntries.hasOwnProperty("array")) {
                    contentEntries["array"] = [];
                }
                contentEntries["array"].push(i.filename)
            }else{
            contentEntries[i.filedname] = i.filename
            }
        })
    }

    const data = await Content.findOne({
        page,
        type
    });

    if (!data) {
        const create = await Content.create({
            seoTitle,
            seoDescription,
            page,
            type,
            content: contentEntries
        })
        if (!create) {
            throw new AppError("Content could not be created", 422)
        }

        return res.status(200).json({
            success: true,
            message: "Successfully saved",
        });
    } else {
        const dataContentKeys = Object.keys(data.content);
        const missingKeys = dataContentKeys.filter(key => !contentEntries.hasOwnProperty(key));
        console.log("contentEntries nesnesinde olmayan anahtarlar:", missingKeys);
        await Promise.all(missingKeys.map(async i =>{
            contentEntries[i] = data.content[i]
        }))
        if (images && images.length > 0) {
           images.map( i => {
            if (contentEntries.hasOwnProperty(i.filedname)) {
                console.log(`'${contentEntries[i.filedname]}' nesnenin içinde bulunan bir anahtardır.`);
                fs.unlink(`public/${data.content[i.filedname]}`, async (err) => {
                if (err) {
                  console.error('Fotoğraf silinirken bir hata oluştu:', err);
                } else {
                  console.log('Fotoğraf başarıyla silindi.');
                }
                })
            }
        }) 
        }
        const update = await Content.findOneAndUpdate({
            page,
            type
        }, {
            seoTitle,
            seoDescription,
            page,
            type,
            content: contentEntries
        });

        if (!update) {
            throw new AppError("Content could not be created", 422)
        }

        return res.status(200).json({
            success: true,
            message: "Successfully saved",
        });
    }




})
//Paramsdan gelen id'yi Veri tabanından silme işlemini yapıyor

const remove = tryCatch(async (req, res) => {

    const remove = await Content.findOne({
        _id: req.params.id
    })
    if (!remove) {
        throw new AppError("Content  not deleted", 404)
    }
    fs.unlink(`public/${remove.content.image}`, async (err) => {
        if (err) {
          console.error('Fotoğraf silinirken bir hata oluştu:', err);
        } else {
          console.log('Fotoğraf başarıyla silindi.');
          const remove = await Content.findOneAndRemove({
            _id: req.params.id
        })
        }
    })
   
    res.status(200).json({
        succeded: true,
        remove
    })
})
//Paramsdan gelen id ile buldugu datayı, body gelen verilerle güncelleme işlemini yapıyor

const update = tryCatch(async (req, res) => {
    const id = req.params.id
    const {
        page,
        type,
        language,
        content,
        images
    } = req.body;
    const contentEntries = JSON.parse(content);
    if (images && images.length > 0) {
        images.map(i => {
            contentEntries[i.filedname] = i.filename
        })
    }
    const update = await Content.findByIdAndUpdate(id, {
        page,
        type,
        content: {
            locale: language,
            entries: contentEntries
        }
    })
    if (!update) {
        throw new AppError("Content  not update", 404)
    }
    res.status(200).json({
        succeded: true,
        update
    })
})
//Tüm verileri listeleme işlemi yapıyor

const getList = tryCatch(async (req, res) => {
    const {
        page
    } = req.query;
    let { pageN, paginate } = req.query;
    if (!pageN) pageN = 1
    if (!paginate) paginate = 10
    const skip = (pageN - 1) * paginate

    const data = await Content.findOne({
        page
    }).skip(skip).limit(paginate);
    if (!data) {
        throw new AppError("Content  failed to fetch", 404)
    }
    res.status(200)
        .json({
            success: true,
            data,
            message: "Content successfully listed",
        });
})

const getDetail = tryCatch(async (req, res) => {
    const page = req.params.page
    const type = req.params.type
    const getAll = await Content.findOne({
        page,
        type
    });
    if (!getAll) {
        throw new AppError("Content  failed to fetch", 422)
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
    getList,
    getDetail
}