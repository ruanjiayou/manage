const BaseBLL = require('../base');

class Stock extends BaseBLL {
  constructor(models, model_name) {
    super(models, model_name);
  }
}

module.exports = models => new Stock(models, 'StockInfo');