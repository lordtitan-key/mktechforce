import bcrypt from "bcrypt";
import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import { generateToken } from "../config/jwt.js";

const login = async (email, password) => {

    const [rows] = await pool.execute(
        `
        SELECT
            users.*,
            roles.name AS role_name
        FROM users
        INNER JOIN roles
            ON users.role_id = roles.id
        WHERE users.email = ?
        LIMIT 1
        `,
        [email]
    );

    if (rows.length === 0) {
        throw new ApiError(401, "Invalid email or password.");
    }

    const user = rows[0];

    const passwordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatched) {
        throw new ApiError(401, "Invalid email or password.");
    }

    if (!user.is_active) {
        throw new ApiError(403, "Your account has been disabled.");
    }

    const token = generateToken({
        id: user.id,
        role: user.role_name,
        email: user.email
    });

    delete user.password;

    return {
        token,
        user
    };
};

export default {
    login
};