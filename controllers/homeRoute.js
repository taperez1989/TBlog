const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['title']
                },
            ],
        });

        const Blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', {
            Blogs,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/Blog/:id', withAuth, async (req, res) => {
    try {
        const blogData = await blog.findbypk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: [
                        { model: User }
                    ]
                }
            ]
        });
        const blog = blogData.get({ plain: true });
        res.render('blog', {
            blog,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const profileData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const profile = profileData.get({ plain: true });

        res.render('profile', {
            profile,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;