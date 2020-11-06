const HttpException = require('../utils/HttpException.utils');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (...roles) => {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const bearer = 'Bearer ';

      // 如果没有提供授权凭证
      if (!authHeader || !authHeader.startsWith(bearer)) {
        throw new HttpException(401, 'Access denied. No credentials sent!');
      }

      const token = authHeader.replace(bearer, '');
      const secretKey = process.env.SECRET_JWT || '';

      const decoded = jwt.verify(token, secretKey);
      const user = await UserModel.findOne({ id: decoded.user_id });

      // 验证失败
      if (!user) {
        throw new HttpException(401, 'Authentication failed!');
      }

      // 验证提供当前凭证的人是否是他本人（可能冒用他人 Token）
      const ownerAuthorized = req.params.id === user.id;

      // 如果不是本人并且访问的 API 没有权限
      if (!ownerAuthorized && roles.length && !roles.includes(user.role)) {
        throw new HttpException(401, 'Unauthorized');
      }

      // 验证通过，放入请求上下文中，next 调用下一个中间件
      req.currentUser = user;
      next();

    } catch (error) {
      error.status = 401;
      next(error);
    }
  }
}

module.exports = auth;
