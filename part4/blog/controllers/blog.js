const blogRouter = require("express").Router();
const Blog = require("../models/blog");

//Responds with all blogs
blogRouter.get("/", (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs);
    });
});

//Responds with blog by finding it by id.
blogRouter.get("/:id", (request, response, next) => {
    Blog.findById(request.params.id)
        .then((blog) => {
            if (blog) {
                response.json(blog);
            } else {
                response.status("404").json({ error: "Not Found" });
            }
        })
        .catch((error) => next(error));
});

//Request data to store in db
blogRouter.post("/", (request, response, next) => {
    const blog = new Blog(request.body);
    blog.save()
        .then((result) => {
            response.status(201).json(result);
        })
        .catch((error) => next(error));
});

module.exports = blogRouter;
