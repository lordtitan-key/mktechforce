import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            throw new ApiError(401, "Unauthorized Access");
        }

        const decoded = jwt.verify(token, env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        next(new ApiError(401, "Invalid or Expired Token"));
    }
};

export default auth;