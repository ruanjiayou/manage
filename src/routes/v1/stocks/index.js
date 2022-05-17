const _ = require('lodash');
const Router = require('koa-router')

const stock = new Router({
  prefix: '',
});

stock.get('/', async (ctx) => {
  const hql = ctx.request.paging();
  const items = await ctx.app.BLL.stockBLL.getList(hql)
  ctx.response.success({ items })
})

stock.post('/', async ({ request, app, response }) => {
  const data = _.pick(request.body, ['se', 'code', 'name']);
  data.price = 0;
  data.total = 0;
  data.createdAt = new Date();
  data.updatedAt = new Date();
  await app.BLL.stockBLL.update({ where: { se: data.se, code: data.code }, data: { $setOnInsert: data }, options: { upsert: true } });
  response.success();
});

module.exports = stock