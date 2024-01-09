const tokenService = require("../service/token.service");

class TokenController {
  async getTokens(req, res, next) {
    try {
      const data = await tokenService.getTokens();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TokenController();
