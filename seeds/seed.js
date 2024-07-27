const sequelize = require("../config/connection");
const { User, Blog } = require("../models");

const userData = require("./userData.json");
const blogData = require("./blogData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    // returning: true,
  });
  console.log(users[Math.floor(Math.random() * users.length)].id);
  for (const blog of blogData) {
    console.log(blog);
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
