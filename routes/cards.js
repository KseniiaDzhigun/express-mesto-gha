const router = require('express').Router();
const {
  getCards, deleteCardById, createCard, putLike, removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:id', deleteCardById);
router.post('/', createCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', removeLike);

module.exports = router;
