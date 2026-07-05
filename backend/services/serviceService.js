import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import { slugify } from "../utils/helpers.js";

/*
|--------------------------------------------------------------------------
| Get All Services
|--------------------------------------------------------------------------
*/

const getAllServices = async () => {

    const [rows] = await pool.execute(`

        SELECT

            s.*,

            CONCAT(u.first_name,' ',u.last_name) AS created_by_name

        FROM services s

        LEFT JOIN users u

            ON u.id = s.created_by

        ORDER BY s.display_order ASC,
                 s.id DESC

    `);

    return rows;

};

/*
|--------------------------------------------------------------------------
| Get Service By ID
|--------------------------------------------------------------------------
*/

const getServiceById = async (id) => {

    const [rows] = await pool.execute(

        `

        SELECT *

        FROM services

        WHERE id = ?

        LIMIT 1

        `,

        [id]

    );

    if (rows.length === 0) {

        throw new ApiError(
            404,
            "Service not found."
        );

    }

    return rows[0];

};

/*
|--------------------------------------------------------------------------
| Create Service
|--------------------------------------------------------------------------
*/

const createService = async (data, user) => {

    const slug = slugify(data.title);

    const [exists] = await pool.execute(

        `

        SELECT id

        FROM services

        WHERE slug = ?

        LIMIT 1

        `,

        [slug]

    );

    if (exists.length > 0) {

        throw new ApiError(
            400,
            "Service already exists."
        );

    }

    const [result] = await pool.execute(

        `

        INSERT INTO services

        (

            title,

            slug,

            short_description,

            description,

            icon,

            featured_image,

            banner_image,

            meta_title,

            meta_description,

            meta_keywords,

            display_order,

            is_featured,

            is_active,

            created_by

        )

        VALUES

        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

        `,

        [

            data.title,

            slug,

            data.short_description,

            data.description,

            data.icon,

            data.featured_image,

            data.banner_image,

            data.meta_title,

            data.meta_description,

            data.meta_keywords,

            data.display_order || 0,

            data.is_featured || false,

            data.is_active ?? true,

            user.id

        ]

    );

    return await getServiceById(result.insertId);

};

/*
|--------------------------------------------------------------------------
| Update Service
|--------------------------------------------------------------------------
*/

const updateService = async (id, data, user) => {

    await getServiceById(id);

    const slug = slugify(data.title);

    const [exists] = await pool.execute(

        `

        SELECT id

        FROM services

        WHERE slug = ?

        AND id <> ?

        LIMIT 1

        `,

        [slug, id]

    );

    if (exists.length > 0) {

        throw new ApiError(
            400,
            "Another service already uses this title."
        );

    }

    await pool.execute(

        `

        UPDATE services

        SET

            title=?,

            slug=?,

            short_description=?,

            description=?,

            icon=?,

            featured_image=?,

            banner_image=?,

            meta_title=?,

            meta_description=?,

            meta_keywords=?,

            display_order=?,

            is_featured=?,

            is_active=?,

            updated_by=?

        WHERE id=?

        `,

        [

            data.title,

            slug,

            data.short_description,

            data.description,

            data.icon,

            data.featured_image,

            data.banner_image,

            data.meta_title,

            data.meta_description,

            data.meta_keywords,

            data.display_order,

            data.is_featured,

            data.is_active,

            user.id,

            id

        ]

    );

    return await getServiceById(id);

};

/*
|--------------------------------------------------------------------------
| Delete Service
|--------------------------------------------------------------------------
*/

const deleteService = async (id) => {

    await getServiceById(id);

    await pool.execute(

        `

        DELETE FROM services

        WHERE id=?

        `,

        [id]

    );

    return true;

};

export default {

    getAllServices,

    getServiceById,

    createService,

    updateService,

    deleteService

};