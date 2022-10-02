const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: String, required: true },
    userId: { type: String, required: true },
    Comment: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Comment'
    }

  });
  

module.exports = mongoose.model('Post', postSchema);