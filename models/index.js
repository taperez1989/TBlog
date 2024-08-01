const Blog = require("./Blog.js");
const User = require("./User.js");
const Comment = require("./Comment.js");

User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: "CASCADE",
});

Blog.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: "CASCADE",
});

module.exports = { Blog, Comment, User };
