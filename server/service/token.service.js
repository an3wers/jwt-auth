const jwt = require("jsonwebtoken");
require("dotenv").config();
const tokenModel = require("../models/token.model");

class TokenService {
  generateTokens(payload) {
    const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }
  async getTokens() {
    return await tokenModel.find({});
  }
  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }
  validateAccessToken(token) {
    try {
      const validateRes = jwt.verify(token, JWT_ACCESS_SECRET);
      return validateRes;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const validateRes = jwt.verify(token, JWT_REFRESH_SECRET);
      return validateRes;
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
