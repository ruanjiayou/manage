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

const app = new Koa();

app.response.success = function (data, code = 0, message = '') {
  this.body = {
    data,
    code,
    message: ''
  }
}
// 加载model和业务逻辑层
app.models = mongoInit(config.mongo);
app.BLL = BLLinit(app.models);

app.use(Cors());

app.use(bodyParser());

app.use(Convert(Static(path.join(__dirname, '../static'))))

app.use(async (ctx, next) => {
  console.log(ctx.request.method, ctx.request.path)
  ctx.models = ctx.app.models
  ctx.BLL = ctx.app.BLL
  await next()
});

app.use(router.routes())

app.on('error', (err, ctx) => {
  console.log(err.message);
})


module.exports = app;
