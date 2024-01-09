const userService = require("../service/user.service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api.error");

class UserController {
  async registartion(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = ApiError.BadRequest(
          "Ошибка про валидации полей",
          errors.array()
        );
        return next(err);
      }
      const { email, password } = req.body;
      const userData = await userService.registartion(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error)
    }
  }

  async activate(req, res, next) {
    try {
    } catch (error) {}
  }

  async getUsers(req, res, next) {
    try {
      const data = await userService.getUsers();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
