import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";

/*
|--------------------------------------------------------------------------
| Get Website Settings
|--------------------------------------------------------------------------
*/

const getWebsiteSettings = async () => {

    const [rows] = await pool.execute(`
        SELECT *
        FROM website_settings
        LIMIT 1
    `);

    if (rows.length === 0) {
        throw new ApiError(
            404,
            "Website settings not found."
        );
    }

    return rows[0];

};

/*
|--------------------------------------------------------------------------
| Update Website Settings
|--------------------------------------------------------------------------
*/

const updateWebsiteSettings = async (data) => {

    const {

        company_name,

        website_title,

        tagline,

        email,

        phone,

        alternate_phone,

        whatsapp,

        address,

        city,

        state,

        country,

        postal_code,

        google_map_iframe,

        business_hours,

        copyright,

        footer_description

    } = data;

    await pool.execute(

        `

        UPDATE website_settings

        SET

            company_name=?,

            website_title=?,

            tagline=?,

            email=?,

            phone=?,

            alternate_phone=?,

            whatsapp=?,

            address=?,

            city=?,

            state=?,

            country=?,

            postal_code=?,

            google_map_iframe=?,

            business_hours=?,

            copyright=?,

            footer_description=?

        WHERE id=1

        `,

        [

            company_name,

            website_title,

            tagline,

            email,

            phone,

            alternate_phone,

            whatsapp,

            address,

            city,

            state,

            country,

            postal_code,

            google_map_iframe,

            business_hours,

            copyright,

            footer_description

        ]

    );

    return await getWebsiteSettings();

};

export default {

    getWebsiteSettings,

    updateWebsiteSettings

};