const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  const token = ctx.get('authorization') || ctx.query.authorization;
  try {
    const user = jwt.verify(token || '', ctx.config.USER_TOKEN_SECRET)
    ctx.state.user = user;
    await next();
  } catch (e) {
    ctx.response.throwBiz('AUTH.tokenFail')
  }
}