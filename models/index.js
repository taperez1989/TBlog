const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Blog, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Blog.hasMany(Comment, {
    foreignKey: 'blogId',
})



module.exports = { Blog, Comment, User };