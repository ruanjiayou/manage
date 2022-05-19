const Schema = require('mongoose').Schema;
const constant = require('../../constant');
const dayjs = require('dayjs')

const schema = new Schema({
  _id: {
    type: String,
  },
  se: {
    type: String,
  },
  code: {
    type: String,
  },
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => dayjs().toDate(),
  },
  updatedAt: {
    type: Date,
    default: () => dayjs().toDate(),
  },
  price: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  rzrq: {
    type: Boolean,
    default: false,
  }
}, {
  strict: true,
  collections: 'stock_info',
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