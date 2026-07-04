import { body } from "express-validator";

export const updateWebsiteSettingsValidation = [

    body("company_name")
        .trim()
        .notEmpty()
        .withMessage("Company name is required.")
        .isLength({ max: 255 })
        .withMessage("Company name cannot exceed 255 characters."),

    body("website_title")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("Website title cannot exceed 255 characters."),

    body("tagline")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("Tagline cannot exceed 255 characters."),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email address."),

    body("phone")
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage("Phone number cannot exceed 20 characters."),

    body("alternate_phone")
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage("Alternate phone number cannot exceed 20 characters."),

    body("whatsapp")
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage("WhatsApp number cannot exceed 20 characters."),

    body("city")
        .optional()
        .trim()
        .isLength({ max: 100 }),

    body("state")
        .optional()
        .trim()
        .isLength({ max: 100 }),

    body("country")
        .optional()
        .trim()
        .isLength({ max: 100 }),

    body("postal_code")
        .optional()
        .trim()
        .isLength({ max: 20 })

];