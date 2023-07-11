const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const schemaValidator = require('../validations/schema.validator');
router.post("/login", authController.login)
router.get("/login", authController.getLogin)
router.post(
  "/register",
//   [
//     body("username")
//       .isString()
//       .withMessage("Please enter a valid email.")
//       .custom((value, { req }) => {
//         return User.findOne({ username: value }).then((userDoc) => {
//           if (userDoc) {
//             return Promise.reject("E-Mail address or username already exists!");
//           }
//         });
//       }),
//     body("password").trim().isLength({ min: 5 }),
//     body("roles").trim().not().isEmpty(),
//   ],
  schemaValidator.signup,
  authController.register
);
router.route("/refresh").get(authController.refresh);
router.route("/logout").post(authController.logout);
module.exports = router;