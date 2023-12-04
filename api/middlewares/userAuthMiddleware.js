import User from "../models/user/userModel.js";
import Admin from "../models/user/adminModel.js";
import { promisify } from "util";
// import UserRole from "../models/userRoleModel.js";
import jwt from "jsonwebtoken";
import checkOldTokens from "../utils/checkOldTokens.js";

const authenticateUserAPIToken = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers["authorization"].split(" ")[1];
        }
        console.log(token);
        if (!token) {
            return res.status(401).json({
                succeded: false,
                error: "User not authenticated",
            });
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        console.log(decoded);
        const currentUser = await User.findById(decoded.id);
        console.log(currentUser);
        if (!currentUser) {
            const currentAdmin = await Admin.findById(decoded.id);
            if (currentAdmin) {
                req.user = currentAdmin;
                next();
            } else {
                return res.status(401).json({
                    succeded: false,
                    error: "User no longer exist",
                });
            }
        } else {
            let oldTokens = currentUser.tokens || [];
            if (oldTokens.length) {
                const tokenList = await checkOldTokens(oldTokens);
                if (!tokenList.length) {
                    return res.status(401).json({
                        succeded: false,
                        error: "User not authenticated",
                    });
                }

                const checkTokenExist = tokenList.find((t) => t.token === token);
                if (!checkTokenExist) {
                    return res.status(401).json({
                        succeded: false,
                        error: "User not authenticated",
                    });
                }
            } else {
                return res.status(401).json({
                    succeded: false,
                    error: "User not authenticated",
                });
            }

            req.user = currentUser;
            next();
        }
    } catch (err) {
        return res.status(401).json({
            succeded: false,
            error: err,
        });
    }
};
const authenticateUserManageAPIToken = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers["authorization"].split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({
                succeded: false,
                error: "User not authenticated",
            });
        }
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            const currentAdmin = await Admin.findById(decoded.id);
            if (currentAdmin) {
                req.user = currentAdmin;
                next();
            } else {
                return res.status(401).json({
                    succeded: false,
                    error: "User no longer exist",
                });
            }
        } else {
            let oldTokens = currentUser.tokens || [];
            if (oldTokens.length) {
                const tokenList = await checkOldTokens(oldTokens);
                if (!tokenList.length) {
                    return res.status(401).json({
                        succeded: false,
                        error: "User not authenticated",
                    });
                }

                const checkTokenExist = tokenList.find((t) => t.token === token);
                if (!checkTokenExist) {
                    return res.status(401).json({
                        succeded: false,
                        error: "User not authenticated",
                    });
                }
            } else {
                return res.status(401).json({
                    succeded: false,
                    error: "User not authenticated",
                });
            }
            const type = currentUser.type;
            if (type === "manager") {
                req.user = currentUser;
                next();
            } else {
                return res.status(401).json({
                    succeded: false,
                    error: "You are not authorized",
                });
            }
        }
    } catch (err) {
        return res.status(401).json({
            succeded: false,
            error: err,
        });
    }
};
const authMiddleware = {
    authenticateUserAPIToken,
    authenticateUserManageAPIToken,
}
export default authMiddleware
