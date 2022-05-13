const Schema = require('mongoose').Schema;

const schema = new Schema({
  _id: {
    type: String,
  },
  title: {
    type: String,
    comment: '标题'
  },
  name: {
    type: String,
    comment: 'component的name'
  },
  cover: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
  tree_id: {
    type: String,
    default: '',
    comment: '模板页根节点id'
  },
  parent_id: {
    type: String,
    default: '',
    comment: '父节点id'
  },
  refs: {
    type: {
      ref_type: String,
      items: [{ resource_id: String, resource_type: String, _id: false }],
      param: Object,
    },
    comment: '引用类型及数据'
  },
  more: {
    type: {
      type: String,
      default: ''
    },
    page_id: {
      type: String,
      default: ''
    }
  },
  attrs: {
    can_change: {
      type: Boolean,
      default: false,
    },
    show_title: {
      type: Boolean,
      default: true,
    },
    selected_child_id: {
      type: String,
      default: ''
    },
    interval: {
      type: Number,
      default: 0,
    },
    column: {
      type: Number,
      default: 2,
    }
  },
  nth: {
    type: Number,
    default: 1,
    comment: '序号'
  },
  status: {
    type: Number,
    default: 0,
  },
}, {
  strict: true,
  collections: 'module_info',
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