const path = require('path');
const loader = require('../utils/loader')
const BLL = {};

module.exports = (models) => {
  loader({ dir: path.join(__dirname, 'logic') }, function (info) {
    const name = info.filename;
    const BL = require(info.fullpath)
    if (typeof BL === 'function') {
      BLL[name] = BL(models);
    }
  });
  return BLL;
}
