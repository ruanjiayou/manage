const Schema = require('mongoose').Schema;
const constant = require('../../constant');

const schema = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  total: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    default: 1,
    enum: Object.values(constant.JOB_STATUS),
  },
}, {
  strict: true,
  collections: 'job_info',
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