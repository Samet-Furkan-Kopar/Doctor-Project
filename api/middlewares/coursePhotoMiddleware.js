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
    if (!fs.existsSync('public/contents/course')) {
        await mkdirp('public/contents/course');
    }

    // Images
    await Promise.all(req.files.map(async (file, i) => {
        const result = file.fieldname.split("-")
        console.log(result);

        if (result[0] === "promotionalImage") {
            const random = await generateRandomString(6)
            const file_name = `/contents/course/image-${Date.now()}-${random}.png`;
            req.body.promotionalImage = file_name
            console.log(req.body.promotionalImage);
            await sharp(file.buffer).toFile(`public${file_name}`)
        }
        if (result[0] === "image") {
            const random = await generateRandomString(6)
            const file_name = `/contents/course/image-${Date.now()}-${random}.png`;
            req.body.image = file_name
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