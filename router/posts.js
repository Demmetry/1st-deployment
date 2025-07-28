const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const { protect } = require('../middlewares/auth');
const controller = require('../controller/posts');
const validator = require('../validators/posts');
const validate = require('../middlewares/validate');

router.post('/posts', protect, upload.single('image'), validate(validator.postSchema), controller.createPost);
router.get('/posts', controller.getAllPosts);
router.get('/posts/:id', controller.getPostById);
router.put('/posts/:id', protect, controller.updatePost);
router.delete('/posts/:id', protect, controller.deletePost);

module.exports = router;
