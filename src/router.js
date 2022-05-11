const Router = require('koa-router')
const router = new Router();
const home = require('./routes/index');
const project = require('./routes/v1/project/index');

router.use('/', home.routes(), home.allowedMethods());
router.use('/v1/projects', project.routes(), project.allowedMethods());

module.exports = router