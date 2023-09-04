import express from 'express';
import paginateResults from '../middleware/pagination.js';

const router = express.Router();
import {
  browseByLetter,
  findCocktailByName,
  getDrinkById,
  getDrinksByIngredient,
  getRandomDrinks,
} from '../controllers/drinkController.js';

router.route('/').get(getRandomDrinks);
router.route('/drink/:idDrink').get(getDrinkById);
router
  .route('/ingredient/:ingrName')
  .get(paginateResults(15), getDrinksByIngredient);

router.route('/findCocktail').post(findCocktailByName);
router.route('/browse/:letter').get(paginateResults(15), browseByLetter);

export default router;
