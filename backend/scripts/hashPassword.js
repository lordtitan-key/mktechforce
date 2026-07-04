import bcrypt from "bcrypt";

const password = "Admin@123";

const hashPassword = async () => {

    const hash = await bcrypt.hash(password, 10);

    console.log("--------------------------------");

    console.log("Password :", password);

    console.log("--------------------------------");

    console.log(hash);

    console.log("--------------------------------");

};

hashPassword();