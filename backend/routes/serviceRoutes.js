import express from "express";

import auth from "../middleware/auth.js";

import validation from "../middleware/validation.js";

import {
    createServiceValidation,
    updateServiceValidation
} from "../validators/serviceValidator.js";

import {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from "../controllers/serviceController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Get All Services
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    auth,
    getAllServices
);

/*
|--------------------------------------------------------------------------
| Get Service By ID
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    auth,
    getServiceById
);

/*
|--------------------------------------------------------------------------
| Create Service
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    auth,
    createServiceValidation,
    validation,
    createService
);

/*
|--------------------------------------------------------------------------
| Update Service
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    auth,
    updateServiceValidation,
    validation,
    updateService
);

/*
|--------------------------------------------------------------------------
| Delete Service
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    auth,
    deleteService
);

export default router;