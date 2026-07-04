import express from "express";

import auth from "../middleware/auth.js";

import {
    getWebsiteSettings,
    updateWebsiteSettings
} from "../controllers/settingsController.js";

import {
    updateWebsiteSettingsValidation
} from "../validators/settingsValidator.js";

import validation from "../middleware/validation.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Website Settings
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    auth,
    getWebsiteSettings
);

router.put(
    "/",
    auth,
    updateWebsiteSettingsValidation,
    validation,
    updateWebsiteSettings
);

export default router;