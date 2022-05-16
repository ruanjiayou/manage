const Router = require('koa-router')

const schedule = new Router({
  prefix: '',
});

schedule.patch('/:name', async ({ params, app, response }) => {
  await app.schedule.tick(params.name);
  response.success();
});

module.exports = schedule