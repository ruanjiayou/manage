const fs = require('fs');
const path = require('path');
const _ = require('lodash')

/**
 * 遍历文件夹
 * @param {object} opt 参数
 * @param {function} cb 回调函数
 */
function loader(opt, cb = null) {
  scanner(opt.dir, cb, opt.filter, opt.recusive);
}

function scanner(dir, cb, filter, recusive) {
  fs.readdirSync(dir).forEach(file => {
    const fullpath = path.join(dir, file);
    const ext = path.extname(file).toLocaleLowerCase();
    const filename = file.substring(0, file.length - ext.length);
    if (recusive === true && fs.existsSync(fullpath) && fs.lstatSync(fullpath).isDirectory()) {
      scanner(fullpath, cb, filter, recusive);
    } else if (cb) {
      // filter处理
      cb({ fullpath, dir, filename, ext });
    }
  });
}

const BLL = {};

module.exports = (models) => {
  loader({ dir: __dirname }, function (info) {
    if (info.fullpath !== __filename && info.filename !== 'base') {
      const name = info.filename;
      const BL = require(info.fullpath)
      BLL[name] = BL(models);
    }
  });
  return BLL;
}
