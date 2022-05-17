const Router = require('koa-router')
const _ = require('lodash');
const uuid = require('uuid');

const project = new Router({
  prefix: '',
});

project.get('/', async ({ BLL, response }) => {
  const items = await BLL.projectBLL.getList({});
  response.success({ items });
})

project.get('/:_id', async ({ params, req, response }) => {
  const { projectBLL } = ctx.BLL;
  const where = { _id: params._id };
  const item = await projectBLL.getInfo({ where });
  response.success({ item });
})

project.post('/', async ({ request, response, BLL }) => {
  const data = _.pick(request.body, ['title', 'desc', 'cover']);
  data._id = uuid.v4();
  const item = await BLL.projectBLL.create(data);
  response.success({ item });
});

project.put('/:_id', async ({ params, request, response, BLL }) => {
  const where = { _id: params._id };
  const data = _.pick(request.body, ['title', 'desc', 'cover']);
  const item = await BLL.projectBLL.update(where, { $set: data });
  response.success();
});

module.exports = project