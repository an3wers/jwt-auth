const Router = require("express").Router;
const userController = require("../controllers/user.controller");
const tokenController = require("../controllers/token.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");

const router = new Router();

router.post(
  "/registartion",
  body("email").isEmail(),
  body("password").isLength({ min: 5, max: 32 }),
  userController.registartion
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
// не работает authMiddleware
router.get("/users", authMiddleware, userController.getUsers);
// for dev
router.get("/tokens", authMiddleware, tokenController.getTokens);

module.exports = router;
