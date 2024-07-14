const router = require('express').Router
const userRoutes = require('./userRoutes');
const blogsRoute = require('./blogsRoute');
const commentsRoute = require('./commentsRoute');

router.use('./users', userRoutes);
router.use('./blogs', blogsRoute);
router.use('./comments', commentsRoute);

module.exports = router;