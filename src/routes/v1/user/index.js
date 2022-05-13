const Router = require('koa-router')
const _ = require('lodash');
const uuid = require('uuid');
const jwt = require('jsonwebtoken')
const randomstring = require('randomstring')
const userVerify = require('../../../middleware/user_verify')

const project = new Router();

project.post('/sign-in', async ({ BLL, response, request, config }, next) => {
  const where = { account: request.body.account };
  const doc = await BLL.userBLL.getInfo({ where });
  if (doc) {
    try {
      const token = jwt.sign(_.pick(doc, ['_id', 'nickname']), config.USER_TOKEN_SECRET, { expiresIn: '2h', issuer: 'cms-manage' });
      response.success({ token });
    } catch (e) {
      // TokenExpiredError,JsonWebTokenError
      response.throwBiz('AUTH.VERIFY_FAIL');
    }
  } else {
    response.throwBiz('AUTH.USER_NOTFOUND');
  }
})

project.post('/sign-up', async ({ request, BLL, response }) => {
  const where = { account: request.body.account }
  const doc = await BLL.userBLL.getInfo({ where });
  if (doc) {
    return response.throwBiz('USER.AccountExisted');
  }
  const salt = randomstring.generate({ length: 10, charset: 'hex' });
  const data = {
    _id: uuid.v4(),
    account: request.body.account,
    pass: request.body.pass,
    salt
  }
  const result = await BLL.userBLL.create(data);
  response.success(null, { message: '注册成功,请登录' });
})


project.post('/sign-out', async ({ BLL, response }) => {
  const items = await BLL.projectBLL.getList({});
  response.success({ items });
})


project.get('/self', userVerify, async ({ params, req, response }) => {
  const { projectBLL } = ctx.BLL;
  const where = { _id: params._id };
  const item = await projectBLL.getInfo({ where });
  response.success({ item });
})

module.exports = project