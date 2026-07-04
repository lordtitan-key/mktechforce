import { v4 as uuid } from "uuid";

export const generateUniqueId = () => {
    return uuid();
};

export const slugify = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
};

export const currentDateTime = () => {
    return new Date();
};