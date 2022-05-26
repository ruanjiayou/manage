const BaseBLL = require('../base');

class Rzrq extends BaseBLL {
  constructor(models, model_name) {
    super(models, model_name);
  }
}

module.exports = models => new Rzrq(models, 'RzrqInfo');