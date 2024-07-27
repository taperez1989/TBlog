const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogsRoute = require("./blogsRoute");
const profileRoute = require("./profileRoutes");

router.use("/user", userRoutes);
router.use("/blogs", blogsRoute);
router.use("/profile", profileRoute);

module.exports = router;


