const mongoose=require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true
    },
      user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    photo: {
      type: String,
    },
    userId:{type :mongoose.Schema.Types.ObjectId,ref:"User"}
  },
  { timestamps: true }
);
const Post = mongoose.model('Post', postSchema);
module.exports = Post;