const ApiError = require("../exceptions/api.error");
const tokenService = require("../service/token.service");

module.exports = function (err, req, res, next) {
  try {
    const authHeader = req.header.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const tokenData = tokenService.validateAccessToken(accessToken);
    if (!tokenData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = tokenData;
    return next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};
