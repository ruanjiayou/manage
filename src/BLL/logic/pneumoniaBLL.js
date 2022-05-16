const BaseBLL = require('../base');

class Pneumonia extends BaseBLL {
  constructor(models, model_name) {
    super(models, model_name);
  }
}

module.exports = models => new Pneumonia(models, 'PneumoniaInfo');