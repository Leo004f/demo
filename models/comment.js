const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
      publiId: {type: String, required: true },
      commentId: { type: String, required: true },
      userId: {type: String, required: true},
      comDescription: { type: String, required: true }
   
  });

  module.exports  = mongoose.model('Comentario', commentSchema);