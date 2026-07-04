import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import settingsService from "../services/settingsService.js";

/*
|--------------------------------------------------------------------------
| Get Website Settings
|--------------------------------------------------------------------------
*/

export const getWebsiteSettings = asyncHandler(async (req, res) => {

    const settings = await settingsService.getWebsiteSettings();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Website settings fetched successfully.",
            settings
        )
    );

});

/*
|--------------------------------------------------------------------------
| Update Website Settings
|--------------------------------------------------------------------------
*/

export const updateWebsiteSettings = asyncHandler(async (req, res) => {

    const settings = await settingsService.updateWebsiteSettings(
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Website settings updated successfully.",
            settings
        )
    );

});