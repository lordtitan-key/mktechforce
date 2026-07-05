import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Service Validation
|--------------------------------------------------------------------------
*/

export const createServiceValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Service title is required.")
        .isLength({ max: 255 })
        .withMessage("Service title must not exceed 255 characters."),

    body("short_description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Short description must not exceed 500 characters."),

    body("description")
        .optional()
        .trim(),

    body("icon")
        .optional()
        .trim(),

    body("featured_image")
        .optional()
        .trim(),

    body("banner_image")
        .optional()
        .trim(),

    body("meta_title")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("Meta title must not exceed 255 characters."),

    body("meta_description")
        .optional()
        .trim(),

    body("meta_keywords")
        .optional()
        .trim(),

    body("display_order")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Display order must be a positive number."),

    body("is_featured")
        .optional()
        .isBoolean()
        .withMessage("Featured must be true or false."),

    body("is_active")
        .optional()
        .isBoolean()
        .withMessage("Active must be true or false.")

];

/*
|--------------------------------------------------------------------------
| Update Service Validation
|--------------------------------------------------------------------------
*/

export const updateServiceValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Service title is required.")
        .isLength({ max: 255 })
        .withMessage("Service title must not exceed 255 characters."),

    body("short_description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Short description must not exceed 500 characters."),

    body("description")
        .optional()
        .trim(),

    body("icon")
        .optional()
        .trim(),

    body("featured_image")
        .optional()
        .trim(),

    body("banner_image")
        .optional()
        .trim(),

    body("meta_title")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("Meta title must not exceed 255 characters."),

    body("meta_description")
        .optional()
        .trim(),

    body("meta_keywords")
        .optional()
        .trim(),

    body("display_order")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Display order must be a positive number."),

    body("is_featured")
        .optional()
        .isBoolean()
        .withMessage("Featured must be true or false."),

    body("is_active")
        .optional()
        .isBoolean()
        .withMessage("Active must be true or false.")

];