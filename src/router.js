const Router = require('koa-router')
const router = new Router();
const home = require('./routes/index');
const project = require('./routes/v1/project/index');
const user = require('./routes/v1/user/index');

router.use('/', home.routes());
router.use('/v1/projects', project.routes());
router.use('/v1/users', user.routes());

module.exports = router