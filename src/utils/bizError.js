const _ = require('lodash');
const path = require('path');
const loader = require('./loader');

class BizError extends Error {
  constructor(name, params = {}) {
    super();
    this.bizName = name;
    this.params = params;
  }
}

/**
 * 根据业务错误对象生成返回的包装格式
 * @param {Object} bizError 业务错误对象
 * @param {String} lang 语言.默认zh-CN
 * @returns 
 */
function genByBiz(bizError, lang = 'zh-CH') {
  const result = _.get(packages, bizError.bizName, { status: 200, code: -1, message: 'unknow' });
  return {
    status: result.status,
    data: {
      code: result.code,
      message: result.message,
    }
  }
}

// 业务错误语音包
const packages = {};
loader({ dir: path.join(__dirname, '../config/error-codes') }, (info) => {
  const name = info.filename.toUpperCase();
  const data = require(info.fullpath);
  packages[name] = data;
})

module.exports = {
  BizError,
  genByBiz,
  packages,
}