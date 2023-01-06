const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const cardRouter = require('./cards');

router.post('/signin', login);
router.post('/signup', createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res) => res.status(404).json({ message: 'Путь не найден' }));

module.exports = router;
