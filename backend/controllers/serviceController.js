import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import serviceService from "../services/serviceService.js";

/*
|--------------------------------------------------------------------------
| Get All Services
|--------------------------------------------------------------------------
*/

export const getAllServices = asyncHandler(async (req, res) => {

    const services = await serviceService.getAllServices();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Services fetched successfully.",
            services
        )
    );

});

/*
|--------------------------------------------------------------------------
| Get Service By ID
|--------------------------------------------------------------------------
*/

export const getServiceById = asyncHandler(async (req, res) => {

    const service = await serviceService.getServiceById(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Service fetched successfully.",
            service
        )
    );

});

/*
|--------------------------------------------------------------------------
| Create Service
|--------------------------------------------------------------------------
*/

export const createService = asyncHandler(async (req, res) => {

    const service = await serviceService.createService(
        req.body,
        req.user
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            "Service created successfully.",
            service
        )
    );

});

/*
|--------------------------------------------------------------------------
| Update Service
|--------------------------------------------------------------------------
*/

export const updateService = asyncHandler(async (req, res) => {

    const service = await serviceService.updateService(
        req.params.id,
        req.body,
        req.user
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Service updated successfully.",
            service
        )
    );

});

/*
|--------------------------------------------------------------------------
| Delete Service
|--------------------------------------------------------------------------
*/

export const deleteService = asyncHandler(async (req, res) => {

    await serviceService.deleteService(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Service deleted successfully."
        )
    );

});