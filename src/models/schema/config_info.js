const Schema = require('mongoose').Schema;
const constant = require('../../constant');
const dayjs = require('dayjs');

const schema = new Schema({
  _id: {
    type: String,
  },
  project_id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  type: {
    type: String,
  },
  value: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: () => dayjs().toDate(),
  },
  updatedAt: {
    type: Date,
    default: () => dayjs().toDate(),
  },
  order: {
    type: Number,
    default: 1
  }
}, {
  strict: true,
  collections: 'config_info',
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