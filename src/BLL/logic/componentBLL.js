const BaseBLL = require('../base');

class Component extends BaseBLL {
  constructor(models, model_name) {
    super(models, model_name);
  }
}

module.exports = models => new Component(models, 'ComponentInfo');