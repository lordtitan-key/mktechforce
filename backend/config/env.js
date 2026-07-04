import dotenv from "dotenv";

dotenv.config();

const env = {
    NODE_ENV: process.env.NODE_ENV || "development",

    PORT: process.env.PORT || 5000,

    APP_NAME: process.env.APP_NAME || "MKTechForce CMS",

    FRONTEND_URL:
        process.env.FRONTEND_URL || "http://localhost:5173",

    ADMIN_URL:
        process.env.ADMIN_URL || "http://localhost:5174",

    DB_HOST: process.env.DB_HOST,

    DB_PORT: process.env.DB_PORT,

    DB_NAME: process.env.DB_NAME,

    DB_USER: process.env.DB_USER,

    DB_PASSWORD: process.env.DB_PASSWORD,

    JWT_SECRET: process.env.JWT_SECRET,

    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

    EMAIL_HOST: process.env.EMAIL_HOST,

    EMAIL_PORT: process.env.EMAIL_PORT,

    EMAIL_USER: process.env.EMAIL_USER,

    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
};

export default env;