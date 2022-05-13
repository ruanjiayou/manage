const crypto = require('crypto');
const Schema = require('mongoose').Schema;

const schema = new Schema({
  _id: {
    type: String,
  },
  account: {
    type: String,
    comment: '系统账号'
  },
  nickname: {
    type: String,
    comment: '昵称'
  },
  avatar: {
    type: String,
    default: '',
  },
  pass: {
    type: String,
  },
  salt: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  status: {
    type: Number,
    default: 0,
  },
}, {
  strict: true,
  collections: 'user_info',
});

class Custom {
  // 密码加盐后的加密密码
  calculate() {
    const hmac = crypto.createHmac('sha1', this._doc.salt);
    hmac.update(this._doc.pass);
    return hmac.digest('hex').toString();
  }
  isEqual(password) {
    return this._doc.pass === this.calculate(password, this._doc.salt);
  }
  toJSON() {
    delete this._doc.__v;
    this._doc.id = this._doc._id;
    delete this._doc._id;
    return this._doc;
  }
}
module.exports = {
  schema, Custom
}