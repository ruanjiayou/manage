
const Schema = require('mongoose').Schema;
const dayjs = require('dayjs')

const schema = new Schema({
  _id: {
    type: String,
  },
  date: {
    type: String,
  },
  data: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: () => dayjs().toDate(),
  },
  updatedAt: {
    type: Date,
    default: () => dayjs().toDate(),
  }
}, {
  strict: true,
  collections: 'pneumonia_info',
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