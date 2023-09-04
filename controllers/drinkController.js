import axios from 'axios';
import modifyResponse from '../middleware/modifyResponse.js';
import ingredientText from '../public/data/ingredientText.js';
const API_URL = 'https://thecocktaildb.com/api/json/v1/1';

export const getRandomDrinks = async (req, res) => {
  try {
    const response = await axios.get(API_URL + '/filter.php?c=Cocktail');
    const result = response.data;
    const shuffled = [...result.drinks].sort(() => 0.5 - Math.random());
    const randomDrinks = shuffled.slice(0, 6);

    res.render('index.ejs', {
      randomDrinks,
      ingredients: ['Rum', 'Gin', 'Vodka', 'Tequila'],
      bgImg: 'cocktails',
    });
  } catch (error) {
    console.error(error);
    res.render('drinksList.ejs', {
      message: 'Something went wrong. Try again.',
    });
  }
};

export const getDrinkById = async (req, res) => {
  const { idDrink } = req.params;

  try {
    const response = await axios.get(API_URL + `/lookup.php?i=${idDrink}`);
    const drink = response.data.drinks[0];

    const { strDrink, strDrinkThumb, strInstructions, strGlass } = drink;

    const ingQuantity = modifyResponse({ drink });

    res.render('drink.ejs', {
      strDrink,
      ingQuantity,
      strDrinkThumb,
      instructions: strInstructions.split('. '),
      strGlass,
    });
  } catch (error) {
    console.error(error);
    res.render('drinksList.ejs', {
      message: 'Something went wrong. Try again.',
    });
  }
};

export const getDrinksByIngredient = async (req, res) => {
  const { ingrName } = req.params;

  const { page, startIndex, endIndex, limit } = req.pagination;

  try {
    const response = await axios.get(API_URL + `/filter.php?i=${ingrName}`);

    const { drinks } = response.data;

    if (!drinks) {
      return res.render('drinksList.ejs', { message: 'No drinks found' });
    }

    res.render('ingredient.ejs', {
      ingrName,
      currentPage: page,
      drinks: drinks.slice(startIndex, endIndex),
      pageCount: Math.ceil(drinks.length / limit),
      ingredientText,
      bgImg: ingrName,
    });
  } catch (error) {
    console.log(error);
    res.render('drinksList.ejs', {
      message: 'Something went wrong. Try again.',
    });
  }
};

export const findCocktailByName = async (req, res) => {
  const cocktail = req.body.cocktailName.toLowerCase();

  try {
    const response = await axios.get(API_URL + `/search.php?s=${cocktail}`);
    const { drinks } = response.data;

    if (!drinks) {
      return res.render('drinksList.ejs', { message: 'No drinks found' });
    }
    if (drinks.length === 1) {
      const drink = drinks[0];

      const { strDrink, strInstructions, strDrinkThumb, strGlass } = drink;
      const ingQuantity = modifyResponse({ drink });

      return res.render('drink.ejs', {
        strDrink,
        strDrinkThumb,
        instructions: strInstructions.split('. '),
        ingQuantity,
        strGlass,
      });
    }

    return res.render('drinksList.ejs', { drinks });
  } catch (error) {
    console.log(error);
    res.render('drinksList.ejs', {
      message: 'Something went wrong. Try again.',
    });
  }
};

export const browseByLetter = async (req, res) => {
  const letter = req.params.letter.toLowerCase();
  const { page, startIndex, endIndex, limit } = req.pagination;

  try {
    const response = await axios.get(API_URL + `/search.php?f=${letter}`);
    const { drinks } = response.data;

    if (!drinks) {
      return res.render('drinksList.ejs', { message: 'No drinks found' });
    }

    res.render('drinksList.ejs', {
      drinks,
      currentPage: page,
      startIndex,
      endIndex,
      drinks: drinks.slice(startIndex, endIndex),
      pageCount: Math.ceil(drinks.length / limit),
    });
  } catch (error) {
    console.log(error);
    res.render('drinksList.ejs', {
      message: 'Something went wrong. Try again.',
    });
  }
};
