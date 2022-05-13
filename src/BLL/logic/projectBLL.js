const BaseBLL = require('../base');

class Project extends BaseBLL {
  constructor(models, model_name) {
    super(models, model_name);
  }
}

module.exports = models => new Project(models, 'ProjectInfo');