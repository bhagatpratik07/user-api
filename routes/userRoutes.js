const express = require("express");
const { deleteOne } = require("../models/user");
const router = express.Router();
const User = require("../models/user");

// getting all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// getting one user
router.get("/:id", getUser, (req, res) => {
  res.send(res.user);
});

// creating a user
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });
  try {
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// update a user
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name == req.body.name;
  }
  if (req.body.email != null) {
    res.user.email == req.body.email;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// deleting a user
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "user removed" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (err) {
    return res.json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
