const express = require("express");
const User = require("../model/User");
const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/users/:authid", async (req, res) => {
  try {
    const user = await User.findOne({ authUserID: req.params.authid });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

//post new user when he sign uo for the first time
router.post("/adduser", async (req, res) => {
  const user = await User.create({
    authUserID: req.body.authUserID,
  });
  res.send(user);
});

//update user info when he submits the form
router.patch("/user/:authid", async (req, res) => {
  try {
    const user = await User.findOne({ authUserID: req.params.authid });

    if (req.body.age) {
      user.age = req.body.age;
    }

    if (req.body.temperarture) {
      user.temperarture = req.body.temperarture;
    }

    if (req.body.location) {
      const loc = {
        type: "Point",
        coordinates: [req.body.location.lat, req.body.location.lng],
      };
      user.location = loc;
    }
    await user.save();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "Some Error happened log out and sign in again!" });
  }
});

module.exports = router;
