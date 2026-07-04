import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import authService from "../services/authService.js";

export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const result = await authService.login(
        email,
        password
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Login successful.",
            result
        )
    );

});