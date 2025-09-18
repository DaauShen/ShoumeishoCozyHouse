import { defineType } from "sanity";

export default defineType({
    name: "galleryImage",
    title: "Gallery Image",
    type: "object",
    fields: [
        {
            name: "image",
            title: "Ảnh",
            type: "cloudinary.asset",
        },
        {
            name: "caption",
            title: "Caption",
            type: "string",
        },
    ],
})