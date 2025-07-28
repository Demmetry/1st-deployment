const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const controller = require('../controller/users');
const { protect, authorize } = require('../middlewares/auth');

//validator middleware
const validate = require('../middlewares/validate');
const {
  signupSchema,
  loginSchema,
  updateUserSchema
} = require('../validators/users');

// Public routes
router.post('/users', upload.single('photo'), validate(signupSchema), controller.signup);
router.post('/login', validate(loginSchema), controller.login);

// Authenticated routes
router.get('/users', protect, controller.getallusers);
router.get('/users/:id', protect, controller.getUserById);

// update with validation
router.put('/users/:id', protect, validate(updateUserSchema), controller.updateUser);

// admin-only delete route
router.delete('/users/:id', protect, authorize('admin'), controller.deleteUser);

module.exports = router;
