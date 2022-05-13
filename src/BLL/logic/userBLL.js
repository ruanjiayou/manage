const BaseBLL = require('../base');

class User extends BaseBLL {
  constructor(models, model_name) {
    super(models, model_name);
  }
}

module.exports = models => new User(models, 'UserInfo');