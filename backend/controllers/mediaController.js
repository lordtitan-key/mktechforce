import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import mediaService from "../services/mediaService.js";

/*
|--------------------------------------------------------------------------
| Upload Media
|--------------------------------------------------------------------------
*/

export const uploadMedia = asyncHandler(async (req, res) => {

    const media = await mediaService.uploadMedia(req.file, req.user);

    return res.status(201).json(
        new ApiResponse(
            201,
            "File uploaded successfully.",
            media
        )
    );

});

/*
|--------------------------------------------------------------------------
| Get All Media
|--------------------------------------------------------------------------
*/

export const getAllMedia = asyncHandler(async (req, res) => {

    const media = await mediaService.getAllMedia();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Media fetched successfully.",
            media
        )
    );

});

/*
|--------------------------------------------------------------------------
| Delete Media
|--------------------------------------------------------------------------
*/

export const deleteMedia = asyncHandler(async (req, res) => {

    await mediaService.deleteMedia(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Media deleted successfully."
        )
    );

});