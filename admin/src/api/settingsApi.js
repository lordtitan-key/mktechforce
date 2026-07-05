import axios from "./axios";

const BASE_URL = "/settings";

/*
|--------------------------------------------------------------------------
| Get Website Settings
|--------------------------------------------------------------------------
*/

export const getWebsiteSettings = async () => {

    const response = await axios.get(BASE_URL);

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Update Website Settings
|--------------------------------------------------------------------------
*/

export const updateWebsiteSettings = async (data) => {

    const response = await axios.put(
        BASE_URL,
        data
    );

    return response.data;

};