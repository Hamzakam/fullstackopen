const _ = require("lodash");
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

//most blogs without lodash
// const mostBlogs = (blogs) => {
//     let max = {};
//     blogs.reduce((hashObject, blog) => {
//         hashObject[blog.author] =
//             hashObject[blog.author] === undefined
//                 ? 1
//                 : hashObject[blog.author] + 1;
//         if (max.author === undefined || hashObject[blog.author] > max.blogs) {
//             max = { author: blog.author, blogs: hashObject[blog.author] };
//         }
//         return hashObject;
//     }, {});
//     return max;
// };

//most blogs with lodash
const mostBlogs = (blogs) => {
    if (blogs.length > 0) {
        const maxAuthorObj = _.maxBy(
            Object.entries(_.groupBy(blogs, (blog) => blog.author)),
            (ele) => ele[1].length
        );
        return { author: maxAuthorObj[0], blogs: maxAuthorObj[1].length };
    }
    return {};
};
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
