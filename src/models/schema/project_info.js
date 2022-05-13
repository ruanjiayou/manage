const Schema = require('mongoose').Schema;

const schema = new Schema({
  _id: {
    type: String,
  },
  title: {
    type: String,
  },
  cover: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
  status: {
    type: Number,
    default: 0,
  },
}, {
  strict: true,
  collections: 'project_info',
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