const mongoose = require('mongoose');
const _ = require('lodash')
const loader = require('../utils/loader');
const path = require('path');

const models = {};

module.exports = (config) => {
  mongoose.connect(`mongodb://${config.user ? config.user + ':' + config.pass + '@' : ''}${config.host}:${config.port}/${config.db}?${new URLSearchParams(config.query).toString()}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  });
  loader({ dir: path.join(__dirname, 'schema') }, function (info) {
    const name = _.upperFirst(_.camelCase(info.filename));
    const { schema, Custom } = require(info.fullpath);
    if (schema) {
      // 加载自定义类方法
      if (Custom) {
        schema.loadClass(Custom);
      }
      models[name] = mongoose.model(name, schema, info.filename);
    }
  });
  return models;
}
