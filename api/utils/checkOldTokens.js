import jwt from "jsonwebtoken"
import AppError from "../utils/appError.js";


const checkOldTokens = async (tokens) => {
    tokens.filter(t => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
        if(timeDiff < 86400){
            return t;
        }
    })
    return tokens;
}

export default checkOldTokens;