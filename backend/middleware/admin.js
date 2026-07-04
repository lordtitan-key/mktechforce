import ApiError from "../utils/ApiError.js";

const admin = (req, res, next) => {
    if (!req.user) {
        return next(new ApiError(401, "Unauthorized"));
    }

    if (req.user.role !== "Super Admin") {
        return next(
            new ApiError(403, "Access Denied")
        );
    }

    next();
};

export default admin;