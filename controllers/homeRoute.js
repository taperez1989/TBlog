const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");
//localhost:3001
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          // attributes: ["title"],
        },
      ],
    });

    const Blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      Blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog/:id",  async (req, res) => {
  try {
    
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {

          model: Comment,
          include: [{ model: User }],
        },
      ],
    });
    const blog = blogData.get({ plain: true });

    res.render("blog", {
      blog,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {

  try {
    // Find the logged in user based on the session ID
    const profileData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });
    console.log('111111111111111111111111111111111');
    console.log(profileData);

    const profile = profileData.get({ plain: true });
    res.render("profile", {
      profile,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
