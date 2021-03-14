const dummy = (blogs) => {
    // console.log(blogs);
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    return blogs.length !== 0
        ? blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog))
        : {};
};

const mostBlogs = (blogs) => {
    let max = {};
    blogs.reduce((hashObject, blog) => {
        hashObject[blog.author] =
            hashObject[blog.author] === undefined
                ? 1
                : hashObject[blog.author] + 1;
        if (max.author === undefined || hashObject[blog.author] > max.blogs) {
            max = { author: blog.author, blogs: hashObject[blog.author] };
        }
        return hashObject;
    }, {});
    return max;
};
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
