const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const _ = require('lodash')

/**
 * 遍历文件夹
 * @param {object} opt 参数
 * @param {function} cb 回调函数
 */
function loader(opt, cb = null) {
  scanner(opt.dir, cb, opt.filter, opt.recusive);
}

function scanner(dir, cb, filter, recusive) {
  fs.readdirSync(dir).forEach(file => {
    const fullpath = path.join(dir, file);
    const ext = path.extname(file).toLocaleLowerCase();
    const filename = file.substring(0, file.length - ext.length);
    if (recusive === true && fs.existsSync(fullpath) && fs.lstatSync(fullpath).isDirectory()) {
      scanner(fullpath, cb, filter, recusive);
    } else if (cb) {
      // filter处理
      cb({ fullpath, dir, filename, ext });
    }
  });
}

const models = {};

module.exports = (config) => {
  mongoose.connect(`mongodb://${config.user ? config.user + ':' + config.pass + '@' : ''}${config.host}:${config.port}/${config.db}?${new URLSearchParams(config.query).toString()}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  });
  loader({ dir: __dirname }, function (info) {
    if (info.fullpath !== __filename) {
      const name = _.upperFirst(_.camelCase(info.filename));
      const { schema, Custom } = require(info.fullpath)
      // 加载自定义类方法
      if (Custom) {
        schema.loadClass(Custom);
      }
      models[name] = mongoose.model(name, schema);
    }
  });
  return models;
}
