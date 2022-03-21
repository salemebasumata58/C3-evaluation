const express = require("express");

const User = require("../models/user.models");
const Comment = require("../models/comment.model");
const Book = require("../models/book.models");
const Publication  = require("../models/publication.model");
const extra  = require("../models/extra.models");

// const { uploadFiles } = require("../middlewares/uploads");
const upload = require("../middlewares/uploads")

const router = express.Router();

router.post(
  "/",
  // body('username').isEmail(),
  body("first_name")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("First Name cannot be empty")
    .isLength({ min: 3 },{max:30})
    .withMessage("First Name must be at least 4 characters"),

  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  body("age")
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number between 1 and 100")
    .custom((val) => {
      if (val < 1 || val > 150) {
        throw new Error("Incorrect age provided");
      }
      return true;
    }),
 
  body("last_name")
  .custom((value) => {
    if (value && value.length < 4 && value.length>30) {
      throw new Error("Last Name if provided must be at least 4 characters");
    }
    return true;
  }),

 
  async (req, res) => {
    try {
     // console.log(body("first_name"));
      const errors = validationResult(req);
      console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);


router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", upload.single("profilePic"), async (req, res) => {
  try {
    //   const user = await User.create(req.body)
    const user = await User.create({
      firstName: req.body.firstName,
      profilePic: req.file.path,
    });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


module.exports = router;
