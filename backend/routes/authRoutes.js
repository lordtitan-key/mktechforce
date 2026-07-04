import { Router } from "express";

import { login } from "../controllers/authController.js";

import validation from "../middleware/validation.js";

import {
    loginValidation
} from "../validators/authValidator.js";

const router = Router();

router.post(
    "/login",
    loginValidation,
    validation,
    login
);

export default router;