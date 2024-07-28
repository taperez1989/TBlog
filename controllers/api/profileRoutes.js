const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require('../../utils/auth')

console.log('=========API Route hits=========');
router.post("/", withAuth, async (req, res) => {
  // console.log('User ID from session:', req.session.userId);
  // console.log(req.body);
  
  try {
    // Check if the user is authenticated
    if (!req.session.userId) {
      throw new Error("User not authenticated");
    }
    
    // Extract required fields from request body
    const { title, content } = req.body;
    
    if (!title || !content) {
      throw new Error("Missing required fields");
    }
    
    // Create a new comment, setting the userId from the session
    const newComment = await Comment.create({
      title,
      content,
      userId: req.session.userId // Ensure this field matches your model
    });
    console.log('===============================================1234');
    console.log(newComment);
    res.status(200).json(newComment);
  } catch (err) {
    console.error('Error creating comment:', err.message);
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id",  async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "no comment found" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
