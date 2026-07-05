import express from "express";

import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

import {
    uploadMedia,
    getAllMedia,
    deleteMedia
} from "../controllers/mediaController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Upload Media
|--------------------------------------------------------------------------
*/

router.post(
    "/upload",
    auth,
    upload.single("file"),
    uploadMedia
);

/*
|--------------------------------------------------------------------------
| Get All Media
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    auth,
    getAllMedia
);

/*
|--------------------------------------------------------------------------
| Delete Media
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    auth,
    deleteMedia
);

export default router;