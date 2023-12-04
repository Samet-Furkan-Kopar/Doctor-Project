import Office from "../models/officeModel.js";
import tryCatch from "../utils/tryCatch.js"
import AppError from "../utils/appError.js"
import User from "../models/user/userModel.js";
import fs from 'fs'
const officeDetail = tryCatch (async (req,res)=>{
    const id = req.params.id
    const data = await Office.findOne({_id:id})
    .populate({ path: 'countryId', select: 'name' })
    .populate({ path: 'cityId', select: 'name' })
    .populate({ path: 'districtId', select: 'name' })
    .populate({ path: 'neighbourhoodId', select: 'name' })
    const user = await User.findOne({_id:data?.ownerId})
    let detail = {}
    detail.firstName = user?.firstName || ""
    detail.lastName = user?.lastName || ""
    detail.email = user?.email || ""
   // detail.password = user?.password || ""
    detail.phoneNumber = user?.phoneNumber || ""
    detail.address = user?.address || ""
    detail.image_url = user?.image_url || ""
    detail.phoneNumber = user?.phoneNumber || ""

    detail.companyName = data?.companyName || ""
    detail.companyTitle = data?.companyTitle || ""
    detail.taxNo = data?.taxNo || ""
    detail.taxOffice = data?.taxOffice || ""
    detail.logo_url = data?.logo_url || ""
    detail.coverPhoto = data?.coverPhoto || ""
    detail.description = data?.description || ""
    detail.aboutUs = data?.aboutUs || ""
    detail.address = data?.address || ""
    detail.longitude = data?.longitude || ""
    detail.latitude = data?.latitude || ""
    detail.country = data?.countryId.name || ""
    detail.city = data?.cityId.name || ""
    detail.district = data?.districtId.name || ""
    detail.neighbourhood = data?.neighbourhoodId.name || ""

    res.status(200).json({
        succeded:true,
        data:detail
    })
})
const officeUpdate = tryCatch (async(req,res)=>{
    const id = req.params.id
    const result = await Office.findOne({_id:id})
    if (req.body?.logo_url && result.logo_url) {
        photoDelete(result.logo_url)
    }
    if (req.body?.coverPhoto && result.coverPhoto) {
        photoDelete(result.coverPhoto)
    }
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

    const updateData = await Office.findByIdAndUpdate(id,req.body,{new:true})
    if (!updateData) {
        throw new AppError("Güncellemede Hata Oluştu",404)
    }
    res.status(200).json({
        succeded:true,
        message:"Ofis Güncelleme Başarılı Şekilde Oldu"
    })
})

const office ={
    officeDetail,
    officeUpdate
}
export default office