const BaseBLL = require('../base');

class Kline extends BaseBLL {
  constructor(models, model_name) {
    super(models, model_name);
  }
}

module.exports = models => new Kline(models, 'KlineInfo');