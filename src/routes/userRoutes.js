const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updatePassword,
  getAllUsers,
  updateUserRole
} = require('../controllers/userController');
const {
  protect,
  adminOnly
} = require('../middlewares/authMiddleware');



router.post('/register', registerUser);
router.post('/login', loginUser);

// Route privée protégée par un token JWT
router.get('/profile', protect, getUserProfile);
router.put('/update-password', protect, updatePassword);
router.put('/:id/role', protect, adminOnly, updateUserRole);

// Route réservée aux administrateurs (JWT valide + rôle admin requis)
router.get('/', protect, adminOnly, getAllUsers);


module.exports = router;
