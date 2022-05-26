const Schema = require('mongoose').Schema;

const schema = new Schema({
  _id: {
    type: String,
  },
  secucode: {
    type: String,
    default: '',
  },
  code: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  money: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  stocks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  money: {
    type: Number,
    default: 0,
  },
  start: {
    type: Number,
    default: 0,
  },
  end: {
    type: Number,
    default: 0,
  },
  high: {
    type: Number,
    default: 0,
  },

  lower: {
    type: Number,
    default: 0,
  },
  range: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
    default: ''
  },
  turnover: {
    type: Number,
    default: 0,
  },
  turnover_rate: {
    type: Number,
    default: 0,
  },
}, {
  strict: true,
  collections: 'rzrq_info',
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