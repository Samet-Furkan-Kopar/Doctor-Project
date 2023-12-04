import fs from "fs"
import {
    mkdirp
} from 'mkdirp'
import multer from "multer";
import sharp from "sharp";
import tryCatch from "../utils/tryCatch.js";




const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {

    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})
const resizeImages = tryCatch(async (req, res, next) => {
    if (!fs.existsSync('public/contents/office')) {
        await mkdirp('public/contents/office');
    }
    if (!fs.existsSync('public/contents/user')) {
        await mkdirp('public/contents/user');
    }

    req.body.logo_url=""
    req.body.coverPhoto=""
    req.body.image_url = ""
    // Images
    await Promise.all(req.files.map(async (file, i) => {
        const result = file.fieldname.split("-")
        if (result[0] === "logo_url") {
            const random = await generateRandomString(6)
            const baseUrl = process.env.DOMAIN
            const file_name = `/contents/office/image-${Date.now()}-${random}.png`;
            req.body.logo_url = baseUrl + file_name
            await sharp(file.buffer).toFile(`public${file_name}`)
        }
        if (result[0] === "coverPhoto") {
            const random = await generateRandomString(6)
            const baseUrl = process.env.DOMAIN
            const file_name = `/contents/office/image-${Date.now()}-${random}.png`;
            req.body.coverPhoto = baseUrl + file_name
            await sharp(file.buffer).toFile(`public${file_name}`)
        }
        if (result[0] === "image_url") {
            const random = await generateRandomString(6)
            const baseUrl = process.env.DOMAIN
            const file_name = `/contents/user/image-${Date.now()}-${random}.png`;
            req.body.image_url = baseUrl + file_name
            await sharp(file.buffer).toFile(`public${file_name}`)
        }

    }));
    next()

})
async function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomChar = characters.charAt(randomIndex);
        result += randomChar;
    }

    return result;
}
const uploadSettingImages = upload.any()








const photoMiddleware = {
    uploadSettingImages,
    resizeImages,
};

export default photoMiddleware;