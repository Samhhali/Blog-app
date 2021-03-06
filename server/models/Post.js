var mongoose = require('mongoose'), Schema = mongoose.Schema;

//the article post including a reference from the Category collection.

var PostSchema = new mongoose.Schema({
  category : { type: Schema.Types.ObjectId, ref: 'Category' },
  id: String,
  postTitle: String,
  postAuthor: String,
  postDesc: String,
  postContent: String,
  postReference: String,
  postImgUrl: String,
  created: { type: Date },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);