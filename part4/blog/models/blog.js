const mongoose = require("mongoose");

//schema for blog.
//title is required,atleast 3 letters and is of type string
//author is required,atleast 3 letters and is of type string
//url is not required and is of type string
//likes is required and is of type number
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, minLength: 3 },
    author: { type: String, required: true, minLength: 3 },
    url: String,
    likes: { type: Number, required: true, default: 0 },
});

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Blog", blogSchema);
