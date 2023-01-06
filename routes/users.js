const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', getUserById);
router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateUser);

module.exports = router;
