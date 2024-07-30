const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    console.log('+--------------------- api/users/ hit! --------------------');
    
    
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    console.log(userData);
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .staus(400)
        .json({ message: "Incorrect email or password, please try again" });
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      res.json({ User: userData, message: "you are now logged in" });
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
