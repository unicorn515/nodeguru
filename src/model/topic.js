import mong from 'mongoose';

module.exports = function (done) {

  const schema = mong.Schema;
  const ObjectId = schema.ObjectId;

  const topic = new schema({
    authorId: {type: ObjectId, index: true},
    title: {type: String, trim: true},
    content: {type: String},
    tags: [{type: String, index: true}],
    createdAt: {type: Date, index: true},
    updatedAt: {type: Date, index: true},
    lastCommentedAt: {type: Date, index: true},
    comments: [{
      authorId: ObjectId,
      content: String,
      createdAt: Date,
    }],
  });

  $.mongodb.model('topic', topic);
  $.model.topic = $.mongodb.model('topic');

  done();

};