const router = require('express').Router();
const { getCards, deleteCardById, createCard } = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:id', deleteCardById);
router.post('/', createCard);

module.exports = router;
