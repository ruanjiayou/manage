const BaseBLL = require('../base');

class Config extends BaseBLL {
  constructor(models, model_name) {
    super(models, model_name);
  }
}

module.exports = models => new Config(models, 'ConfigInfo');