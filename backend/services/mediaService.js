import fs from "fs";
import path from "path";
import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";

/*
|--------------------------------------------------------------------------
| Upload Media
|--------------------------------------------------------------------------
*/

const uploadMedia = async (file, user) => {

    if (!file) {
        throw new ApiError(400, "Please select a file.");
    }

    const originalName = file.originalname;
    const fileName = file.filename;
    const filePath = file.path.replace(/\\/g, "/");
    const mimeType = file.mimetype;
    const fileSize = file.size;
    const extension = path.extname(file.originalname);

    const [result] = await pool.execute(

        `

        INSERT INTO media_library
        (

            original_name,
            file_name,
            file_path,
            mime_type,
            extension,
            file_size,
            uploaded_by

        )

        VALUES

        (?, ?, ?, ?, ?, ?, ?)

        `,

        [

            originalName,

            fileName,

            filePath,

            mimeType,

            extension,

            fileSize,

            user.id

        ]

    );

    const [rows] = await pool.execute(

        `

        SELECT *

        FROM media_library

        WHERE id = ?

        LIMIT 1

        `,

        [

            result.insertId

        ]

    );

    return rows[0];

};

/*
|--------------------------------------------------------------------------
| Get All Media
|--------------------------------------------------------------------------
*/

const getAllMedia = async () => {

    const [rows] = await pool.execute(

        `

        SELECT

            m.*,

            CONCAT(u.first_name,' ',u.last_name) AS uploaded_by_name

        FROM media_library m

        LEFT JOIN users u

            ON u.id = m.uploaded_by

        ORDER BY m.id DESC

        `

    );

    return rows;

};

/*
|--------------------------------------------------------------------------
| Get Media By ID
|--------------------------------------------------------------------------
*/

const getMediaById = async (id) => {

    const [rows] = await pool.execute(

        `

        SELECT *

        FROM media_library

        WHERE id = ?

        LIMIT 1

        `,

        [

            id

        ]

    );

    if (rows.length === 0) {

        throw new ApiError(
            404,
            "Media not found."
        );

    }

    return rows[0];

};

/*
|--------------------------------------------------------------------------
| Delete Media
|--------------------------------------------------------------------------
*/

const deleteMedia = async (id) => {

    const media = await getMediaById(id);

    if (fs.existsSync(media.file_path)) {

        fs.unlinkSync(media.file_path);

    }

    await pool.execute(

        `

        DELETE

        FROM media_library

        WHERE id = ?

        `,

        [

            id

        ]

    );

    return true;

};

export default {

    uploadMedia,

    getAllMedia,

    getMediaById,

    deleteMedia

};