const _ = require('lodash');
const path = require('path');
const Koa = require('koa');
const Convert = require('koa-convert');
const Static = require('koa-static');
const Cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const config = require('./config/index');
const router = require('./router');
const mongoInit = require('./models/mongo');
const BLLinit = require('./BLL/index');
const bizError = require('./middleware/bizError');
const { BizError, genByBiz } = require('./utils/bizError')
const loadSchedule = require('./schedule/index')

const app = new Koa();

app.response.success = function (data, params = {}) {
  const { status = 200, code = 0, message = '' } = params;
  const body = { code, message };
  if (!_.isNil(data)) {
    body.data = data;
  }
  this.status = status
  this.body = body;
}
app.response.throwBiz = function (bizName, params) {
  throw new BizError(bizName, params);
}

// 加载model和业务逻辑层
app.config = config;
app.models = mongoInit(config.mongo);
app.BLL = BLLinit(app.models);
app.schedule = loadSchedule(app);

app.use(bizError)

app.use(Cors());

app.use(bodyParser());

app.use(Convert(Static(path.join(__dirname, '../static'))))

app.use(async (ctx, next) => {
  console.log(ctx.request.method, ctx.request.path)
  ctx.models = app.models
  ctx.BLL = app.BLL
  ctx.config = app.config;

  await next()
});

app.use(router.routes())

app.on('error', (err, ctx) => {
  console.log(err.message);
})


module.exports = app;
