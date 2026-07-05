import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import env from "./config/env.js";

import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

const app = express();

app.use(helmet());

app.use(compression());

app.use(
    cors({
        origin: [
            env.FRONTEND_URL,
            env.ADMIN_URL,
        ],
        credentials: true,
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "MKTechForce CMS Backend Running 🚀",
    });
});

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);

app.use("/api/settings", settingsRoutes);

app.use("/api/media", mediaRoutes);

app.use("/api/services", serviceRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;