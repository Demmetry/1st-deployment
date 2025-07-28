const Post = require('../models/posts');
const imagekit = require('../utils/imagekit');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    let imageUrl = null;

    if (req.file) {
      const uploadedImage = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
      });
      imageUrl = uploadedImage.url;
    }

    const post = await Post.create({
      title,
      content,
      image: imageUrl,
      user: req.user.id
    });

    res.status(201).json({ status: 'success', data: post });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('user', 'name email');
  res.status(200).json({ status: 'success', data: posts });
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user', 'name email');
  if (!post) return res.status(404).json({ status: 'fail', message: 'Post not found' });
  res.status(200).json({ status: 'success', data: post });
};

exports.updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!post) return res.status(404).json({ status: 'fail', message: 'Post not found' });
  res.status(200).json({ status: 'success', data: post });
};

exports.deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ status: 'fail', message: 'Post not found' });
  res.status(200).json({ status: 'success', message: 'Post deleted' });
};
