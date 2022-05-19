const _ = require('lodash');
const Router = require('koa-router')
const uuid = require('uuid')

const stock = new Router({
  prefix: '',
});

stock.get('/', async (ctx) => {
  const hql = ctx.request.paging();
  const items = await ctx.app.BLL.stockBLL.getList(hql)
  ctx.response.success({ items })
})

stock.post('/', async ({ request, app, response }) => {
  const data = _.pick(request.body, ['se', 'code', 'name', 'rzrq']);
  data.price = 0;
  data.total = 0;
  data.createdAt = new Date();
  data.updatedAt = new Date();
  data._id = uuid.v4();
  await app.BLL.stockBLL.update({ where: { se: data.se, code: data.code }, data: { $setOnInsert: data }, options: { upsert: true } });
  response.success();
});

stock.put('/:id', async ({ request, params, app, response }) => {
  const data = _.pick(request.body, ['se', 'code', 'name', 'rzrq', 'total', 'price']);
  data.updatedAt = new Date();
  await app.BLL.stockBLL.update({ where: { _id: params.id }, data: { $set: data } })
  response.success();
})

module.exports = stock