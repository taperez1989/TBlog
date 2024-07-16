const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogsRoute = require('./blogsRoute');
const commentsRoute = require('./commentsRoute');


router.use('./User', userRoutes);
router.use('./Blog', blogsRoute);
router.use('./Comment', commentsRoute);

module.exports = router;