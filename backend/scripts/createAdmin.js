import bcrypt from "bcrypt";
import pool from "../config/db.js";

const createAdmin = async () => {

    try {

        const password = await bcrypt.hash(
            "Admin@123",
            10
        );

        await pool.execute(

            `

            INSERT INTO users

            (

                role_id,

                first_name,

                last_name,

                email,

                phone,

                password,

                is_active

            )

            VALUES

            (

                ?,

                ?,

                ?,

                ?,

                ?,

                ?,

                ?

            )

            `,

            [

                1,

                "Super",

                "Admin",

                "admin@mktechforce.com",

                "9999999999",

                password,

                true

            ]

        );

        console.log("================================");

        console.log("Super Admin Created Successfully");

        console.log("================================");

    }

    catch(error){

        console.log(error.message);

    }

    process.exit();

};

createAdmin();