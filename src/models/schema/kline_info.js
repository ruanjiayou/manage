const Schema = require('mongoose').Schema;
const dayjs = require('dayjs')

const schema = new Schema({
  _id: {
    type: String,
  },
  // 证券名称
  date: {
    type: String,
    default: 0
  },
  se: {
    type: String,
    default: 'SH'
  },
  // 证券编号
  code: {
    type: String,
    default: ''
  },
  // 昨收
  prev_close: {
    type: Number,
    default: 0
  },
  // 今开
  begin: {
    type: Number,
    default: 0
  },
  // 收盘价
  end: {
    type: Number,
    default: 0
  },
  // 最高
  high: {
    type: Number,
    default: 0
  },
  // 最低
  low: {
    type: Number,
    default: 0
  },
  // 成交数量
  quantity: {
    type: Number,
    default: 0
  },
  // 成交额
  amount: {
    type: Number,
    default: 0
  },
  // 涨跌幅
  percent: {
    type: Number,
    default: 0
  },
  line: {
    // quantity price average
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: () => dayjs().toDate(),
  }
}, {
  strict: true,
  collections: 'kline_info',
});

class Custom {
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